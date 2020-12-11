import classNames from 'classnames';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionItemContext, {
  AccordionItemContextValue,
} from './AccordionItemContext';
import {
  BsPrefixRefForwardingComponent,
  BsPrefixPropsWithChildren,
} from './helpers';

export interface AccordionItemProps
  extends BsPrefixPropsWithChildren,
    React.HTMLAttributes<HTMLElement> {
  eventKey: string;
}

type AccordionItem = BsPrefixRefForwardingComponent<'div', AccordionItemProps>;

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'accordion-item' */
  bsPrefix: PropTypes.string,

  /**
   * A unique key used to control this item's collapse/expand.
   * @required
   */
  eventKey: PropTypes.string.isRequired,
};

const AccordionItem: AccordionItem = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      bsPrefix,
      className,
      eventKey,
      ...props
    }: AccordionItemProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-item');
    const contextValue = useMemo<AccordionItemContextValue>(
      () => ({
        eventKey,
      }),
      [eventKey],
    );

    return (
      <AccordionItemContext.Provider value={contextValue}>
        <Component
          ref={ref}
          {...props}
          className={classNames(className, bsPrefix)}
        />
      </AccordionItemContext.Provider>
    );
  },
);

AccordionItem.propTypes = propTypes;
AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
