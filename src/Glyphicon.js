import React from 'react';
import classSet from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import constants from './constants';

const Glyphicon = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    glyph: React.PropTypes.oneOf(constants.GLYPHS).isRequired
  },

  getDefaultProps() {
    return {
      bsClass: 'glyphicon'
    };
  },

  render() {
    let classes = this.getBsClassSet();

    classes['glyphicon-' + this.props.glyph] = true;

    return (
      <span {...this.props} className={classSet(this.props.className, classes)}>
        {this.props.children}
      </span>
    );
  }
});

export default Glyphicon;
