/* eslint react/prop-types: [2, {ignore: ["container", "containerPadding", "target", "placement", "children"] }] */
/* These properties are validated in 'Portal' and 'Position' components */

import React, { cloneElement } from 'react';
import BaseOverlay from 'react-overlays/lib/Overlay';
import elementType from 'react-prop-types/lib/elementType';
import Fade from './Fade';
import classNames from 'classnames';

class Overlay extends React.Component {

  render() {
    let {
        children: child
      , animation: transition
      , ...props } = this.props;

    if (transition === true) {
      transition = Fade;
    }

    if (!transition) {
      child = cloneElement(child, {
        className: classNames('in', child.props.className)
      });
    }

    return (
      <BaseOverlay
        {...props}
        transition={transition}
      >
        {child}
      </BaseOverlay>
    );
  }
}

Overlay.propTypes = {
  ...BaseOverlay.propTypes,

  /**
   * Set the visibility of the Overlay
   */
  show: React.PropTypes.bool,
  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: React.PropTypes.bool,
  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: React.PropTypes.func,

  /**
   * Use animation
   */
  animation: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    elementType
  ]),

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: React.PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: React.PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: React.PropTypes.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: React.PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: React.PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: React.PropTypes.func
};

Overlay.defaultProps = {
  animation: Fade,
  rootClose: false,
  show: false
};

export default Overlay;
