import React from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';

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
    disabled:  React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      active: false,
      divider: false,
      disabled: false,
      header: false
    };
  },

  handleClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }
    if (this.props.onSelect) {
      e.preventDefault();
      this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
    }
  },

  renderAnchor() {
    return (
      <SafeAnchor onClick={this.handleClick} href={this.props.href} target={this.props.target} title={this.props.title} tabIndex="-1">
        {this.props.children}
      </SafeAnchor>
    );
  },

  render() {
    let classes = {
        'dropdown-header': this.props.header,
        'divider': this.props.divider,
        'active': this.props.active,
        'disabled': this.props.disabled
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
