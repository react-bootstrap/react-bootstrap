/*eslint-disable react/prop-types */
import React, { cloneElement } from 'react';

import createChainedFunction from './utils/createChainedFunction';
import createContextWrapper from './utils/createContextWrapper';
import Overlay from './Overlay';
import position from './utils/overlayPositionUtils';

import deprecationWarning from './utils/deprecationWarning';
import warning from 'react/lib/warning';

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
      React.PropTypes.oneOf(['manual', 'click', 'hover', 'focus']),
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
      trigger: ['hover', 'focus']
    };
  },

  getInitialState() {
    return {
      isOverlayShown: this.props.defaultOverlayShown == null ?
        false : this.props.defaultOverlayShown
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
    React.render(this._overlay, this._mountNode);
  },

  componentWillUnmount() {
    React.unmountComponentAtNode(this._mountNode);
    this._mountNode = null;
    clearTimeout(this._hoverDelay);
  },

  componentDidUpdate(){
    React.render(this._overlay, this._mountNode);
  },

  getOverlay(){
    let props = {
      show:      this.state.isOverlayShown,
      onHide:    this.hide,
      rootClose: this.props.rootClose,
      target:    ()=> React.findDOMNode(this),
      placement: this.props.placement,
      container: this.props.container,
      containerPadding: this.props.containerPadding
    };

    let overlay = cloneElement(this.props.overlay, {
      placement: props.placement,
      container: props.container
    });

    return (
      <Overlay {...props}>
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

    if (this.props.trigger !== 'manual') {

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
    }
    else {
      deprecationWarning('"manual" trigger type', ' the Overlay component');
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
  },

  // deprecated Methods
  calcOverlayPosition() {
    let overlay = this.props.overlay;

    deprecationWarning('OverlayTrigger.calcOverlayPosition()', 'utils/overlayPositionUtils');

    return position.calcOverlayPosition(
        overlay.props.placement || this.props.placement
      , React.findDOMNode(overlay)
      , React.findDOMNode(this)
      , React.findDOMNode(overlay.props.container || this.props.container)
      , overlay.props.containerPadding || this.props.containerPadding
    );
  },

  getPosition() {
    deprecationWarning('OverlayTrigger.getPosition()', 'utils/overlayPositionUtils');

    let overlay = this.props.overlay;

    return position.getPosition(
        React.findDOMNode(this)
      , React.findDOMNode(overlay.props.container || this.props.container)
    );
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
