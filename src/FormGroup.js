import React from 'react';
import classSet from 'classnames';

class FormGroup extends React.Component {
  render() {
    let classes = {
      'form-group': !this.props.standalone,
      'has-feedback': this.props.hasFeedback,
      'has-success': this.props.bsStyle === 'success',
      'has-warning': this.props.bsStyle === 'warning',
      'has-error': this.props.bsStyle === 'error'
    };

    return (
      <div className={classSet(classes, this.props.groupClassName)}>
        {this.props.children}
      </div>
    );
  }
}

FormGroup.defaultProps = {
  standalone: false
};

FormGroup.propTypes = {
  standalone: React.PropTypes.bool,
  hasFeedback: React.PropTypes.bool,
  bsStyle: React.PropTypes.oneOf(['success', 'warning', 'error']),
  groupClassName: React.PropTypes.string
};

export default FormGroup;
