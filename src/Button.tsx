import clsx from 'clsx';
import * as React from 'react';
import {
  useButtonProps,
  type ButtonProps as BaseButtonProps,
} from '@restart/ui/Button';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';
import type { ButtonVariant } from './types.js';

export interface ButtonProps extends BaseButtonProps {
  /**
   * @default 'btn'
   */
  bsPrefix?: string | undefined;

  /**
   * Manually set the visual state of the button to `:active`
   */
  active?: boolean | undefined;

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
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-dark' | 'outline-light'}
   */
  variant?: ButtonVariant | undefined;

  /**
   * Specifies a large or small button.
   *
   * @type {'sm' | 'lg'}
   */
  size?: 'sm' | 'lg' | undefined;

  /**
   * Disables the Button, preventing mouse events,
   * even if the underlying component is an `<a>` element
   */
  disabled?: boolean | undefined;

  /**
   * Providing a `href` will render an `<a>` element, _styled_ as a button.
   */
  href?: string | undefined;
}

export type CommonButtonProps = 'href' | 'size' | 'variant' | 'disabled';

const Button: DynamicRefForwardingComponent<'button', ButtonProps> =
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        as,
        bsPrefix,
        variant = 'primary',
        size,
        active = false,
        disabled = false,
        className,
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'btn');
      const [buttonProps, { tagName }] = useButtonProps({
        tagName: as,
        disabled,
        ...props,
      });

      const Component = tagName as React.ElementType;

      return (
        <Component
          {...buttonProps}
          {...props}
          ref={ref}
          disabled={disabled}
          className={clsx(
            className,
            prefix,
            active && 'active',
            variant && `${prefix}-${variant}`,
            size && `${prefix}-${size}`,
            props.href && disabled && 'disabled',
          )}
        />
      );
    },
  );

Button.displayName = 'Button';

export default Button;
