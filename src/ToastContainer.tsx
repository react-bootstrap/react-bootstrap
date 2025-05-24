import clsx from 'clsx';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export type ToastPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'middle-center'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

export interface ToastContainerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'toast-container'
   */
  bsPrefix?: string | undefined;

  /**
   * Where the toasts will be placed within the container.
   */
  position?: ToastPosition | undefined;

  /**
   * Specify the positioning method for the container.
   */
  containerPosition?: string | undefined;
}

const positionClasses = {
  'top-start': 'top-0 start-0',
  'top-center': 'top-0 start-50 translate-middle-x',
  'top-end': 'top-0 end-0',
  'middle-start': 'top-50 start-0 translate-middle-y',
  'middle-center': 'top-50 start-50 translate-middle',
  'middle-end': 'top-50 end-0 translate-middle-y',
  'bottom-start': 'bottom-0 start-0',
  'bottom-center': 'bottom-0 start-50 translate-middle-x',
  'bottom-end': 'bottom-0 end-0',
};

const ToastContainer: DynamicRefForwardingComponent<
  'div',
  ToastContainerProps
> = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  (
    {
      bsPrefix,
      position,
      containerPosition,
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-container');

    return (
      <Component
        ref={ref}
        {...props}
        className={clsx(
          bsPrefix,
          position && positionClasses[position],
          containerPosition && `position-${containerPosition}`,
          className,
        )}
      />
    );
  },
);

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
