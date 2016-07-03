import classNames from 'classnames';
import React from 'react';

const Glyphicon = React.createClass({
  propTypes: {
    /**
     * bootstrap className
     * @private
     */
    bsClass: React.PropTypes.string,
    /**
     * An icon name. See e.g. http://getbootstrap.com/components/#glyphicons
     */
    glyph: React.PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      bsClass: 'glyphicon',
    };
  },

  render() {
    let className = classNames(this.props.className, {
      [this.props.bsClass]: true,
      [`glyphicon-${this.props.glyph}`]: true,
    });

    return (
      <span {...this.props} className={className}>
        {this.props.children}
      </span>
    );
  }
});

export default Glyphicon;
