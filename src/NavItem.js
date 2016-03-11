import React, { PropTypes } from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

const NavItem = React.createClass({

  propTypes: {
    linkId: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    onClick: React.PropTypes.func,
    role: React.PropTypes.string,
    title: React.PropTypes.node,
    eventKey: React.PropTypes.any,
    target: React.PropTypes.string,
    'aria-controls': React.PropTypes.string
  },

  contextTypes: {
    $bs_navbar_bsClass: PropTypes.string,
    $bs_navbar_onToggle: PropTypes.func,
    $bs_navbar_expanded: PropTypes.bool
  },

  getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

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

    let {
      $bs_navbar_bsClass: bsClass,
      $bs_navbar_onToggle: onToggle,
      $bs_navbar_expanded: expended
    } = this.context;

    let linkProps = {
      role,
      href,
      onClick: createChainedFunction(onClick, this.handleClick, () => { if (expended) onToggle(); }),
      title,
      target,
      tabIndex,
      id: linkId
    };


    // console.log(onToggle);

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
  },

  handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

export default NavItem;
