var React = require('react');
var joinClasses = require('./utils/joinClasses');
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
      <div {...this.props} className={joinClasses(this.props.className, this.state.affixClass)} style={holderStyle}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Affix;