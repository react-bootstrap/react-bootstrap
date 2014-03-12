/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import utils          from './utils';

var DropdownMenu = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },

  render: function () {
    var classes = {
        'dropdown-menu': true,
        'dropdown-menu-right': this.props.pullRight
      };

    return this.transferPropsTo(
        <ul
          className={classSet(classes)}
          role="menu">
          {utils.modifyChildren(this.props.children, this.renderMenuItem)}
        </ul>
      );
  },

  renderMenuItem: function (child) {
    return utils.cloneWithProps(
      child,
      {
        // Capture onSelect events
        onSelect: utils.createChainedFunction(child.props.onSelect, this.props.onSelect),

        // Force special props to be transferred
        key: child.props.key,
        ref: child.props.ref
      }
    );
  }
});

export default = DropdownMenu;