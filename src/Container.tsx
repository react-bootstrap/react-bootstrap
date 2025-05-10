import classNames from 'classnames';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'container'
   */
  bsPrefix?: string | undefined;

  /**
   * Allow the Container to fill all of its available horizontal space.
   */
  fluid?: boolean | string | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | undefined;
}

const Container: DynamicRefForwardingComponent<'div', ContainerProps> =
  React.forwardRef<HTMLElement, ContainerProps>(
    (
      {
        bsPrefix,
        fluid = false,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        className,
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'container');
      const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
      return (
        <Component
          ref={ref}
          {...props}
          className={classNames(
            className,
            fluid ? `${prefix}${suffix}` : prefix,
          )}
        />
      );
    },
  );

Container.displayName = 'Container';

export default Container;
