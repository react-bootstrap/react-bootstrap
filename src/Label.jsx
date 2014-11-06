var React = require('react');
var joinClasses = require('react/lib/joinClasses');
var classSet = require('react/lib/cx');
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

    return (
      <span {...this.props} className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Label;