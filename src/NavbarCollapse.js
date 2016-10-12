import React, { PropTypes } from 'react';

import Collapse from './Collapse';
import { prefix } from './utils/bootstrapUtils';

const contextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
    expanded: PropTypes.bool,
    lazyAutoToggle: PropTypes.bool,
  }),
};

const propTypes = { lazyAutoToggle: PropTypes.bool };

class NavbarCollapse extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { lazyAutoToggle, onToggle } = this.context.$bs_navbar;
    if (lazyAutoToggle && onToggle) {
      onToggle();
    }
  }

  render() {
    const { children, ...props } = this.props;
    const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'collapse');

    return (
      <Collapse in={navbarProps.expanded} {...props}>
        <div className={bsClassName} onClick={this.handleClick}>
          {children}
        </div>
      </Collapse>
    );
  }
}

NavbarCollapse.contextTypes = contextTypes;

NavbarCollapse.propTypes = propTypes;

export default NavbarCollapse;
