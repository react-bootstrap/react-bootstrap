import classNames from 'classnames';
import React from 'react';
import deprecated from 'react-prop-types/lib/deprecated';

import ensureDomProps from './utils/ensureDomProps';

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
    /**
     * Adds 'form-control-feedback' class
     * @private
     */
    formControlFeedback: deprecated(
      React.PropTypes.bool,
      'Use `<FormControl.Feedback>`.'
    ),
  },

  getDefaultProps() {
    return {
      bsClass: 'glyphicon',
    };
  },

  render() {
    let className = classNames(this.props.className, {
      [this.props.bsClass]: true,
      ['glyphicon-' + this.props.glyph]: true,
      ['form-control-feedback']: this.props.formControlFeedback
    });

    const domProps = ensureDomProps(this.props, 'span');

    return (
      <span {...domProps} className={className}>
        {this.props.children}
      </span>
    );
  }
});

export default Glyphicon;
