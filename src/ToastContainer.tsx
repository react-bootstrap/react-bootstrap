import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

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

export interface ToastContainerProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  position?: ToastPosition;
  containerPosition?: string;
}

const propTypes = {
  /**
   * @default 'toast-container'
   */
  bsPrefix: PropTypes.string,

  /**
   * Where the toasts will be placed within the container.
   */
  position: PropTypes.oneOf<ToastPosition>([
    'top-start',
    'top-center',
    'top-end',
    'middle-start',
    'middle-center',
    'middle-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
  ]),

  /**
   * By default the container is rendered with `position-absolute` utility class. Provide a string to use other `position-*` utility classes, or an empty string to remove it.
   *
   * @default 'absolute'
   */
  containerPosition: PropTypes.string,
};

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

const ToastContainer: BsPrefixRefForwardingComponent<
  'div',
  ToastContainerProps
> = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  (
    {
      bsPrefix,
      position,
      containerPosition = 'absolute',
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
        className={classNames(
          bsPrefix,
          position && [
            containerPosition ? `position-${containerPosition}` : null,
            positionClasses[position],
          ],
          className,
        )}
      />
    );
  },
);

ToastContainer.displayName = 'ToastContainer';
ToastContainer.propTypes = propTypes;

export default ToastContainer;
