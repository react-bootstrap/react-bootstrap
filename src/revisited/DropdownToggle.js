import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import CustomPropTypes from '../utils/CustomPropTypes';

const CARET = <span> <span className='caret' /></span>;

export default class DropdownToggle extends React.Component {
  render() {
    const caret = this.props.noCaret ? null : CARET;

    const classes = {
      'dropdown-toggle': true
    };

    return (
      <Button
        {...this.props}
        className={classNames(classes, this.props.className)}
        type='button'
        aria-haspopup={true}
        aria-expanded={this.props.open}>
        {this.props.title || this.props.children}{caret}
      </Button>
    );
  }
}

const titleAndChildrenValidation = CustomPropTypes.singlePropFrom([
  'title',
  'children'
]);

DropdownToggle.defaultProps = {
  open: false
};

DropdownToggle.propTypes = {
  children: titleAndChildrenValidation,
  noCaret: React.PropTypes.bool,
  open: React.PropTypes.bool,
  title: titleAndChildrenValidation
};
