/** @jsx React.DOM */

var React = require('react/addons');
var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');

var Pager = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func
  },

  render: function () {
    return this.transferPropsTo(
      <ul
        className="pager">
        {ValidComponentChildren.map(this.props.children, this.renderPageItem)}
      </ul>
    );
  },

  renderPageItem: function (child, index) {
    return React.addons.cloneWithProps(
      child,
      {
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        key: child.key != null ? child.key : index,
        ref: child.ref
      }
    );
  }
});

module.exports = Pager;
