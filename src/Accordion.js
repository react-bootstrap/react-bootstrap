import classNames from 'classnames';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionContext from './AccordionContext';
import AccordionToggle from './AccordionToggle';
import SelectableContext from './SelectableContext';
import AccordionCollapse from './AccordionCollapse';

const propTypes = {
  /** Set a custom element for this component. */
  as: PropTypes.elementType,

  /** @default 'accordion' */
  bsPrefix: PropTypes.string,
};

const defaultProps = {
  as: 'div',
};

const Accordion = React.forwardRef(
  ({ as: Component, bsPrefix, children, className, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion');

    const [openedId, setOpenedId] = useState('0');

    const onClick = id => setOpenedId(id);

    return (
      <AccordionContext.Provider value={{ onClick, activeEventKey: openedId }}>
        <SelectableContext.Provider value={null}>
          <Component
            ref={ref}
            {...props}
            className={classNames(className, bsPrefix)}
          >
            {children}
          </Component>
        </SelectableContext.Provider>
      </AccordionContext.Provider>
    );
  },
);

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

Accordion.Toggle = AccordionToggle;
Accordion.Collapse = AccordionCollapse;

export default Accordion;
