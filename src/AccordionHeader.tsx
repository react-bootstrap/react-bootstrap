import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionButton from './AccordionButton';
import {
  BsPrefixRefForwardingComponent,
  BsPrefixPropsWithChildren,
} from './helpers';

export interface AccordionHeaderProps
  extends BsPrefixPropsWithChildren,
    React.HTMLAttributes<HTMLElement> {}

type AccordionHeader = BsPrefixRefForwardingComponent<
  'h2',
  AccordionHeaderProps
>;

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'accordion-header' */
  bsPrefix: PropTypes.string,

  /** Click handler for the `AccordionButton` element */
  onClick: PropTypes.func,
};

const AccordionHeader: AccordionHeader = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'h2',
      bsPrefix,
      className,
      children,
      onClick,
      ...props
    }: AccordionHeaderProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-header');

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, bsPrefix)}
      >
        <AccordionButton onClick={onClick}>{children}</AccordionButton>
      </Component>
    );
  },
);

AccordionHeader.propTypes = propTypes;
AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
