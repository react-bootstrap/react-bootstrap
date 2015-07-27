import React from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';
import CustomPropTypes from './utils/CustomPropTypes';

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
    disabled:  React.PropTypes.bool,
    /**
     * You can use a custom element for inner anchor component
     */
    anchorComponentClass: CustomPropTypes.elementType
  },

  getDefaultProps() {
    return {
      active: false,
      anchorComponentClass: SafeAnchor
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
    let AnchorComponentClass = this.props.anchorComponentClass;
    return (
      <AnchorComponentClass onClick={this.handleClick} href={this.props.href} target={this.props.target} title={this.props.title} tabIndex="-1">
        {this.props.children}
      </AnchorComponentClass>
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
