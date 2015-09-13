import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import singlePropFrom from 'react-prop-types/lib/singlePropFrom';
import SafeAnchor from './SafeAnchor';

const CARET = <span> <span className="caret" /></span>;

export default class DropdownToggle extends React.Component {
  render() {
    const caret = this.props.noCaret ? null : CARET;

    const classes = {
      'dropdown-toggle': true
    };

    const Component = this.props.useAnchor ? SafeAnchor : Button;

    return (
      <Component
        {...this.props}
        className={classNames(classes, this.props.className)}
        type="button"
        aria-haspopup
        aria-expanded={this.props.open}>
        {this.props.title || this.props.children}{caret}
      </Component>
    );
  }
}

const titleAndChildrenValidation = singlePropFrom(
  'title',
  'children'
);

DropdownToggle.defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle'
};

DropdownToggle.propTypes = {
  bsRole: React.PropTypes.string,
  children: titleAndChildrenValidation,
  noCaret: React.PropTypes.bool,
  open: React.PropTypes.bool,
  title: titleAndChildrenValidation,
  useAnchor: React.PropTypes.bool
};

DropdownToggle.isToggle = true;
DropdownToggle.titleProp = 'title';
DropdownToggle.onClickProp = 'onClick';
