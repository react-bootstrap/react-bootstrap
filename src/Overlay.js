import React, { useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BaseOverlay from 'react-overlays/Overlay';
import safeFindDOMNode from 'react-overlays/safeFindDOMNode';
import { componentOrElement, elementType } from 'prop-types-extra';

import Fade from './Fade';

function getMargins(element) {
  const styles = getComputedStyle(element);

  const top = parseFloat(styles.marginTop) || 0;
  const right = parseFloat(styles.marginRight) || 0;
  const bottom = parseFloat(styles.marginBottom) || 0;
  const left = parseFloat(styles.marginLeft) || 0;
  return { top, right, bottom, left };
}

const propTypes = {
  /**
   * A component instance, DOM node, or function that returns either.
   * The `container` element will have the Overlay appended to it via a React portal.
   */
  container: PropTypes.oneOfType([componentOrElement, PropTypes.func]),

  /**
   * A component instance, DOM node, or function that returns either.
   * The overlay will be positioned in relation to the `target`
   */
  target: PropTypes.oneOfType([componentOrElement, PropTypes.func]),

  /**
   * Set the visibility of the Overlay
   */
  show: PropTypes.bool,

  /**
   * A set of popper options and props passed directly to Popper.
   */
  popperConfig: PropTypes.object,

  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: PropTypes.bool,

  /**
   * Specify event for triggering a "root close" toggle.
   */
  rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),

  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: PropTypes.func,

  /**
   * Animate the entering and exiting of the Ovelay. `true` will use the `<Fade>` transition,
   * or a custom react-transition-group `<Transition>` component can be provided.
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
   * The placement of the Overlay in relation to it's `target`.
   */
  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
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

  props.ref = ref.__wrapped || (ref.__wrapped = (r) => ref(safeFindDOMNode(r)));
  arrowProps.ref =
    aRef.__wrapped || (aRef.__wrapped = (r) => aRef(safeFindDOMNode(r)));
}

const marginModifiers = [
  {
    name: 'marginOffsets',
    enabled: true,
    phase: 'beforeRead',
    effect: ({ state }) => {
      return () => {
        state.elements.reference.removeAttribute('aria-describedby');
      };
    },
    fn: ({ state, name }) => {
      const { popper: popperRect } = state.rects;
      const { popper, arrow } = state.elements;

      const popperMargins = getMargins(popper);
      const arrowMargins = arrow && getMargins(arrow);

      state.rects.popper = {
        ...popperRect,
        width: popperRect.width + popperMargins.left + popperMargins.right,
        height: popperRect.height + popperMargins.top + popperMargins.bottom,
        y: popperRect.y - popperMargins.top,
        x: popperRect.x - popperMargins.left,
      };

      state.modifiersData[name] = {
        popper: popperMargins,
        arrow: arrowMargins,
      };
    },
  },
  {
    name: 'marginOffsetArrow',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['arrow'],
    fn({ state }) {
      if (!state.elements.arrow) return;

      const { arrow: arrowMargin } = state.modifiersData.marginOffsets;

      const offsets = state.modifiersData.arrow;

      if (offsets.x != null) offsets.x -= arrowMargin.left;
      if (offsets.y != null) offsets.y -= arrowMargin.top;
    },
  },
];

function Overlay({
  children: overlay,
  transition,
  popperConfig = {},
  ...outerProps
}) {
  const popperRef = useRef({});
  transition = transition === true ? Fade : transition || null;

  return (
    <BaseOverlay
      {...outerProps}
      popperConfig={{
        ...popperConfig,
        modifiers: marginModifiers.concat(popperConfig.modifiers || []),
      }}
      transition={transition}
    >
      {({
        props: overlayProps,
        arrowProps,
        show,
        state,
        scheduleUpdate,
        placement,
        outOfBoundaries,
        ...props
      }) => {
        wrapRefs(overlayProps, arrowProps);
        const popper = Object.assign(popperRef.current, {
          state,
          scheduleUpdate,
          placement,
          outOfBoundaries,
        });

        if (typeof overlay === 'function')
          return overlay({
            ...props,
            ...overlayProps,
            placement,
            show,
            popper,
            arrowProps,
          });

        return React.cloneElement(overlay, {
          ...props,
          ...overlayProps,
          placement,
          arrowProps,
          popper,
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
