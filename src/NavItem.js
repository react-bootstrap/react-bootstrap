import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

class NavItem extends React.Component {
  static propTypes = {
    linkId: PropTypes.string,
    onSelect: PropTypes.func,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    onClick: PropTypes.func,
    role: PropTypes.string,
    title: PropTypes.node,
    eventKey: PropTypes.any,
    target: PropTypes.string,
    'aria-controls': PropTypes.string
  };

  static defaultProps = {
    active: false,
    disabled: false
  };

  render() {
    let {
        role,
        linkId,
        disabled,
        active,
        href,
        onClick,
        title,
        target,
        children,
        tabIndex, //eslint-disable-line
        'aria-controls': ariaControls,
        ...props } = this.props;
    let classes = {
      active,
      disabled
    };
    let linkProps = {
      role,
      href,
      onClick: createChainedFunction(onClick, this.handleClick),
      title,
      target,
      tabIndex,
      id: linkId
    };

    if (!role && href === '#') {
      linkProps.role = 'button';
    } else if (role === 'tab') {
      linkProps['aria-selected'] = active;
    }

    return (
      <li {...props} role="presentation" className={classNames(props.className, classes)}>
        <SafeAnchor {...linkProps} aria-controls={ariaControls}>
          { children }
        </SafeAnchor>
      </li>
    );
  }

  handleClick = (e) => {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  };
}

export default NavItem;
