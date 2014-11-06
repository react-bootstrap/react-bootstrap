var React = require('react');
var joinClasses = require('react/lib/joinClasses');
var cloneWithProps = require('react/lib/cloneWithProps');

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');

var Pager = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func
  },

  render: function () {
    return (
      <ul
        {...this.props}
        className={joinClasses(this.props.className, 'pager')}>
        {ValidComponentChildren.map(this.props.children, this.renderPageItem)}
      </ul>
    );
  },

  renderPageItem: function (child, index) {
    return cloneWithProps(
      child,
      {
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: child.ref,
        key: child.key ? child.key : index
      }
    );
  }
});

module.exports = Pager;