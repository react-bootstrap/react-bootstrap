import React from 'react';
import classNames from 'classnames';
import AffixMixin from './AffixMixin';
import domUtils from './utils/domUtils';

const Affix = React.createClass({
  statics: {
    domUtils: domUtils
  },

  mixins: [AffixMixin],

  render() {
    let holderStyle = {top: this.state.affixPositionTop};

    return (
      <div {...this.props}
        className={classNames(this.props.className, this.state.affixClass)}
        style={holderStyle}>
        {this.props.children}
      </div>
    );
  }
});

export default Affix;
