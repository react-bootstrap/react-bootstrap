import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import PopperJs from 'popper.js';

/**
 * The Position component calculates the coordinates for its child, to position
 * it relative to a `target` component or node. Useful for creating callouts
 * and tooltips, the Position component injects a `style` props with `left` and
 * `top` values for positioning your component.
 *
 * It also injects "arrow" `left`, and `top` values for styling callout arrows
 * for giving your components a sense of directionality.
 */
class Position extends React.Component {
  static propTypes = {
    /**
     * A node, element, or function that returns either. The child will be
     * be positioned next to the `target` specified.
     */
    getTarget: PropTypes.func.isRequired,

    /**
     * "offsetParent" of the component
     */
    getBoundary: PropTypes.func.isRequired,

    /**
     * The element to be positioned, defaults to the first child rendered by the Js component
     */
    getElement: PropTypes.func,
    /**
     * The element to be positioned, defaults to the first child rendered by the Popper component
     */
    getArrow: PropTypes.func,

    /**
     * How to position the component relative to the target
     */
    placement: PropTypes.string.isRequired,

    /**
     * Whether the position should be changed on each update
     */
    shouldUpdatePosition: PropTypes.bool,

    children: PropTypes.func.isRequired
  };

  static defaultProps = {
    shouldUpdatePosition: false
  };

  static getDerivedStateFromProps({ placement }, prevState) {
    if (placement !== prevState.placement) {
      // Do our best to re-render with the intended next placement.
      return { placement };
    }
    return null;
  }

  constructor(props, context) {
    super(props, context);

    this.state = this.getNullState();

    this._needsFlush = false;
    this._lastTarget = null;
    this._lastBoundary = null;
    this._lastElement = null;

    this.popper = null;
  }

  componentDidMount() {
    this.updatePosition(
      this.props.getBoundary && this.props.getBoundary(),
      this.props.getTarget(),
      this.getElement()
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;

    const element = this.getElement();
    const target = this.props.getTarget();
    const boundary = this.props.getBoundary && this.props.getBoundary();

    if (
      this.props.placement !== prevProps.placement ||
      element !== this._lastElement ||
      target !== this._lastTarget ||
      boundary !== this._lastBoundary ||
      this.props.shouldUpdatePosition !== prevProps.shouldUpdatePosition
    ) {
      this.updatePosition(boundary, target, element);
    } else if (
      this.popper &&
      this.props.shouldUpdatePosition &&
      this.props.children !== prevProps.children
    ) {
      this.popper.scheduleUpdate();
    }
  }

  componentWillUnmount() {
    if (this.popper) this.popper.destroy();
  }

  onUpdate = ({ placement, offsets, styles, arrowStyles }) => {
    // A change in placement might cause the positioned element to rerender, so
    // schedule a recalculation of the position.
    if (placement !== this.state.placement) {
      this.popper.scheduleUpdate();
    }

    this.setState({
      placement,
      styles,
      arrowStyles,
      position: offsets.popper,
      reference: offsets.reference,
      arrow: offsets.arrow
    });
  };

  getNullState() {
    return {
      placement: this.props.placement,
      position: { visibility: 'hidden' },
      arrowPosition: null
    };
  }

  getElement() {
    let { getElement } = this.props;
    return getElement ? getElement() : ReactDOM.findDOMNode(this);
  }

  updatePosition(boundary, target, element) {
    if (this.popper) this.popper.destroy();

    this._lastBoundary = boundary;
    this._lastTarget = target;
    this._lastElement = element;

    if (!target) {
      this.setState(this.getNullState());

      return;
    }

    const {
      flip,
      popperConfig,
      getArrow,
      placement,
      shouldUpdatePosition
    } = this.props;
    const arrowElement = getArrow ? getArrow() : null;
    const { modifiers: { arrow, preventOverflow, ...modifiers } = {} } =
      popperConfig || {};

    this.popper = new PopperJs(target, element, {
      ...popperConfig,
      placement,
      eventsEnabled: shouldUpdatePosition,
      modifiers: {
        ...modifiers,
        preventOverflow: {
          ...preventOverflow,
          boundariesElement: boundary || 'scrollParent'
        },
        arrow: {
          // explicit so the default selector isn't used
          enabled: !!arrowElement,
          ...arrow,
          element: arrowElement
        },
        flip: { enabled: !!flip },
        computeStyle: { enabled: true },
        applyStyle: { enabled: false }
      },
      onCreate: this.onUpdate,
      onUpdate: this.onUpdate
    });
  }

  render() {
    return this.props.children(this.state);
  }
}

export default Position;
