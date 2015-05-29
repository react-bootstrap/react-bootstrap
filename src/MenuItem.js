import React from 'react';
import classNames from 'classnames';

const MenuItem = React.createClass({
  propTypes: {
    header:    React.PropTypes.bool,
    divider:   React.PropTypes.bool,
    href:      React.PropTypes.string,
    title:     React.PropTypes.string,
    target:    React.PropTypes.string,
    onSelect:  React.PropTypes.func,
    eventKey:  React.PropTypes.any,
    active:    React.PropTypes.bool,
    tabIndex:  React.PropTypes.string
  },

  getDefaultProps() {
    return {
      href: '#',
      active: false,
      tabIndex: null
    };
  },

  handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();
      this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
    }
  },

  renderAnchor() {
    return (
      <a onClick={this.handleClick} href={this.props.href} target={this.props.target} title={this.props.title} tabIndex={this.props.tabIndex} role="menuitem">
        {this.props.children}
      </a>
    );
  },

  render() {
    let classes = {
        'dropdown-header': this.props.header,
        'divider': this.props.divider,
        'active': this.props.active
      };

    let children = null;
    if (this.props.header) {
      children = this.props.children;
    } else if (!this.props.divider) {
      children = this.renderAnchor();
    }

    return (
      <li {...this.props} role="presentation" title={null} href={null}
        className={classNames(this.props.className, classes)}>
        {children}
      </li>
    );
  }
});

export default MenuItem;
