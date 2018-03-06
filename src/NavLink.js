import React from 'react';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';
import { bsClass, prefix, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * The active state of the NavItem item.
   */
  active: PropTypes.bool,

  /**
   * The disabled state of the NavItem item.
   */
  disabled: PropTypes.bool,

  /** The ARIA role for the `NavLink` */
  role: PropTypes.string,

  /** The HTML href attribute for the `NavLink` */
  href: PropTypes.string,

  /**
   * A callback fired when the `NavLink` is clicked.
   * This callback must be handled to trigger a  change in the
   * parent `Nav` component's `active` state.
   *
   * ```
   * (eventKey?: any) => void
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * Uniquely idenifies the `NavItem` amoungst its siblings,
   * used to determine and control the active state ofthe parent `Nav`
   */
  eventKey: PropTypes.any,

  /** @private */
  onClick: PropTypes.func
};

const defaultProps = {
  active: false,
  disabled: false
};

class NavLink extends React.Component {
  handleClick(e) {
    const { onClick, onSelect } = this.props;
    if (onClick) onClick(e);
    if (onSelect) onSelect(e);
  }
  render() {
    const {
      active,
      disabled,
      onClick,
      className,
      style,
      onSelect,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    delete elementProps.onSelect;
    delete elementProps.eventKey;

    if (elementProps.role === 'tab') {
      elementProps['aria-selected'] = active;
    }

    return (
      <SafeAnchor
        {...elementProps}
        disabled={disabled}
        className={prefix(bsProps)}
        onClick={this.handleClick}
      />
    );
  }
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default bsClass('nav-link', NavLink);
