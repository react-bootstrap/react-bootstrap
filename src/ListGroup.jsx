var React = require('react');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');

var ListGroup = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },

  render: function () {
    return (
      <div className="list-group">
        {ValidComponentChildren.map(this.props.children, this.renderListItem)}
      </div>
    );
  },

  renderListItem: function (child, index) {
    return cloneWithProps(child, {
      onClick: createChainedFunction(child.props.onClick, this.props.onClick),
      ref: child.ref,
      key: child.key ? child.key : index
    });
  }
});

module.exports = ListGroup;
