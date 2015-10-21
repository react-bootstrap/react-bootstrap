/* eslint-disable react/prop-types */

import contains from 'dom-helpers/query/contains';
import pick from 'lodash-compat/object/pick';
import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import warning from 'warning';

import Overlay from './Overlay';

import createChainedFunction from './utils/createChainedFunction';

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
  propTypes: {

    ...Overlay.propTypes,

     /**
     * Specify which action or actions trigger Overlay visibility
     */
    trigger: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['click', 'hover', 'focus']),
      React.PropTypes.arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),

    /**
     * A millisecond delay amount to show and hide the Overlay once triggered
     */
    delay: React.PropTypes.number,
    /**
     * A millisecond delay amount before showing the Overlay once triggered.
     */
    delayShow: React.PropTypes.number,
    /**
     * A millisecond delay amount before hiding the Overlay once triggered.
     */
    delayHide: React.PropTypes.number,

    /**
     * The initial visibility state of the Overlay, for more nuanced visibility controll consider
     * using the Overlay component directly.
     */
    defaultOverlayShown: React.PropTypes.bool,

    /**
     * An element or text to overlay next to the target.
     */
    overlay: React.PropTypes.node.isRequired,

    /**
     * @private
     */
    onBlur: React.PropTypes.func,
    /**
     * @private
     */
    onClick: React.PropTypes.func,
    /**
     * @private
     */
    onFocus: React.PropTypes.func,
    /**
     * @private
     */
    onMouseEnter: React.PropTypes.func,
    /**
     * @private
     */
    onMouseLeave: React.PropTypes.func,

    // override specific overlay props
    /**
     * @private
     */
    target() {},
     /**
     * @private
     */
    onHide() {},
    /**
     * @private
     */
    show() {}
  },

  getDefaultProps() {
    return {
      defaultOverlayShown: false,
      trigger: ['hover', 'focus']
    };
  },

  getInitialState() {
    return {
      isOverlayShown: this.props.defaultOverlayShown
    };
  },

  show() {
    this.setState({
      isOverlayShown: true
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

  componentWillMount() {
    this.handleMouseOver = this.handleMouseOverOut.bind(null, this.handleDelayedShow);
    this.handleMouseOut = this.handleMouseOverOut.bind(null, this.handleDelayedHide);
  },

  componentDidMount() {
    this._mountNode = document.createElement('div');
    this.renderOverlay();
  },

  renderOverlay() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, this._overlay, this._mountNode
    );
  },

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this._mountNode);
    this._mountNode = null;
    clearTimeout(this._hoverShowDelay);
    clearTimeout(this._hoverHideDelay);
  },

  componentDidUpdate() {
    if (this._mountNode) {
      this.renderOverlay();
    }
  },

  getOverlayTarget() {
    return ReactDOM.findDOMNode(this);
  },

  getOverlay() {
    let overlayProps = {
      ...pick(this.props, Object.keys(Overlay.propTypes)),
      show: this.state.isOverlayShown,
      onHide: this.hide,
      target: this.getOverlayTarget,
      onExit: this.props.onExit,
      onExiting: this.props.onExiting,
      onExited: this.props.onExited,
      onEnter: this.props.onEnter,
      onEntering: this.props.onEntering,
      onEntered: this.props.onEntered
    };

    let overlay = cloneElement(this.props.overlay, {
      placement: overlayProps.placement,
      container: overlayProps.container
    });

    return (
      <Overlay {...overlayProps}>
        { overlay }
      </Overlay>
    );
  },

  render() {
    const trigger = React.Children.only(this.props.children);
    const triggerProps = trigger.props;

    const props = {
      'aria-describedby': this.props.overlay.props.id
    };

    // create in render otherwise owner is lost...
    this._overlay = this.getOverlay();

    props.onClick = createChainedFunction(triggerProps.onClick, this.props.onClick);

    if (isOneOf('click', this.props.trigger)) {
      props.onClick = createChainedFunction(this.toggle, props.onClick);
    }

    if (isOneOf('hover', this.props.trigger)) {
      warning(!(this.props.trigger === 'hover'),
        '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' +
        'Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.');

      props.onMouseOver = createChainedFunction(this.handleMouseOver, this.props.onMouseOver, triggerProps.onMouseOver);
      props.onMouseOut = createChainedFunction(this.handleMouseOut, this.props.onMouseOut, triggerProps.onMouseOut);
    }

    if (isOneOf('focus', this.props.trigger)) {
      props.onFocus = createChainedFunction(this.handleDelayedShow, this.props.onFocus, triggerProps.onFocus);
      props.onBlur = createChainedFunction(this.handleDelayedHide, this.props.onBlur, triggerProps.onBlur);
    }

    return cloneElement(
      trigger,
      props
    );
  },

  handleDelayedShow() {
    if (this._hoverHideDelay != null) {
      clearTimeout(this._hoverHideDelay);
      this._hoverHideDelay = null;
      return;
    }

    if (this.state.isOverlayShown || this._hoverShowDelay != null) {
      return;
    }

    const delay = this.props.delayShow != null ?
      this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverShowDelay = setTimeout(() => {
      this._hoverShowDelay = null;
      this.show();
    }, delay);
  },

  handleDelayedHide() {
    if (this._hoverShowDelay != null) {
      clearTimeout(this._hoverShowDelay);
      this._hoverShowDelay = null;
      return;
    }

    if (!this.state.isOverlayShown || this._hoverHideDelay != null) {
      return;
    }

    const delay = this.props.delayHide != null ?
      this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverHideDelay = setTimeout(() => {
      this._hoverHideDelay = null;
      this.hide();
    }, delay);
  },

  // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker moving
  // from one child element to another.
  handleMouseOverOut(handler, e) {
    let target = e.currentTarget;
    let related = e.relatedTarget || e.nativeEvent.toElement;

    if (!related || related !== target && !contains(target, related)) {
      handler(e);
    }
  }

});

export default OverlayTrigger;
