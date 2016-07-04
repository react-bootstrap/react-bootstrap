import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import SafeAnchor from './SafeAnchor';

import { prefix, bsClass } from './utils/bootstrapUtils';

const CARET = <span> <span className="caret" /></span>;

class DropdownToggle extends React.Component {
  render() {
    const {
      noCaret,
      useAnchor,
      bsClass: baseClass,
      ...props
    } = this.props;

    const caret = noCaret ? null : CARET;

    const classes = {
      [prefix(this.props, 'toggle')]: true
    };

    const Component = useAnchor ? SafeAnchor : Button;

    return (
      <Component
        {...props}
        className={classNames(classes, this.props.className)}
        role="button"
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

export default bsClass('dropdown', DropdownToggle);
