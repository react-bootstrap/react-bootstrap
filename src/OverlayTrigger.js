/*eslint-disable react/prop-types */

import pick from 'lodash/object/pick';
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

    //override specific overlay props
    /**
     * @private
     */
    target(){},
     /**
     * @private
     */
    onHide(){},
    /**
     * @private
     */
    show(){}
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

  componentDidMount(){
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
    clearTimeout(this._hoverDelay);
  },

  componentDidUpdate(){
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

    const props = {
      'aria-describedby': this.props.overlay.props.id
    };

    // create in render otherwise owner is lost...
    this._overlay = this.getOverlay();

    props.onClick = createChainedFunction(trigger.props.onClick, this.props.onClick);

    if (isOneOf('click', this.props.trigger)) {
      props.onClick = createChainedFunction(this.toggle, props.onClick);
    }

    if (isOneOf('hover', this.props.trigger)) {
      warning(!(this.props.trigger === 'hover'),
        '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' +
        'Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.');

      props.onMouseOver = createChainedFunction(this.handleDelayedShow, this.props.onMouseOver);
      props.onMouseOut = createChainedFunction(this.handleDelayedHide, this.props.onMouseOut);
    }

    if (isOneOf('focus', this.props.trigger)) {
      props.onFocus = createChainedFunction(this.handleDelayedShow, this.props.onFocus);
      props.onBlur = createChainedFunction(this.handleDelayedHide, this.props.onBlur);
    }

    return cloneElement(
      trigger,
      props
    );
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

    this._hoverDelay = setTimeout(() => {
      this._hoverDelay = null;
      this.show();
    }, delay);
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

    this._hoverDelay = setTimeout(() => {
      this._hoverDelay = null;
      this.hide();
    }, delay);
  }

});

export default OverlayTrigger;
