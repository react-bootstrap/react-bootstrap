import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import useUncontrolled from 'uncontrollable/hook';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionToggle from './AccordionToggle';
import SelectableContext from './SelectableContext';
import AccordionCollapse from './AccordionCollapse';
import AccordionContext from './AccordionContext';

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

const defaultProps = {
  as: 'div',
};

const Accordion = React.forwardRef((props, ref) => {
  let {
    as: Component,
    activeKey,
    bsPrefix,
    children,
    className,
    onSelect,
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  });

  bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion');

  return (
    <AccordionContext.Provider value={activeKey}>
      <SelectableContext.Provider value={onSelect}>
        <Component
          ref={ref}
          {...controlledProps}
          className={classNames(className, bsPrefix)}
        >
          {children}
        </Component>
      </SelectableContext.Provider>
    </AccordionContext.Provider>
  );
});

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

Accordion.Toggle = AccordionToggle;
Accordion.Collapse = AccordionCollapse;

export default Accordion;
