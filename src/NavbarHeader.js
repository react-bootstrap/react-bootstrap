import classNames from 'classnames';
import React, { PropTypes } from 'react';

import { prefix } from './utils/bootstrapUtils';

import ensureDomProps from './utils/ensureDomProps';

let NavbarHeader = React.createClass({

  contextTypes: {
    $bs_navbar_bsClass: PropTypes.string
  },

  render() {
    let { className, ...props } = this.props;
    let { $bs_navbar_bsClass: bsClass = 'navbar' } = this.context;
    let headerClasses = prefix({ bsClass }, 'header');
    const domProps = ensureDomProps(props, 'div');
    return (
      <div {...domProps} className={classNames(className, headerClasses)} />
    );
  }
});

export default NavbarHeader;
