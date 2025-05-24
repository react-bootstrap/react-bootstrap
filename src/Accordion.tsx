import clsx from 'clsx';
import * as React from 'react';
import { useMemo } from 'react';
import { useUncontrolled } from 'uncontrollable';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionBody from './AccordionBody';
import AccordionButton from './AccordionButton';
import AccordionCollapse from './AccordionCollapse';
import AccordionContext, {
  type AccordionSelectCallback,
  type AccordionEventKey,
} from './AccordionContext';
import AccordionHeader from './AccordionHeader';
import AccordionItem from './AccordionItem';

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'accordion'
   */
  bsPrefix?: string | undefined;

  /**
   * The current active key that corresponds to the currently expanded card.
   */
  activeKey?: AccordionEventKey | undefined;

  /**
   * The default active key that is expanded on start
   */
  defaultActiveKey?: AccordionEventKey | undefined;

  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: string | string[] | null, event: Object) => void
   * ```
   *
   * @controllable activeIndex
   */
  onSelect?: AccordionSelectCallback | undefined;

  /**
   * Renders accordion edge-to-edge with its parent container.
   */
  flush?: boolean | undefined;

  /**
   * Allow accordion items to stay open when another item is opened.
   */
  alwaysOpen?: boolean | undefined;
}

const Accordion: DynamicRefForwardingComponent<'div', AccordionProps> =
  React.forwardRef<HTMLElement, AccordionProps>((props, ref) => {
    const {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      activeKey,
      bsPrefix,
      className,
      onSelect,
      flush,
      alwaysOpen,
      ...controlledProps
    } = useUncontrolled(props, {
      activeKey: 'onSelect',
    });

    const prefix = useBootstrapPrefix(bsPrefix, 'accordion');
    const contextValue = useMemo(
      () => ({
        activeEventKey: activeKey,
        onSelect,
        alwaysOpen,
      }),
      [activeKey, onSelect, alwaysOpen],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <Component
          ref={ref}
          {...controlledProps}
          className={clsx(className, prefix, flush && `${prefix}-flush`)}
        />
      </AccordionContext.Provider>
    );
  });

Accordion.displayName = 'Accordion';

export default Object.assign(Accordion, {
  Button: AccordionButton,
  Collapse: AccordionCollapse,
  Item: AccordionItem,
  Header: AccordionHeader,
  Body: AccordionBody,
});
