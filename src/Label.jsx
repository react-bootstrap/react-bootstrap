/** @jsx React.DOM */

var React = require('react/addons');
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
      <span className={React.addons.classSet(classes)}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Label;
