import PropTypes from 'prop-types';
import React from 'react';

import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import { BsPrefixPropsWithChildren } from './helpers';
import { Variant } from './types';

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLElement>,
    BsPrefixPropsWithChildren {
  animation: 'border' | 'grow';
  role?: string;
  size?: 'sm';
  variant?: Variant;
}

const propTypes = {
  /**
   * @default 'spinner'
   */
  bsPrefix: PropTypes.string,

  /**
   * The visual color style of the spinner
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  variant: PropTypes.string,

  /**
   * Changes the animation style of the spinner.
   *
   * @type {('border'|'grow')}
   * @default true
   */
  animation: PropTypes.oneOf(['border', 'grow']).isRequired,

  /**
   * Component size variations.
   *
   * @type {('sm')}
   */
  size: PropTypes.string,

  /**
   * This component may be used to wrap child elements or components.
   */
  children: PropTypes.element,

  /**
   * An ARIA accessible role applied to the Menu component. This should generally be set to 'status'
   */
  role: PropTypes.string,

  /**
   * @default div
   */
  as: PropTypes.elementType,
};

const Spinner = React.forwardRef(
  (
    {
      bsPrefix,
      variant,
      animation,
      size,
      children,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      className,
      ...props
    }: SpinnerProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'spinner');
    const classNames = useClassNameMapper();
    const bsSpinnerPrefix = `${bsPrefix}-${animation}`;

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          bsSpinnerPrefix,
          size && `${bsSpinnerPrefix}-${size}`,
          variant && `text-${variant}`,
        )}
      >
        {children}
      </Component>
    );
  },
);

Spinner.propTypes = propTypes as any;
Spinner.displayName = 'Spinner';

export default Spinner;
