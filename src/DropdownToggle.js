import React from 'react';
import classNames from 'classnames';
import Button from './Button';
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
        {this.props.children || this.props.title}{caret}
      </Component>
    );
  }
}

DropdownToggle.defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle'
};

DropdownToggle.propTypes = {
  bsRole: React.PropTypes.string,
  noCaret: React.PropTypes.bool,
  open: React.PropTypes.bool,
  title: React.PropTypes.string,
  useAnchor: React.PropTypes.bool
};

DropdownToggle.isToggle = true;
DropdownToggle.titleProp = 'title';
DropdownToggle.onClickProp = 'onClick';
