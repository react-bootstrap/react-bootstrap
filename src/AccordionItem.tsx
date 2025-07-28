import clsx from 'clsx';
import * as React from 'react';
import { useMemo } from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';
import AccordionItemContext, {
  type AccordionItemContextValue,
} from './AccordionItemContext.js';

export interface AccordionItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'accordion-item'
   */
  bsPrefix?: string | undefined;

  /**
   * A unique key used to control this item's collapse/expand.
   */
  eventKey: string;
}

const AccordionItem: DynamicRefForwardingComponent<'div', AccordionItemProps> =
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
            className={clsx(className, bsPrefix)}
          />
        </AccordionItemContext.Provider>
      );
    },
  );

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
