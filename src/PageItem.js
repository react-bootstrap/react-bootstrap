import React from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';

const PageItem = React.createClass({

  propTypes: {
    href: React.PropTypes.string,
    target: React.PropTypes.string,
    title: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    previous: React.PropTypes.bool,
    next: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    eventKey: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      disabled: false,
      previous: false,
      next: false
    };
  },

  render() {
    let classes = {
      'disabled': this.props.disabled,
      'previous': this.props.previous,
      'next': this.props.next
    };

    return (
      <li
        {...this.props}
        className={classNames(this.props.className, classes)}>
        <SafeAnchor
          href={this.props.href}
          title={this.props.title}
          target={this.props.target}
          onClick={this.handleSelect}>
          {this.props.children}
        </SafeAnchor>
      </li>
    );
  },

  handleSelect(e) {
    if (this.props.onSelect || this.props.disabled) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

export default PageItem;
