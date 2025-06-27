import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import BaseOverlay, { OverlayArrowProps } from '@restart/ui/Overlay';
import { State } from '@restart/ui/usePopper';
import useEventCallback from '@restart/hooks/useEventCallback';
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import useOverlayOffset from './useOverlayOffset.js';
import Fade from './Fade.js';
import type { TransitionType } from './helpers.js';
import type {
  BaseOverlayProps,
  Placement,
  PopperRef,
  RootCloseEvent,
} from './types.js';

export interface OverlayInjectedProps {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
  'aria-labelledby'?: string;

  arrowProps: Partial<OverlayArrowProps>;

  show: boolean;
  placement: Placement | undefined;
  popper: PopperRef;
  hasDoneInitialMeasure?: boolean;

  [prop: string]: any;
}

export type OverlayChildren =
  | React.ReactElement<OverlayInjectedProps>
  | ((injected: OverlayInjectedProps) => React.ReactNode);

export interface OverlayProps extends BaseOverlayProps {
  /**
   * A component instance, DOM node, or function that returns either.
   */
  children: OverlayChildren;

  /**
   * Animate the entering and exiting of the Overlay. `true` will use the `<Fade>` transition,
   * or a custom react-transition-group `<Transition>` component can be provided.
   *
   * @default Fade
   */
  transition?: TransitionType | undefined;

  /**
   * The placement of the Overlay in relation to it's `target`.
   *
   * @type {Placement | undefined}
   */
  placement?: Placement | undefined;

  /**
   * Specify event for triggering a "root close" toggle.
   */
  rootCloseEvent?: RootCloseEvent | undefined;
}

function wrapRefs(props, arrowProps) {
  const { ref } = props;
  const { ref: aRef } = arrowProps;

  props.ref = ref.__wrapped || (ref.__wrapped = (r) => ref(r));
  arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = (r) => aRef(r));
}

const Overlay = React.forwardRef<HTMLElement, OverlayProps>(
  (
    {
      children: overlay,
      transition = Fade,
      popperConfig = {},
      rootClose = false,
      placement = 'top',
      show: outerShow = false,
      ...outerProps
    },
    outerRef,
  ) => {
    const popperRef = useRef<Partial<PopperRef>>({});
    const [firstRenderedState, setFirstRenderedState] = useState<State | null>(
      null,
    );
    const [ref, modifiers] = useOverlayOffset(outerProps.offset);
    const mergedRef = useMergedRefs(outerRef as any, ref);

    const actualTransition =
      transition === true ? Fade : transition || undefined;

    const handleFirstUpdate = useEventCallback((state) => {
      setFirstRenderedState(state);
      popperConfig?.onFirstUpdate?.(state);
    });

    useIsomorphicEffect(() => {
      if (firstRenderedState && outerProps.target) {
        // Must wait for target element to resolve before updating popper.
        popperRef.current.scheduleUpdate?.();
      }
    }, [firstRenderedState, outerProps.target]);

    useEffect(() => {
      if (!outerShow) {
        setFirstRenderedState(null);
      }
    }, [outerShow]);

    return (
      <BaseOverlay
        {...outerProps}
        ref={mergedRef}
        popperConfig={{
          ...popperConfig,
          modifiers: modifiers.concat(popperConfig.modifiers || []),
          onFirstUpdate: handleFirstUpdate,
        }}
        transition={actualTransition}
        rootClose={rootClose}
        placement={placement}
        show={outerShow}
      >
        {(overlayProps, { arrowProps, popper: popperObj, show }) => {
          wrapRefs(overlayProps, arrowProps);
          // Need to get placement from popper object, handling case when overlay is flipped using 'flip' prop
          const updatedPlacement = popperObj?.placement;
          const popper = Object.assign(popperRef.current, {
            state: popperObj?.state,
            scheduleUpdate: popperObj?.update,
            placement: updatedPlacement,
            outOfBoundaries:
              popperObj?.state?.modifiersData.hide?.isReferenceHidden || false,
            strategy: popperConfig.strategy,
          });

          const hasDoneInitialMeasure = !!firstRenderedState;

          if (typeof overlay === 'function')
            return overlay({
              ...overlayProps,
              placement: updatedPlacement,
              show,
              ...(!transition && show && { className: 'show' }),
              popper,
              arrowProps,
              hasDoneInitialMeasure,
            });

          return React.cloneElement(overlay, {
            ...overlayProps,
            placement: updatedPlacement,
            arrowProps,
            popper,
            hasDoneInitialMeasure,
            className: clsx(
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
  },
);

Overlay.displayName = 'Overlay';

export default Overlay;
