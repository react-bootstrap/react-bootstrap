import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import SafeAnchor from './SafeAnchor';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { ButtonVariant } from './types';

export type ButtonType = 'button' | 'reset' | 'submit' | string;

export interface ButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    BsPrefixProps {
  active?: boolean;
  variant?: ButtonVariant;
  size?: 'sm' | 'lg';
  type?: ButtonType;
  href?: string;
  disabled?: boolean;
  target?: any;
}

export type CommonButtonProps = 'href' | 'size' | 'variant' | 'disabled';

const propTypes = {
  /**
   * @default 'btn'
   */
  bsPrefix: PropTypes.string,

  /**
   * One or more button variant combinations
   *
   * buttons may be one of a variety of visual variants such as:
   *
   * `'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'link'`
   *
   * as well as "outline" versions (prefixed by 'outline-*')
   *
   * `'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'outline-light'`
   */
  variant: PropTypes.string,

  /**
   * Specifies a large or small button.
   *
   * @type ('sm'|'lg')
   */
  size: PropTypes.string,

  /** Manually set the visual state of the button to `:active` */
  active: PropTypes.bool,

  /**
   * Disables the Button, preventing mouse events,
   * even if the underlying component is an `<a>` element
   */
  disabled: PropTypes.bool,

  /** Providing a `href` will render an `<a>` element, _styled_ as a button. */
  href: PropTypes.string,

  /**
   * Defines HTML button type attribute.
   *
   * @default 'button'
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit', null]),

  as: PropTypes.elementType,
};

const defaultProps = {
  variant: 'primary',
  active: false,
  disabled: false,
};

const Button: BsPrefixRefForwardingComponent<'button', ButtonProps> =
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
      { bsPrefix, variant, size, active, className, type, as, ...props },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'btn');

      const classes = classNames(
        className,
        prefix,
        active && 'active',
        variant && `${prefix}-${variant}`,
        size && `${prefix}-${size}`,
      );

      if (props.href) {
        return (
          <SafeAnchor
            {...props}
            as={as}
            ref={ref}
            className={classNames(classes, props.disabled && 'disabled')}
          />
        );
      }

      if (!type && !as) {
        type = 'button';
      }

      const Component = as || 'button';
      return <Component {...props} ref={ref} type={type} className={classes} />;
    },
  );

Button.displayName = 'Button';
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
