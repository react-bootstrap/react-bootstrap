import * as React from 'react';
import classNames from 'classnames';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface InputGroupTextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'input-group-text'
   */
  bsPrefix?: string | undefined;
}

const InputGroupText: DynamicRefForwardingComponent<
  'span',
  InputGroupTextProps
> = React.forwardRef<HTMLElement, InputGroupTextProps>(
  ({ className, bsPrefix, as: Component = 'span', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'input-group-text');
    return (
      <Component
        ref={ref}
        className={classNames(className, bsPrefix)}
        {...props}
      />
    );
  },
);

InputGroupText.displayName = 'InputGroupText';

export default InputGroupText;
