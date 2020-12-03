import React from 'react';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import AccordionToggle from './AccordionToggle';
import SelectableContext from './SelectableContext';
import AccordionCollapse from './AccordionCollapse';
import AccordionContext from './AccordionContext';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
  SelectCallback,
} from './helpers';

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>,
    BsPrefixPropsWithChildren {
  activeKey?: string;
  defaultActiveKey?: string;
  onSelect?: SelectCallback;
}

type Accordion = BsPrefixRefForwardingComponent<'div', AccordionProps> & {
  Toggle: typeof AccordionToggle;
  Collapse: typeof AccordionCollapse;
};

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'accordion' */
  bsPrefix: PropTypes.string,

  /** The current active key that corresponds to the currently expanded card */
  activeKey: PropTypes.string,

  /** The default active key that is expanded on start */
  defaultActiveKey: PropTypes.string,
};

const Accordion = (React.forwardRef((props: AccordionProps, ref) => {
  const {
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    activeKey,
    bsPrefix,
    children,
    className,
    onSelect,
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  });

  const classNames = useClassNameMapper();
  const finalClassName = classNames(
    className,
    useBootstrapPrefix(bsPrefix, 'accordion'),
  );
  return (
    <AccordionContext.Provider value={activeKey || null}>
      <SelectableContext.Provider value={onSelect || null}>
        <Component ref={ref} {...controlledProps} className={finalClassName}>
          {children}
        </Component>
      </SelectableContext.Provider>
    </AccordionContext.Provider>
  );
}) as unknown) as Accordion;

Accordion.displayName = 'Accordion';
Accordion.propTypes = propTypes;
Accordion.Toggle = AccordionToggle;
Accordion.Collapse = AccordionCollapse;

export default Accordion;
