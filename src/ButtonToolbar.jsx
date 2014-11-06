var React = require('react');
var joinClasses = require('react/lib/joinClasses');
var classSet = require('react/lib/cx');
var BootstrapMixin = require('./BootstrapMixin');
var Button = require('./Button');

var ButtonToolbar = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'button-toolbar'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return (
      <div
        {...this.props}
        role="toolbar"
        className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ButtonToolbar;