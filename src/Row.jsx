var React = require('react');
var classSet = require('classnames');

var Row = React.createClass({
  propTypes: {
    componentClass: React.PropTypes.node.isRequired
  },

  getDefaultProps: function () {
    return {
      componentClass: 'div'
    };
  },

  render: function () {
    var ComponentClass = this.props.componentClass;

    return (
      <ComponentClass {...this.props} className={classSet(this.props.className, 'row')}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

module.exports = Row;