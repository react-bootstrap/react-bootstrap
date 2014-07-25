/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');
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

    return this.transferPropsTo(
      <div className={classSet(classes)}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Well;