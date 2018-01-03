import contains from 'dom-helpers/query/contains';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
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

const triggerType = PropTypes.oneOf(['click', 'hover', 'focus']);

const propTypes = {
  ...Overlay.propTypes,

  /**
   * Specify which action or actions trigger Overlay visibility
   */
  trigger: PropTypes.oneOfType([triggerType, PropTypes.arrayOf(triggerType)]),

  /**
   * A millisecond delay amount to show and hide the Overlay once triggered
   */
  delay: PropTypes.number,
  /**
   * A millisecond delay amount before showing the Overlay once triggered.
   */
  delayShow: PropTypes.number,
  /**
   * A millisecond delay amount before hiding the Overlay once triggered.
   */
  delayHide: PropTypes.number,

  // FIXME: This should be `defaultShow`.
  /**
   * The initial visibility state of the Overlay. For more nuanced visibility
   * control, consider using the Overlay component directly.
   */
  defaultOverlayShown: PropTypes.bool,

  /**
   * An element or text to overlay next to the target.
   */
  overlay: PropTypes.node.isRequired,

  /**
   * @private
   */
  onBlur: PropTypes.func,
  /**
   * @private
   */
  onClick: PropTypes.func,
  /**
   * @private
   */
  onFocus: PropTypes.func,
  /**
   * @private
   */
  onMouseOut: PropTypes.func,
  /**
   * @private
   */
  onMouseOver: PropTypes.func,

  // Overridden props from `<Overlay>`.
  /**
   * @private
   */
  target: PropTypes.oneOf([null]),
  /**
   * @private
   */
  onHide: PropTypes.oneOf([null]),
  /**
   * @private
   */
  show: PropTypes.oneOf([null])
};

const defaultProps = {
  defaultOverlayShown: false,
  trigger: ['hover', 'focus']
};

class OverlayTrigger extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelayedShow = this.handleDelayedShow.bind(this);
    this.handleDelayedHide = this.handleDelayedHide.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.handleMouseOver = e =>
      this.handleMouseOverOut(this.handleDelayedShow, e, 'fromElement');
    this.handleMouseOut = e =>
      this.handleMouseOverOut(this.handleDelayedHide, e, 'toElement');

    this._mountNode = null;

    this.state = {
      show: props.defaultOverlayShown
    };
  }

  componentDidMount() {
    this._mountNode = document.createElement('div');
    this.renderOverlay();
  }

  componentDidUpdate() {
    this.renderOverlay();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this._mountNode);
    this._mountNode = null;

    clearTimeout(this._hoverShowDelay);
    clearTimeout(this._hoverHideDelay);
  }

  handleDelayedHide() {
    if (this._hoverShowDelay != null) {
      clearTimeout(this._hoverShowDelay);
      this._hoverShowDelay = null;
      return;
    }

    if (!this.state.show || this._hoverHideDelay != null) {
      return;
    }

    const delay =
      this.props.delayHide != null ? this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverHideDelay = setTimeout(() => {
      this._hoverHideDelay = null;
      this.hide();
    }, delay);
  }

  handleDelayedShow() {
    if (this._hoverHideDelay != null) {
      clearTimeout(this._hoverHideDelay);
      this._hoverHideDelay = null;
      return;
    }

    if (this.state.show || this._hoverShowDelay != null) {
      return;
    }

    const delay =
      this.props.delayShow != null ? this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverShowDelay = setTimeout(() => {
      this._hoverShowDelay = null;
      this.show();
    }, delay);
  }

  handleHide() {
    this.hide();
  }

  // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker
  // moving from one child element to another.
  handleMouseOverOut(handler, e, relatedNative) {
    const target = e.currentTarget;
    const related = e.relatedTarget || e.nativeEvent[relatedNative];

    if ((!related || related !== target) && !contains(target, related)) {
      handler(e);
    }
  }

  handleToggle() {
    if (this.state.show) {
      this.hide();
    } else {
      this.show();
    }
  }

  hide() {
    this.setState({ show: false });
  }

  makeOverlay(overlay, props) {
    return (
      <Overlay
        {...props}
        show={this.state.show}
        onHide={this.handleHide}
        target={this}
      >
        {overlay}
      </Overlay>
    );
  }

  show() {
    this.setState({ show: true });
  }

  renderOverlay() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this._overlay,
      this._mountNode
    );
  }

  render() {
    const {
      trigger,
      overlay,
      children,
      onBlur,
      onClick,
      onFocus,
      onMouseOut,
      onMouseOver,
      ...props
    } = this.props;

    delete props.delay;
    delete props.delayShow;
    delete props.delayHide;
    delete props.defaultOverlayShown;

    const child = React.Children.only(children);
    const childProps = child.props;
    const triggerProps = {};

    if (this.state.show) {
      triggerProps['aria-describedby'] = overlay.props.id;
    }

    // FIXME: The logic here for passing through handlers on this component is
    // inconsistent. We shouldn't be passing any of these props through.

    triggerProps.onClick = createChainedFunction(childProps.onClick, onClick);

    if (isOneOf('click', trigger)) {
      triggerProps.onClick = createChainedFunction(
        triggerProps.onClick,
        this.handleToggle
      );
    }

    if (isOneOf('hover', trigger)) {
      warning(
        !(trigger === 'hover'),
        '[react-bootstrap] Specifying only the `"hover"` trigger limits the ' +
          'visibility of the overlay to just mouse users. Consider also ' +
          'including the `"focus"` trigger so that touch and keyboard only ' +
          'users can see the overlay as well.'
      );

      triggerProps.onMouseOver = createChainedFunction(
        childProps.onMouseOver,
        onMouseOver,
        this.handleMouseOver
      );
      triggerProps.onMouseOut = createChainedFunction(
        childProps.onMouseOut,
        onMouseOut,
        this.handleMouseOut
      );
    }

    if (isOneOf('focus', trigger)) {
      triggerProps.onFocus = createChainedFunction(
        childProps.onFocus,
        onFocus,
        this.handleDelayedShow
      );
      triggerProps.onBlur = createChainedFunction(
        childProps.onBlur,
        onBlur,
        this.handleDelayedHide
      );
    }

    this._overlay = this.makeOverlay(overlay, props);

    return cloneElement(child, triggerProps);
  }
}

OverlayTrigger.propTypes = propTypes;
OverlayTrigger.defaultProps = defaultProps;

export default OverlayTrigger;
