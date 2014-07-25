/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');

var Label = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'label',
      bsStyle: 'default'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return this.transferPropsTo(
      <span className={classSet(classes)}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Label;