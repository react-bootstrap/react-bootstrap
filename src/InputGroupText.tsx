import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface InputGroupTextProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const InputGroupText: BsPrefixRefForwardingComponent<
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
) as typeof InputGroupText;

InputGroupText.displayName = 'InputGroupText';

export default InputGroupText;
