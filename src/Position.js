import React, { cloneElement } from 'react';
import domUtils from './utils/domUtils';
import { calcOverlayPosition } from './utils/overlayPositionUtils';
import CustomPropTypes from './utils/CustomPropTypes';

class Position extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      positionLeft: null,
      positionTop: null,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };

    this._needsFlush = false;
  }

  componentDidMount() {
    this.updatePosition();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.target !== this.props.target) {
      this._needsFlush = true;
    }
  }

  componentDidUpdate() {
    if (this._needsFlush) {
      this._needsFlush = false;
      this.updatePosition();
    }
  }

  render() {
    const {children, ...props} = this.props;
    const {positionLeft, positionTop, ...arrowPosition } = this.state;

    const child = React.Children.only(children);
    return cloneElement(
      child,
      {
        ...props,
        ...arrowPosition,
        positionTop,
        positionLeft,
        style: {
          ...child.props.style,
          left: positionLeft,
          top: positionTop
        }
      }
    );
  }

  getTargetSafe() {
    if (!this.props.target) {
      return null;
    }

    return this.props.target(this.props);
  }

  updatePosition() {
    const target = this.getTargetSafe();

    if (!target) {
      this.setState({
        positionLeft: null,
        positionTop: null,
        arrowOffsetLeft: null,
        arrowOffsetTop: null
      });

      return;
    }

    const overlay = React.findDOMNode(this);
    const container =
      React.findDOMNode(this.props.container) ||
      domUtils.ownerDocument(this).body;

    this.setState(calcOverlayPosition(
      this.props.placement,
      overlay,
      target,
      container,
      this.props.containerPadding
    ));
  }
}

Position.propTypes = {
  /**
   * Function mapping props to DOM node the component is positioned next to
   */
  target: React.PropTypes.func,
  /**
   * "offsetParent" of the component
   */
  container: CustomPropTypes.mountable,
  /**
   * Minimum spacing in pixels between container border and component border
   */
  containerPadding: React.PropTypes.number,
  /**
   * How to position the component relative to the target
   */
  placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};

Position.defaultProps = {
  containerPadding: 0,
  placement: 'right'
};

export default Position;
