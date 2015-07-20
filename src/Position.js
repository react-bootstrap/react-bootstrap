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
  }

  componentDidMount() {
    this.updatePosition(this.props, this.getTargetSafe(this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.target !== this.props.target) {
      const target = this.getTargetSafe(this.props);
      const nextTarget = this.getTargetSafe(nextProps);

      if (nextTarget !== target) {
        this.updatePosition(nextProps, nextTarget);
      }
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

  getTargetSafe(props) {
    if (!props.target) {
      return null;
    }

    return props.target(props);
  }

  updatePosition(props, target) {
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
      React.findDOMNode(props.container) || domUtils.ownerDocument(this).body;

    this.setState(calcOverlayPosition(
      props.placement,
      overlay,
      target,
      container,
      props.containerPadding
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
