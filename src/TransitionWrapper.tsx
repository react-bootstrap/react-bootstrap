import React, { useCallback, useRef } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import useMergedRefs from '@restart/hooks/useMergedRefs';

export type TransitionWrapperProps = React.ComponentProps<typeof Transition> & {
  childRef?: React.Ref<unknown>;
  children:
    | React.ReactElement
    | ((
        status: TransitionStatus,
        props: Record<string, unknown>,
      ) => React.ReactNode);
};

// Normalizes Transition callbacks when nodeRef is used.
const TransitionWrapper = React.forwardRef<
  Transition<any>,
  TransitionWrapperProps
>(
  (
    {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      addEndListener,
      children,
      childRef,
      ...props
    },
    ref,
  ) => {
    const nodeRef = useRef<HTMLElement>(null);
    const mergedRef = useMergedRefs(nodeRef, childRef);

    const normalize =
      (callback?: (node: HTMLElement, param: any) => void) => (param: any) => {
        if (callback && nodeRef.current) {
          callback(nodeRef.current, param);
        }
      };

    const handleEnter = useCallback(normalize(onEnter), [onEnter]);
    const handleEntering = useCallback(normalize(onEntering), [onEntering]);
    const handleEntered = useCallback(normalize(onEntered), [onEntered]);
    const handleExit = useCallback(normalize(onExit), [onExit]);
    const handleExiting = useCallback(normalize(onExiting), [onExiting]);
    const handleExited = useCallback(normalize(onExited), [onExited]);
    const handleAddEndListener = useCallback(normalize(addEndListener), [
      addEndListener,
    ]);

    return (
      <Transition
        ref={ref}
        {...props}
        onEnter={handleEnter}
        onEntered={handleEntered}
        onEntering={handleEntering}
        onExit={handleExit}
        onExited={handleExited}
        onExiting={handleExiting}
        addEndListener={handleAddEndListener}
        nodeRef={nodeRef}
      >
        {typeof children === 'function'
          ? (((status: TransitionStatus, innerProps: Record<string, unknown>) =>
              // TODO: Types for RTG missing innerProps, so need to cast.
              children(status, {
                ...innerProps,
                ref: mergedRef,
              })) as any)
          : React.cloneElement(
              children as React.ReactElement,
              {
                ref: mergedRef,
              } as any,
            )}
      </Transition>
    );
  },
);

TransitionWrapper.displayName = 'TransitionWrapper';

export default TransitionWrapper;
