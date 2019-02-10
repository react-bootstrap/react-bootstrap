import classNames from 'classnames';
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
    eventKey: PropTypes.string.isRequired,
  };

  render() {
    const { bsPrefix, children, className, eventKey, ...props } = this.props;

    return (
      <AccordionContext.Consumer>
        {context => (
          <Collapse in={context.activeEventKey === eventKey} {...props}>
            <div className={classNames(className, bsPrefix)}>{children}</div>
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
