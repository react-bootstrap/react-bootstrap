import classNames from 'classnames';
import React, { cloneElement } from 'react';
import BaseOverlay from 'react-overlays/lib/Overlay';
import elementType from 'react-prop-types/lib/elementType';

import Fade from './Fade';

const propTypes = {
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
    React.PropTypes.bool, elementType,
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
  onExited: React.PropTypes.func,
};

const defaultProps = {
  animation: Fade,
  rootClose: false,
  show: false,
};

class Overlay extends React.Component {
  render() {
    const { animation, children, ...props } = this.props;

    const transition = animation === true ? Fade : animation || null;

    let child;

    if (!transition) {
      child = cloneElement(children, {
        className: classNames(children.props.className, 'in'),
      });
    } else {
      child = children;
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

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
