import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import SafeAnchor from './SafeAnchor';

const NavItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    linkId: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    role: React.PropTypes.string,
    title: React.PropTypes.node,
    eventKey: React.PropTypes.any,
    target: React.PropTypes.string,
    'aria-controls': React.PropTypes.string
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
      title,
      target,
      tabIndex,
      id: linkId,
      onClick: this.handleClick
    };

    if (!role && href === '#') {
      linkProps.role = 'button';
    }

    return (
      <li {...props} role="presentation" className={classNames(props.className, classes)}>
        <SafeAnchor {...linkProps} aria-selected={active} aria-controls={ariaControls}>
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
