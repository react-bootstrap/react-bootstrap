import React from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BaseOverlay from 'react-overlays/Overlay';
import elementType from 'prop-types-extra/lib/elementType';

import Fade from './Fade';

const propTypes = {
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
  transition: PropTypes.oneOfType([PropTypes.bool, elementType]),

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
  onExited: PropTypes.func,

  /**
   * Sets the direction of the Overlay.
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

const defaultProps = {
  transition: Fade,
  rootClose: false,
  show: false,
  placement: 'top',
};

function wrapRefs(popper) {
  const {
    ref,
    arrowProps: { ref: aRef },
  } = popper;
  popper.ref = ref.__wrapped || (ref.__wrapped = r => ref(findDOMNode(r)));
  popper.arrowProps.ref =
    aRef.__wrapped || (aRef.__wrapped = r => aRef(findDOMNode(r)));
}

function renderOverlay(overlay, popper, { transition, show }) {
  wrapRefs(popper);
  if (!React.isValidElement(overlay)) return overlay(popper);

  let props = popper;
  if (typeof overlay.type === 'string') {
    const { ref, style, placement } = popper;
    props = { style, ref, 'x-placement': placement };
  }
  return React.cloneElement(overlay, {
    ...props,
    className: classNames(
      overlay.props.className,
      !transition && show && 'show',
    ),
    style: { ...overlay.props.style, ...props.style },
  });
}

function Overlay({ children, ...props }) {
  const transition =
    props.transition === true ? Fade : props.transition || null;

  return (
    <BaseOverlay {...props} transition={transition}>
      {popper => renderOverlay(children, popper, props)}
    </BaseOverlay>
  );
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
