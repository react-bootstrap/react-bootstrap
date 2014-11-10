/** @jsx React.DOM */

var React = require('react');
var CustomPropTypes = require('./utils/CustomPropTypes');


var Row = React.createClass({
  propTypes: {
    componentClass: CustomPropTypes.componentClass.isRequired
  },

  getDefaultProps: function () {
    return {
      componentClass: React.DOM.div
    };
  },

  render: function () {
    var ComponentClass = this.props.componentClass;

    return this.transferPropsTo(
      <ComponentClass className="row">
        {this.props.children}
      </ComponentClass>
    );
  }
});

module.exports = Row;
