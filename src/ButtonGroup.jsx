/** @jsx React.DOM */

var React = require('react/addons');
var BootstrapMixin = require('./BootstrapMixin');

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
        className={React.addons.classSet(classes)}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ButtonGroup;
