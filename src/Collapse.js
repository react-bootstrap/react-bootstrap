import React from 'react';
import Transition from './Transition';
import domUtils from './utils/domUtils';
import createChainedFunction from './utils/createChainedFunction';

let capitalize = str => str[0].toUpperCase() + str.substr(1);

// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
let triggerBrowserReflow = node => node.offsetHeight; //eslint-disable-line no-unused-expressions

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width:  ['marginLeft', 'marginRight']
};

function getDimensionValue(dimension, elem){
  let value = elem[`offset${capitalize(dimension)}`];
  let computedStyles = domUtils.getComputedStyles(elem);
  let margins = MARGINS[dimension];

  return (value +
    parseInt(computedStyles[margins[0]], 10) +
    parseInt(computedStyles[margins[1]], 10)
  );
}

class Collapse extends React.Component {

  constructor(props, context){
    super(props, context);

    this.onEnterListener = this.handleEnter.bind(this);
    this.onEnteringListener = this.handleEntering.bind(this);
    this.onEnteredListener = this.handleEntered.bind(this);
    this.onExitListener = this.handleExit.bind(this);
    this.onExitingListener = this.handleExiting.bind(this);
  }

  render() {
    let enter = createChainedFunction(this.onEnterListener, this.props.onEnter);
    let entering = createChainedFunction(this.onEnteringListener, this.props.onEntering);
    let entered = createChainedFunction(this.onEnteredListener, this.props.onEntered);
    let exit = createChainedFunction(this.onExitListener, this.props.onExit);
    let exiting = createChainedFunction(this.onExitingListener, this.props.onExiting);

    return (
      <Transition
        ref='transition'
        {...this.props}
        aria-expanded={this.props.in}
        className={this._dimension() === 'width' ? 'width' : ''}
        exitedClassName='collapse'
        exitingClassName='collapsing'
        enteredClassName='collapse in'
        enteringClassName='collapsing'
        onEnter={enter}
        onEntering={entering}
        onEntered={entered}
        onExit={exit}
        onExiting={exiting}
        onExited={this.props.onExited}
      >
        { this.props.children }
      </Transition>
    );
  }

  /* -- Expanding -- */
  handleEnter(elem){
    let dimension = this._dimension();
    elem.style[dimension] = '0';
  }

  handleEntering(elem){
    let dimension = this._dimension();

    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
  }

  handleEntered(elem){
    let dimension = this._dimension();
    elem.style[dimension] = null;
  }

  /* -- Collapsing -- */
  handleExit(elem){
    let dimension = this._dimension();

    elem.style[dimension] = this.props.getDimensionValue(dimension, elem) + 'px';
  }

  handleExiting(elem){
    let dimension = this._dimension();

    triggerBrowserReflow(elem);
    elem.style[dimension] = '0';
  }

  _dimension(){
    return typeof this.props.dimension === 'function'
      ? this.props.dimension()
      : this.props.dimension;
  }

  //for testing
  _getTransitionInstance(){
    return this.refs.transition;
  }

  _getScrollDimensionValue(elem, dimension){
    return elem[`scroll${capitalize(dimension)}`] + 'px';
  }
}

Collapse.propTypes = {
  /**
   * Whether the component is entered; triggers the enter or exit animation
   */
  in: React.PropTypes.bool,

  /**
   * Whether the component should be unmounted (removed from DOM) when exited
   */
  unmountOnExit: React.PropTypes.bool,

  /**
   * Whether transition in should run when the Transition component mounts, if
   * the component is initially entered
   */
  transitionAppear: React.PropTypes.bool,

  /**
   * Duration of the animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  duration: React.PropTypes.number,

  /**
   * Callback fired before the "entering" classes are applied
   */
  onEnter: React.PropTypes.func,
  /**
   * Callback fired after the "entering" classes are applied
   */
  onEntering: React.PropTypes.func,
  /**
   * Callback fired after the "enter" classes are applied
   */
  onEntered: React.PropTypes.func,
  /**
   * Callback fired before the "exiting" classes are applied
   */
  onExit: React.PropTypes.func,
  /**
   * Callback fired after the "exiting" classes are applied
   */
  onExiting: React.PropTypes.func,
  /**
   * Callback fired after the "exited" classes are applied
   */
  onExited: React.PropTypes.func,

  /**
   * The dimension used when collapsing
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   */
  dimension: React.PropTypes.oneOfType([
    React.PropTypes.oneOf(['height', 'width']),
    React.PropTypes.func
  ]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   */
  getDimensionValue: React.PropTypes.func
};

Collapse.defaultProps = {
  in: false,
  duration: 300,
  unmountOnExit: false,
  transitionAppear: false,

  dimension: 'height',
  getDimensionValue
};

export default Collapse;
