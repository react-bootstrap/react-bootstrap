import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import Button from './Button';
import usePlaceholder, { type UsePlaceholderProps } from './usePlaceholder';
import type { ButtonVariant } from './types';

export interface PlaceholderButtonProps extends UsePlaceholderProps {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'placeholder'
   */
  bsPrefix?: string | undefined;

  /**
   * Button variant.
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-dark' | 'outline-light'}
   */
  variant?: ButtonVariant | undefined;
}

const PlaceholderButton: DynamicRefForwardingComponent<
  'button',
  PlaceholderButtonProps
> = React.forwardRef<HTMLButtonElement, PlaceholderButtonProps>(
  (props, ref) => {
    const placeholderProps = usePlaceholder(props);

    return <Button {...placeholderProps} ref={ref} disabled tabIndex={-1} />;
  },
);

PlaceholderButton.displayName = 'PlaceholderButton';

export default PlaceholderButton;
