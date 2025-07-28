import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';
import NavbarContext from './NavbarContext.js';

export interface NavbarToggleProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'navbar-toggler'
   */
  bsPrefix?: string | undefined;

  /**
   * An accessible ARIA label for the toggler button.
   */
  label?: string | undefined;

  /**
   * The toggle content. When empty, the default toggle will be rendered.
   */
  children?: React.ReactNode | undefined;
}

const NavbarToggle: DynamicRefForwardingComponent<'button', NavbarToggleProps> =
  React.forwardRef<HTMLElement, NavbarToggleProps>(
    (
      {
        bsPrefix,
        className,
        children,
        label = 'Toggle navigation',
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'button',
        onClick,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-toggler');

      const { onToggle, expanded } = useContext(NavbarContext) || {};

      const handleClick = useEventCallback((e) => {
        if (onClick) onClick(e);
        if (onToggle) onToggle();
      });

      if (Component === 'button') {
        (props as any).type = 'button';
      }

      return (
        <Component
          {...props}
          ref={ref}
          onClick={handleClick}
          aria-label={label}
          className={clsx(className, bsPrefix, !expanded && 'collapsed')}
        >
          {children || <span className={`${bsPrefix}-icon`} />}
        </Component>
      );
    },
  );

NavbarToggle.displayName = 'NavbarToggle';

export default NavbarToggle;
