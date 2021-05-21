import classNames from 'classnames';
import * as React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionItemContext, {
  AccordionItemContextValue,
} from './AccordionItemContext';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from './helpers';

export interface AccordionItemProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  eventKey: string;
}

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

const AccordionItem: BsPrefixRefForwardingComponent<'div', AccordionItemProps> =
  React.forwardRef<HTMLElement, AccordionItemProps>(
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        bsPrefix,
        className,
        eventKey,
        ...props
      },
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
