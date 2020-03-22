import classNames from 'classnames';
import css from 'dom-helpers/css';
import transitionEnd from 'dom-helpers/transitionEnd';
import PropTypes from 'prop-types';
import React from 'react';
import Transition, {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';
import createChainedFunction from './createChainedFunction';
import triggerBrowserReflow from './triggerBrowserReflow';

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
};

function getDimensionValue(dimension, elem) {
  let offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  let value = elem[offset];
  let margins = MARGINS[dimension];

  return (
    value +
    parseInt(css(elem, margins[0]), 10) +
    parseInt(css(elem, margins[1]), 10)
  );
}

const collapseStyles = {
  [EXITED]: 'collapse',
  [EXITING]: 'collapsing',
  [ENTERING]: 'collapsing',
  [ENTERED]: 'collapse show',
};

const propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  in: PropTypes.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  appear: PropTypes.bool,

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: PropTypes.number,

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
    PropTypes.func,
  ]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   *
   * @default element.offsetWidth | element.offsetHeight
   */
  getDimensionValue: PropTypes.func,

  /**
   * ARIA role of collapsible element
   */
  role: PropTypes.string,
};

const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,

  dimension: 'height',
  getDimensionValue,
};

class Collapse extends React.Component {
  getDimension() {
    return typeof this.props.dimension === 'function'
      ? this.props.dimension()
      : this.props.dimension;
  }

  /* -- Expanding -- */
  handleEnter = (elem) => {
    elem.style[this.getDimension()] = '0';
  };

  handleEntering = (elem) => {
    const dimension = this.getDimension();
    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
  };

  handleEntered = (elem) => {
    elem.style[this.getDimension()] = null;
  };

  /* -- Collapsing -- */
  handleExit = (elem) => {
    const dimension = this.getDimension();
    elem.style[dimension] = `${this.props.getDimensionValue(
      dimension,
      elem,
    )}px`;
    triggerBrowserReflow(elem);
  };

  handleExiting = (elem) => {
    elem.style[this.getDimension()] = null;
  };

  // for testing
  _getScrollDimensionValue(elem, dimension) {
    const scroll = `scroll${dimension[0].toUpperCase()}${dimension.slice(1)}`;
    return `${elem[scroll]}px`;
  }

  render() {
    const {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      className,
      children,
      ...props
    } = this.props;

    delete props.dimension;
    delete props.getDimensionValue;

    const handleEnter = createChainedFunction(this.handleEnter, onEnter);
    const handleEntering = createChainedFunction(
      this.handleEntering,
      onEntering,
    );
    const handleEntered = createChainedFunction(this.handleEntered, onEntered);
    const handleExit = createChainedFunction(this.handleExit, onExit);
    const handleExiting = createChainedFunction(this.handleExiting, onExiting);

    return (
      <Transition
        addEndListener={transitionEnd}
        {...props}
        aria-expanded={props.role ? props.in : null}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
      >
        {(state, innerProps) =>
          React.cloneElement(children, {
            ...innerProps,
            className: classNames(
              className,
              children.props.className,
              collapseStyles[state],
              this.getDimension() === 'width' && 'width',
            ),
          })
        }
      </Transition>
    );
  }
}

Collapse.propTypes = propTypes;
Collapse.defaultProps = defaultProps;

export default Collapse;
