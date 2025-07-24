import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import usePlaceholder, { type UsePlaceholderProps } from './usePlaceholder.js';
import PlaceholderButton from './PlaceholderButton.js';

export interface PlaceholderProps extends UsePlaceholderProps {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'placeholder'
   */
  bsPrefix?: string | undefined;
}

const Placeholder: DynamicRefForwardingComponent<'span', PlaceholderProps> =
  React.forwardRef<HTMLElement, PlaceholderProps>(
    ({ as: Component = 'span', ...props }, ref) => {
      const placeholderProps = usePlaceholder(props);

      return <Component {...placeholderProps} ref={ref} />;
    },
  );

Placeholder.displayName = 'Placeholder';

export default Object.assign(Placeholder, {
  Button: PlaceholderButton,
});
