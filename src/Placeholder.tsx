import * as React from 'react';
import PropTypes from 'prop-types';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import usePlaceholder, { UsePlaceholderProps } from './usePlaceholder';
import PlaceholderButton from './PlaceholderButton';

export interface PlaceholderProps extends UsePlaceholderProps, BsPrefixProps {}

const propTypes = {
  /**
   * @default 'placeholder'
   */
  bsPrefix: PropTypes.string,

  /**
   * Changes the animation of the placeholder.
   *
   * @type ('glow'|'wave')
   */
  animation: PropTypes.string,

  /**
   * Change the background color of the placeholder.
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  bg: PropTypes.string,

  /**
   * Component size variations.
   *
   * @type ('xs'|'sm'|'lg')
   */
  size: PropTypes.string,
};

const Placeholder: BsPrefixRefForwardingComponent<'span', PlaceholderProps> =
  React.forwardRef<HTMLElement, PlaceholderProps>(
    ({ as: Component = 'span', ...props }, ref) => {
      const placeholderProps = usePlaceholder(props);

      return <Component {...placeholderProps} ref={ref} />;
    },
  );

Placeholder.displayName = 'Placeholder';
Placeholder.propTypes = propTypes;

export default Object.assign(Placeholder, {
  Button: PlaceholderButton,
});
