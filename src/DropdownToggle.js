import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import SafeAnchor from './SafeAnchor';

import { bsClass as setBsClass } from './utils/bootstrapUtils';

const propTypes = {
  noCaret: React.PropTypes.bool,
  open: React.PropTypes.bool,
  title: React.PropTypes.string,
  useAnchor: React.PropTypes.bool,
};

const defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle',
};

class DropdownToggle extends React.Component {
  render() {
    const {
      noCaret,
      open,
      useAnchor,
      bsClass,
      className,
      children,
      ...props,
    } = this.props;

    delete props.bsRole;

    const Component = useAnchor ? SafeAnchor : Button;
    const useCaret = !noCaret;

    // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.

    // FIXME: Should this really fall back to `title` as children?

    return (
      <Component
        {...props}
        role="button"
        className={classNames(className, bsClass)}
        aria-haspopup
        aria-expanded={open}
      >
        {children || props.title}
        {useCaret && ' '}
        {useCaret && <span className="caret" />}
      </Component>
    );
  }
}

DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;

export default setBsClass('dropdown-toggle', DropdownToggle);
