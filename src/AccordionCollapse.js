import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import AccordionContext from './AccordionContext';

const propTypes = {
  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: PropTypes.string.isRequired,

  /** Children prop should only contain a single child, and is enforced as such */
  children: PropTypes.element.isRequired,
};

const AccordionCollapse = React.forwardRef(
  ({ children, eventKey, ...props }, ref) => {
    const contextEventKey = useContext(AccordionContext);

    return (
      <Collapse ref={ref} in={contextEventKey === eventKey} {...props}>
        <div>{React.Children.only(children)}</div>
      </Collapse>
    );
  },
);

AccordionCollapse.propTypes = propTypes;
AccordionCollapse.displayName = 'AccordionCollapse';

export default AccordionCollapse;
