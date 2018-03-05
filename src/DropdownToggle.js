import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import SafeAnchor from './SafeAnchor';

import { bsClass as setBsClass } from './utils/bootstrapUtils';

const propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  useAnchor: PropTypes.bool
};

const defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle'
};

class DropdownToggle extends React.Component {
  render() {
    const {
      open,
      useAnchor,
      bsClass,
      className,
      children,
      ...props
    } = this.props;

    delete props.bsRole;

    const Component = useAnchor ? SafeAnchor : Button;

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
      </Component>
    );
  }
}

DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;

export default setBsClass('dropdown-toggle', DropdownToggle);
