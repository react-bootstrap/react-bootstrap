import classNames from 'classnames';
import React from 'react';

import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  role: React.PropTypes.string,
  href: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  eventKey: React.PropTypes.any,
};

const defaultProps = {
  active: false,
  disabled: false
};

class NavItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, e);
      }
    }
  }

  render() {
    const { active, disabled, onClick, className, style, ...props } =
      this.props;

    delete props.onSelect;
    delete props.eventKey;

    // These are injected down by `<Nav>` for building `<SubNav>`s.
    delete props.activeKey;
    delete props.activeHref;

    if (!props.role) {
      if (props.href === '#') {
        props.role = 'button';
      }
    } else if (props.role === 'tab') {
      props['aria-selected'] = active;
    }

    return (
      <li
        role="presentation"
        className={classNames(className, { active, disabled })}
        style={style}
      >
        <SafeAnchor
          {...props}
          disabled={disabled}
          onClick={createChainedFunction(onClick, this.handleClick)}
        />
      </li>
    );
  }
}

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;

export default NavItem;
