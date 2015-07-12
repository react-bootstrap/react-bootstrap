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
   * Collapse the Component in or out.
   */
  in:       React.PropTypes.bool,

  /**
   * Provide the duration of the animation in milliseconds, used to ensure that finishing callbacks are fired even if the
   * original browser transition end events are canceled.
   */
  duration:          React.PropTypes.number,

  /**
   * Specifies the dimension used when collapsing.
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own css animation for the `.width` css class._
   */
  dimension: React.PropTypes.oneOfType([
    React.PropTypes.oneOf(['height', 'width']),
    React.PropTypes.func
  ]),

  /**
   * A function that returns the height or width of the animating DOM node. Allows for providing some custom logic how much
   * Collapse component should animate in its specified dimension.
   *
   * `getDimensionValue` is called with the current dimension prop value and the DOM node.
   */
  getDimensionValue: React.PropTypes.func,

  /**
   * A Callback fired before the component starts to expand.
   */
  onEnter: React.PropTypes.func,

  /**
   * A Callback fired immediately after the component starts to expand.
   */
  onEntering: React.PropTypes.func,

  /**
   * A Callback fired after the component has expanded.
   */
  onEntered: React.PropTypes.func,

  /**
   * A Callback fired before the component starts to collapse.
   */
  onExit: React.PropTypes.func,

  /**
   * A Callback fired immediately after the component starts to collapse.
   */
  onExiting: React.PropTypes.func,

  /**
   * A Callback fired after the component has collapsed.
   */
  onExited: React.PropTypes.func,

  /**
   * Specify whether the transitioning component should be unmounted (removed from the DOM) once the exit animation finishes.
   */
  unmountOnExit:     React.PropTypes.bool,

  /**
   * Specify whether the component should collapse or expand when it mounts.
   */
  transitionAppear: React.PropTypes.bool
};

Collapse.defaultProps = {
  in:       false,
  duration: 300,
  dimension: 'height',
  transitionAppear: false,
  unmountOnExit: false,
  getDimensionValue
};

export default Collapse;

