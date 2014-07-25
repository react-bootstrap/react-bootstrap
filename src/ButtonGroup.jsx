/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');
var Button = require('./Button');

var ButtonGroup = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    vertical:  React.PropTypes.bool,
    justified: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'button-group'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();
    classes['btn-group'] = !this.props.vertical;
    classes['btn-group-vertical'] = this.props.vertical;
    classes['btn-group-justified'] = this.props.justified;

    return this.transferPropsTo(
      <div
        className={classSet(classes)}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ButtonGroup;