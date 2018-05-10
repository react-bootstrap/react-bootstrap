import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

class Glyphicon extends React.Component {
  static propTypes = {
    /**
     * bootstrap className
     * @private
     */
    bsClass: PropTypes.string,
    /**
     * An icon name. See e.g. http://getbootstrap.com/components/#glyphicons
     */
    glyph: PropTypes.string.isRequired,
    /**
     * Adds 'form-control-feedback' class
     * @private
     */
    formControlFeedback: PropTypes.bool
  };

  static defaultProps = {
    bsClass: 'glyphicon',
    formControlFeedback: false
  };

  render() {
    let className = classNames(this.props.className, {
      [this.props.bsClass]: true,
      ['glyphicon-' + this.props.glyph]: true,
      ['form-control-feedback']: this.props.formControlFeedback
    });

    return (
      <span {...this.props} className={className}>
        {this.props.children}
      </span>
    );
  }
}

export default Glyphicon;
