import React, { cloneElement } from 'react';

import OverlayMixin from './OverlayMixin';
import RootCloseWrapper from './RootCloseWrapper';

import createChainedFunction from './utils/createChainedFunction';
import createContextWrapper from './utils/createContextWrapper';
import domUtils from './utils/domUtils';
import assign from './utils/Object.assign';

/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }
  return one === of;
}

const OverlayTrigger = React.createClass({
  mixins: [OverlayMixin],

  propTypes: {
    trigger: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['manual', 'click', 'hover', 'focus']),
      React.PropTypes.arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),
    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    delay: React.PropTypes.number,
    delayShow: React.PropTypes.number,
    delayHide: React.PropTypes.number,
    defaultOverlayShown: React.PropTypes.bool,
    overlay: React.PropTypes.node.isRequired,
    containerPadding: React.PropTypes.number,
    rootClose: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      placement: 'right',
      trigger: ['hover', 'focus'],
      containerPadding: 0
    };
  },

  getInitialState() {
    return {
      isOverlayShown: this.props.defaultOverlayShown == null ?
        false : this.props.defaultOverlayShown,
      overlayLeft: null,
      overlayTop: null,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };
  },

  show() {
    this.setState({
      isOverlayShown: true
    }, function() {
      this.updateOverlayPosition();
    });
  },

  hide() {
    this.setState({
      isOverlayShown: false
    });
  },

  toggle() {
    if (this.state.isOverlayShown) {
      this.hide();
    } else {
     this.show();
    }
  },

  renderOverlay() {
    if (!this.state.isOverlayShown) {
      return <span />;
    }

    const overlay = cloneElement(
      this.props.overlay,
      {
        onRequestHide: this.hide,
        placement: this.props.placement,
        positionLeft: this.state.overlayLeft,
        positionTop: this.state.overlayTop,
        arrowOffsetLeft: this.state.arrowOffsetLeft,
        arrowOffsetTop: this.state.arrowOffsetTop
      }
    );

    if (this.props.rootClose) {
      return (
        <RootCloseWrapper onRootClose={this.hide}>
          {overlay}
        </RootCloseWrapper>
      );
    } else {
      return overlay;
    }
  },

  render() {
    const child = React.Children.only(this.props.children);
    if (this.props.trigger === 'manual') {
      return child;
    }

    const props = {};

    props.onClick = createChainedFunction(child.props.onClick, this.props.onClick);
    if (isOneOf('click', this.props.trigger)) {
      props.onClick = createChainedFunction(this.toggle, props.onClick);
    }

    if (isOneOf('hover', this.props.trigger)) {
      props.onMouseOver = createChainedFunction(this.handleDelayedShow, this.props.onMouseOver);
      props.onMouseOut = createChainedFunction(this.handleDelayedHide, this.props.onMouseOut);
    }

    if (isOneOf('focus', this.props.trigger)) {
      props.onFocus = createChainedFunction(this.handleDelayedShow, this.props.onFocus);
      props.onBlur = createChainedFunction(this.handleDelayedHide, this.props.onBlur);
    }

    return cloneElement(
      child,
      props
    );
  },

  componentWillUnmount() {
    clearTimeout(this._hoverDelay);
  },

  componentDidMount() {
    if (this.props.defaultOverlayShown) {
      this.updateOverlayPosition();
    }
  },

  handleDelayedShow() {
    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    const delay = this.props.delayShow != null ?
      this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverDelay = setTimeout(function() {
      this._hoverDelay = null;
      this.show();
    }.bind(this), delay);
  },

  handleDelayedHide() {
    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    const delay = this.props.delayHide != null ?
      this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverDelay = setTimeout(function() {
      this._hoverDelay = null;
      this.hide();
    }.bind(this), delay);
  },

  updateOverlayPosition() {
    if (!this.isMounted()) {
      return;
    }

    this.setState(this.calcOverlayPosition());
  },

  calcOverlayPosition() {
    const childOffset = this.getPosition();

    const overlayNode = this.getOverlayDOMNode();
    const overlayHeight = overlayNode.offsetHeight;
    const overlayWidth = overlayNode.offsetWidth;

    const placement = this.props.placement;
    let overlayLeft, overlayTop, arrowOffsetLeft, arrowOffsetTop;

    if (placement === 'left' || placement === 'right') {
      overlayTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

      if (placement === 'left') {
        overlayLeft = childOffset.left - overlayWidth;
      } else {
        overlayLeft = childOffset.left + childOffset.width;
      }

      const topDelta = this._getTopDelta(overlayTop, overlayHeight);
      overlayTop += topDelta;
      arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
      arrowOffsetLeft = null;
    } else if (placement === 'top' || placement === 'bottom') {
      overlayLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;

      if (placement === 'top') {
        overlayTop = childOffset.top - overlayHeight;
      } else {
        overlayTop = childOffset.top + childOffset.height;
      }

      const leftDelta = this._getLeftDelta(overlayLeft, overlayWidth);
      overlayLeft += leftDelta;
      arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
      arrowOffsetTop = null;
    } else {
      throw new Error(
        'calcOverlayPosition(): No such placement of "' +
        this.props.placement + '" found.'
      );
    }

    return {overlayLeft, overlayTop, arrowOffsetLeft, arrowOffsetTop};
  },

  _getTopDelta(top, overlayHeight) {
    const containerDimensions = this._getContainerDimensions();
    const containerScroll = containerDimensions.scroll;
    const containerHeight = containerDimensions.height;

    const padding = this.props.containerPadding;
    const topEdgeOffset = top - padding - containerScroll;
    const bottomEdgeOffset = top + padding - containerScroll + overlayHeight;

    if (topEdgeOffset < 0) {
      return -topEdgeOffset;
    } else if (bottomEdgeOffset > containerHeight) {
      return containerHeight - bottomEdgeOffset;
    } else {
      return 0;
    }
  },

  _getLeftDelta(left, overlayWidth) {
    const containerDimensions = this._getContainerDimensions();
    const containerWidth = containerDimensions.width;

    const padding = this.props.containerPadding;
    const leftEdgeOffset = left - padding;
    const rightEdgeOffset = left + padding + overlayWidth;

    if (leftEdgeOffset < 0) {
      return -leftEdgeOffset;
    } else if (rightEdgeOffset > containerWidth) {
      return containerWidth - rightEdgeOffset;
    } else {
      return 0;
    }
  },

  _getContainerDimensions() {
    const containerNode = this.getContainerDOMNode();
    let width, height;
    if (containerNode.tagName === 'BODY') {
      width = window.innerWidth;
      height = window.innerHeight;
    } else {
      width = containerNode.offsetWidth;
      height = containerNode.offsetHeight;
    }

    return {
      width, height,
      scroll: containerNode.scrollTop
    };
  },

  getPosition() {
    const node = React.findDOMNode(this);
    const container = this.getContainerDOMNode();

    const offset = container.tagName === 'BODY' ?
      domUtils.getOffset(node) : domUtils.getPosition(node, container);

    return assign({}, offset, {
      height: node.offsetHeight,
      width: node.offsetWidth
    });
  }
});

/**
 * Creates a new OverlayTrigger class that forwards the relevant context
 *
 * This static method should only be called at the module level, instead of in
 * e.g. a render() method, because it's expensive to create new classes.
 *
 * For example, you would want to have:
 *
 * > export default OverlayTrigger.withContext({
 * >   myContextKey: React.PropTypes.object
 * > });
 *
 * and import this when needed.
 */
OverlayTrigger.withContext = createContextWrapper(OverlayTrigger, 'overlay');

export default OverlayTrigger;
