import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from './ThemeProvider';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

type PopoverContentProps = BsPrefixPropsWithChildren;

type PopoverContent = BsPrefixRefForwardingComponent<
  'div',
  PopoverContentProps
>;

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'popover-body' */
  bsPrefix: PropTypes.string,
};

const PopoverContent: PopoverContent = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      bsPrefix,
      className,
      children,
      ...props
    }: PopoverContentProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-body');

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, bsPrefix)}
      >
        {children}
      </Component>
    );
  },
);

PopoverContent.propTypes = propTypes;

export default PopoverContent;
