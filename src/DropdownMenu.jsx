/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';

var DropdownMenu = React.createClass({
  propTypes: {
    right: React.PropTypes.bool
  },

  render: function () {
    var classes = {
        'dropdown-menu': true,
        'dropdown-menu-right': this.props.right
      };

    return this.transferPropsTo(
      <ul
        className={classSet(classes)}
        role="menu">
        {this.props.children}
      </ul>
    );
  }
});

export default = DropdownMenu;