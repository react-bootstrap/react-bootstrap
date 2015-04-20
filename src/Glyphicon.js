import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import styleMaps from './styleMaps';

const Glyphicon = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    glyph: React.PropTypes.oneOf(styleMaps.GLYPHS).isRequired
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
      <span {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </span>
    );
  }
});

export default Glyphicon;
