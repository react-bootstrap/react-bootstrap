/* eslint react/prop-types: [2, {ignore: ["container", "containerPadding", "target", "placement", "children"] }] */
/* These properties are validated in 'Portal' and 'Position' components */

import PropTypes from 'prop-types';

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

    if (transition === false) {
      transition = null;
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
  show: PropTypes.bool,
  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: PropTypes.bool,
  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: PropTypes.func,

  /**
   * Use animation
   */
  animation: PropTypes.oneOfType([
    PropTypes.bool,
    elementType
  ]),

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: PropTypes.func
};

Overlay.defaultProps = {
  animation: Fade,
  rootClose: false,
  show: false
};

export default Overlay;
