import React from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import { createBootstrapComponent } from './ThemeProvider';
import AccordionContext from './AccordionContext';

class AccordionCollapse extends React.Component {
  static propTypes = {
    /** @default 'accordion-collapse' */
    bsPrefix: PropTypes.string,
    /**
     * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
     */
    eventKey: PropTypes.string,
  };

  render() {
    const { children, bsPrefix, eventKey, ...props } = this.props;

    return (
      <AccordionContext.Consumer>
        {context => (
          <Collapse in={context.activeEventKey === eventKey} {...props}>
            <div className={bsPrefix}>{children}</div>
          </Collapse>
        )}
      </AccordionContext.Consumer>
    );
  }
}

export default createBootstrapComponent(
  AccordionCollapse,
  'accordion-collapse',
);
