import classNames from 'classnames';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionContext from './AccordionContext';

const propTypes = {
  /** @default 'accordion-collapse' */
  bsPrefix: PropTypes.string,
  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: PropTypes.string.isRequired,
};

const AccordionCollapse = React.forwardRef(
  ({ bsPrefix, children, className, eventKey, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-collapse');

    const context = useContext(AccordionContext);

    return (
      <Collapse in={context.activeEventKey === eventKey} {...props}>
        <div ref={ref} className={classNames(className, bsPrefix)}>
          {children}
        </div>
      </Collapse>
    );
  },
);

AccordionCollapse.propTypes = propTypes;

export default AccordionCollapse;
