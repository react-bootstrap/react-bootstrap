import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';
import AccordionCollapse from './AccordionCollapse.js';
import AccordionItemContext from './AccordionItemContext.js';
import type { TransitionCallbacks } from './types.js';

export interface AccordionBodyProps
  extends TransitionCallbacks, React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'accordion-body'
   */
  bsPrefix?: string | undefined;
}

const AccordionBody: DynamicRefForwardingComponent<'div', AccordionBodyProps> =
  React.forwardRef<HTMLElement, AccordionBodyProps>(
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        bsPrefix,
        className,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-body');
      const { eventKey } = useContext(AccordionItemContext);

      return (
        <AccordionCollapse
          eventKey={eventKey}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
        >
          <Component
            ref={ref}
            {...props}
            className={clsx(className, bsPrefix)}
          />
        </AccordionCollapse>
      );
    },
  );

AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
