import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import SafeAnchor from './SafeAnchor';

const NavItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.node,
    eventKey: React.PropTypes.any,
    target: React.PropTypes.string
  },

  render() {
    let {
        disabled,
        active,
        href,
        title,
        target,
        children,
        ...props } = this.props; // eslint-disable-line object-shorthand
    let classes = {
          active,
          disabled
        };
    let linkProps = {
          href,
          title,
          target,
          onClick: this.handleClick
        };

    if (href === '#') {
      linkProps.role = 'button';
    }

    return (
      <li {...props} className={classNames(props.className, classes)}>
        <SafeAnchor {...linkProps}>
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
