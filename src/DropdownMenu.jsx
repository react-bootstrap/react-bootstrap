/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');
var createChainedFunction = require('./utils/createChainedFunction');
var ValidComponentChildren = require('./utils/ValidComponentChildren');

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
          {ValidComponentChildren.map(this.props.children, this.renderMenuItem)}
        </ul>
      );
  },

  renderMenuItem: function (child) {
    return cloneWithProps(
      child,
      {
        // Capture onSelect events
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),

        // Force special props to be transferred
        key: child.props.key,
        ref: child.props.ref
      }
    );
  }
});

module.exports = DropdownMenu;