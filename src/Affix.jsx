/** @jsx React.DOM */

import React          from './react-es6';
import AffixMixin     from './AffixMixin';
import domUtils       from './domUtils';

var Affix = React.createClass({
  statics: {
    domUtils: domUtils
  },

  mixins: [AffixMixin],

  render: function () {
    return this.transferPropsTo(
      <div className={this.state.affixClass} style={{top: this.state.affixPositionTop}}>
        {this.props.children}
      </div>
    );
  }
});

export default = Affix;