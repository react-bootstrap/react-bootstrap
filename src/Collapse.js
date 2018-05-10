import css from 'dom-helpers/style';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Transition from 'react-overlays/lib/Transition';
import deprecated from 'react-prop-types/lib/deprecated';

import createChainedFunction from './utils/createChainedFunction';

let capitalize = str => str[0].toUpperCase() + str.substr(1);

// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
let triggerBrowserReflow = node => node.offsetHeight;

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function getDimensionValue(dimension, elem) {
  let value = elem[`offset${capitalize(dimension)}`];
  let margins = MARGINS[dimension];

  return (value +
    parseInt(css(elem, margins[0]), 10) +
    parseInt(css(elem, margins[1]), 10)
  );
}

class Collapse extends React.Component {

  constructor(props, context) {
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
        ref="transition"
        {...this.props}
        aria-expanded={this.props.role ? this.props.in : null}
        className={classNames(this.props.className, { width: this._dimension() === 'width' })}
        exitedClassName="collapse"
        exitingClassName="collapsing"
        enteredClassName="collapse in"
        enteringClassName="collapsing"
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
  handleEnter(elem) {
    let dimension = this._dimension();
    elem.style[dimension] = '0';
  }

  handleEntering(elem) {
    let dimension = this._dimension();

    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
  }

  handleEntered(elem) {
    let dimension = this._dimension();
    elem.style[dimension] = null;
  }

  /* -- Collapsing -- */
  handleExit(elem) {
    let dimension = this._dimension();

    elem.style[dimension] = this.props.getDimensionValue(dimension, elem) + 'px';
  }

  handleExiting(elem) {
    let dimension = this._dimension();

    triggerBrowserReflow(elem);
    elem.style[dimension] = '0';
  }

  _dimension() {
    return typeof this.props.dimension === 'function'
      ? this.props.dimension()
      : this.props.dimension;
  }

  // for testing
  _getTransitionInstance() {
    return this.refs.transition;
  }

  _getScrollDimensionValue(elem, dimension) {
    return elem[`scroll${capitalize(dimension)}`] + 'px';
  }
}

// Explicitly copied from Transition for doc generation.
// TODO: Remove duplication once #977 is resolved.

Collapse.propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  in: PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: PropTypes.bool,

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: PropTypes.number,

  /**
   * duration
   * @private
   */
  duration: deprecated(PropTypes.number, 'Use `timeout`.'),

  /**
   * Callback fired before the component expands
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: PropTypes.func,

  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   */
  dimension: PropTypes.oneOfType([
    PropTypes.oneOf(['height', 'width']),
    PropTypes.func
  ]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   */
  getDimensionValue: PropTypes.func,

  /**
   * ARIA role of collapsible element
   */
  role: PropTypes.string
};

Collapse.defaultProps = {
  in: false,
  timeout: 300,
  unmountOnExit: false,
  transitionAppear: false,

  dimension: 'height',
  getDimensionValue
};

export default Collapse;
