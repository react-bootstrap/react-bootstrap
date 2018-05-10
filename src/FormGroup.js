import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

class FormGroup extends React.Component {
  render() {
    let classes = {
      'form-group': !this.props.standalone,
      'form-group-lg': !this.props.standalone && this.props.bsSize === 'large',
      'form-group-sm': !this.props.standalone && this.props.bsSize === 'small',
      'has-feedback': this.props.hasFeedback,
      'has-success': this.props.bsStyle === 'success',
      'has-warning': this.props.bsStyle === 'warning',
      'has-error': this.props.bsStyle === 'error'
    };

    return (
      <div className={classNames(classes, this.props.groupClassName)}>
        {this.props.children}
      </div>
    );
  }
}

FormGroup.defaultProps = {
  hasFeedback: false,
  standalone: false
};

FormGroup.propTypes = {
  standalone: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  bsSize(props) {
    if (props.standalone && props.bsSize !== undefined) {
      return new Error('bsSize will not be used when `standalone` is set.');
    }

    return PropTypes.oneOf(['small', 'medium', 'large'])
      .apply(null, arguments);
  },
  bsStyle: PropTypes.oneOf(['success', 'warning', 'error']),
  groupClassName: PropTypes.string
};

export default FormGroup;
