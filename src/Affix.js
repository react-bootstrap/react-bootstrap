import React from 'react';
import classNames from 'classnames';
import AffixMixin from './AffixMixin';
import domUtils from './utils/domUtils';

const Affix = React.createClass({
  statics: {
    domUtils
  },

  mixins: [AffixMixin],

  render() {
    let holderStyle = {
      top: this.state.affixPositionTop,
      // we don't want to expose the `style` property
      ...this.props.style // eslint-disable-line react/prop-types
    };

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
