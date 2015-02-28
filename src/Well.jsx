var React = require('react');
var classSet = require('classnames');
var BootstrapMixin = require('./BootstrapMixin');

var Well = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'well'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return (
      <div {...this.props} className={classSet(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Well;