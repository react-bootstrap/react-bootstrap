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

  componentWillMount(){
    this._needsFlush = true;
  }

  componentWillRecieveProps(){
    this._needsFlush = true;
  }

  componentDidMount(){
    this._maybeUpdatePosition();
  }
  componentDidUpate(){
    this._maybeUpdatePosition();
  }

  render() {
    let { placement, children } = this.props;
    let { positionLeft, positionTop, ...arrows } = this.props.target ? this.state : {};

    return cloneElement(
      React.Children.only(children), {
        ...arrows,
        placement,
        positionTop,
        positionLeft,
        style: {
          ...children.props.style,
          left: positionLeft,
          top: positionTop
        }
      }
    );
  }

  _maybeUpdatePosition(){
    if ( this._needsFlush ) {
      this._needsFlush = false;
      this._updatePosition();
    }
  }

  _updatePosition() {
    if ( this.props.target == null ){
      return;
    }

    let target = React.findDOMNode(this.props.target(this.props));
    let container = React.findDOMNode(this.props.container) || domUtils.ownerDocument(this).body;

    this.setState(
      calcOverlayPosition(
          this.props.placement
        , React.findDOMNode(this)
        , target
        , container
        , this.props.containerPadding));
  }
}

Position.propTypes = {
  /**
   * The target DOM node the Component is positioned next too.
   */
  target:           React.PropTypes.func,
  /**
   * The "offsetParent" of the Component
   */
  container:        CustomPropTypes.mountable,
  /**
   * Distance in pixels the Component should be positioned to the edge of the Container.
   */
  containerPadding: React.PropTypes.number,
  /**
   * The location that the overlay should be positioned to its target.
   */
  placement:        React.PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};

Position.defaultProps = {
  containerPadding: 0,
  placement:        'right'
};


export default Position;
