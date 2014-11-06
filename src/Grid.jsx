/** @jsx React.DOM */

var React = require('react');
var CustomPropTypes = require('./utils/CustomPropTypes');


var Grid = React.createClass({
  propTypes: {
    fluid: React.PropTypes.bool,
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
      <ComponentClass className={this.props.fluid ? 'container-fluid' : 'container'}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

module.exports = Grid;
