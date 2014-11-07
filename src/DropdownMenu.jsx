/** @jsx React.DOM */

var React = require('react');
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
    classes[this.props.className] = true;

    return (
        <ul
          {...this.props}
          className={React.addons.classSet(classes)}
          role="menu">
          {ValidComponentChildren.map(this.props.children, this.renderMenuItem)}
        </ul>
      );
  },

  renderMenuItem: function (child) {
    return React.addons.cloneWithProps(
      child,
      {
        // Capture onSelect events
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),

        // Force special props to be transferred
        key: child.key,
        ref: child.ref
      }
    );
  }
});

module.exports = DropdownMenu;
