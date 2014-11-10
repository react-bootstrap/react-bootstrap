/** @jsx React.DOM */

var React = require('react/addons');
var BootstrapMixin = require('./BootstrapMixin');

var ButtonToolbar = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'button-toolbar'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return this.transferPropsTo(
      <div
        role="toolbar"
        className={React.addons.classSet(classes)}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ButtonToolbar;
