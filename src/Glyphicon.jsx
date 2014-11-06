var React = require('react');
var joinClasses = require('react/lib/joinClasses');
var classSet = require('react/lib/cx');
var BootstrapMixin = require('./BootstrapMixin');
var constants = require('./constants');

var Glyphicon = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    glyph: React.PropTypes.oneOf(constants.GLYPHS).isRequired
  },

  getDefaultProps: function () {
    return {
      bsClass: 'glyphicon'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    classes['glyphicon-' + this.props.glyph] = true;

    return (
      <span {...this.props} className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Glyphicon;