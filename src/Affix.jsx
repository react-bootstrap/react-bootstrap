/** @jsx React.DOM */

var React = require('react');
var AffixMixin = require('./AffixMixin');
var domUtils = require('./utils/domUtils');

var Affix = React.createClass({
  statics: {
    domUtils: domUtils
  },

  mixins: [AffixMixin],

  render: function () {
    var holderStyle = {top: this.state.affixPositionTop};
    return this.transferPropsTo(
      <div className={this.state.affixClass} style={holderStyle}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Affix;