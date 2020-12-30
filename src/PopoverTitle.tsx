import React from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

type PopoverTitleProps = BsPrefixPropsWithChildren;

type PopoverTitle = BsPrefixRefForwardingComponent<'div', PopoverTitleProps>;

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'popover-header' */
  bsPrefix: PropTypes.string,
};

const PopoverTitle: PopoverTitle = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      bsPrefix,
      className,
      children,
      ...props
    }: PopoverTitleProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-header');
    const classNames = useClassNameMapper();

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(bsPrefix, className)}
      >
        {children}
      </Component>
    );
  },
);

PopoverTitle.propTypes = propTypes;

export default PopoverTitle;
