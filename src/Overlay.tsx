import * as React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BaseOverlay, {
  OverlayProps as BaseOverlayProps,
} from 'react-overlays/Overlay';
import safeFindDOMNode from 'react-overlays/safeFindDOMNode';
import { componentOrElement, elementType } from 'prop-types-extra';
import useOverlayOffset from './useOverlayOffset';
import Fade from './Fade';
import { TransitionType } from './helpers';
import { ArrowProps, Placement } from './types';

export interface OverlayInjectedProps {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
  'aria-labelledby'?: string;

  arrowProps: ArrowProps;

  show: boolean;
  placement: Placement;
  popper: {
    state: any;
    outOfBoundaries: boolean;
    placement: Placement;
    scheduleUpdate: () => void;
  };
  [prop: string]: any;
}

export type OverlayChildren =
  | React.ReactElement<OverlayInjectedProps>
  | ((injected: OverlayInjectedProps) => React.ReactNode);

export interface OverlayProps
  extends Omit<BaseOverlayProps, 'children' | 'transition'> {
  children: OverlayChildren;
  transition?: TransitionType;
  placement?: Placement;
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
   * Animate the entering and exiting of the Overlay. `true` will use the `<Fade>` transition,
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

function Overlay({
  children: overlay,
  transition,
  popperConfig = {},
  ...outerProps
}: OverlayProps) {
  const popperRef = useRef({});
  const [ref, modifiers] = useOverlayOffset();

  const actualTransition = transition === true ? Fade : transition || null;

  return (
    <BaseOverlay
      {...outerProps}
      ref={ref}
      popperConfig={{
        ...popperConfig,
        modifiers: modifiers.concat(popperConfig.modifiers || []),
      }}
      transition={actualTransition as any}
    >
      {({
        props: overlayProps,
        arrowProps,
        show,
        update,
        forceUpdate: _,
        placement,
        state,
        ...props
      }) => {
        wrapRefs(overlayProps, arrowProps);
        const popper = Object.assign(popperRef.current, {
          state,
          scheduleUpdate: update,
          placement,
          outOfBoundaries:
            state?.modifiersData.hide?.isReferenceHidden || false,
        });

        if (typeof overlay === 'function')
          return overlay({
            ...props,
            ...overlayProps,
            placement,
            show,
            ...(!transition && show && { className: 'show' }),
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
          style: {
            ...overlay.props.style,
            ...overlayProps.style,
          },
        });
      }}
    </BaseOverlay>
  );
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
