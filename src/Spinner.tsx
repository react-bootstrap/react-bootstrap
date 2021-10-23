import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { Variant } from './types';

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLElement>,
    BsPrefixProps {
  animation: 'border' | 'grow';
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

const Spinner: BsPrefixRefForwardingComponent<'div', SpinnerProps> =
  React.forwardRef<HTMLElement, SpinnerProps>(
    (
      {
        bsPrefix,
        variant,
        animation,
        size,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        className,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'spinner');
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
        />
      );
    },
  );

Spinner.propTypes = propTypes as any;
Spinner.displayName = 'Spinner';

export default Spinner;
