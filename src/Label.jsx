var React = require('react');

var classSet = require('classnames');
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
      <span {...this.props} className={classSet(this.props.className, classes)}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Label;