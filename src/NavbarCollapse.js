import React from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import { createBootstrapComponent } from './ThemeProvider';
import NavbarContext from './NavbarContext';

class NavbarCollapse extends React.Component {
  static propTypes = {
    /** @default 'navbar-collapse' */
    bsPrefix: PropTypes.string,
  };

  render() {
    const { children, bsPrefix, ...props } = this.props;

    return (
      <NavbarContext.Consumer>
        {context => (
          <Collapse in={!!(context && context.expanded)} {...props}>
            <div className={bsPrefix}>{children}</div>
          </Collapse>
        )}
      </NavbarContext.Consumer>
    );
  }
}

export default createBootstrapComponent(NavbarCollapse, 'navbar-collapse');
