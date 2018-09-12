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

function wrapRefs(props, arrowProps) {
  const { ref } = props;
  const { ref: aRef } = arrowProps;

  props.ref = ref.__wrapped || (ref.__wrapped = r => ref(findDOMNode(r)));
  arrowProps.ref =
    aRef.__wrapped || (aRef.__wrapped = r => aRef(findDOMNode(r)));
}

function Overlay({ children: overlay, transition, ...outerProps }) {
  transition = transition === true ? Fade : transition || null;

  return (
    <BaseOverlay {...outerProps} transition={transition}>
      {({ props: overlayProps, arrowProps, show, ...props }) => {
        wrapRefs(overlayProps, arrowProps);

        if (typeof overlay === 'function')
          return overlay({
            ...props,
            ...overlayProps,
            show,
            arrowProps,
          });

        return React.cloneElement(overlay, {
          ...props,
          ...overlayProps,
          arrowProps,
          className: classNames(
            overlay.props.className,
            !transition && show && 'show',
          ),
          style: { ...overlay.props.style, ...overlayProps.style },
        });
      }}
    </BaseOverlay>
  );
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
