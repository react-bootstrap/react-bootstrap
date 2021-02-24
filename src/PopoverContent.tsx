import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface PopoverContentProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'popover-body' */
  bsPrefix: PropTypes.string,
};

const PopoverContent: BsPrefixRefForwardingComponent<
  'div',
  PopoverContentProps
> = React.forwardRef<HTMLElement, PopoverContentProps>(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      bsPrefix,
      className,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-body');

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, bsPrefix)}
      />
    );
  },
);

PopoverContent.propTypes = propTypes;

export default PopoverContent;
