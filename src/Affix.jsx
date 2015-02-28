var React = require('react');
var classSet = require('classnames');
var AffixMixin = require('./AffixMixin');
var domUtils = require('./utils/domUtils');

var Affix = React.createClass({
  statics: {
    domUtils: domUtils
  },

  mixins: [AffixMixin],

  render: function () {
    var holderStyle = {top: this.state.affixPositionTop};
    return (
      <div {...this.props} className={classSet(this.props.className, this.state.affixClass)} style={holderStyle}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Affix;