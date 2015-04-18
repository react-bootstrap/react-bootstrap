import React from 'react';
import classNames from 'classnames';

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
      href: '#'
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
        <a
          href={this.props.href}
          title={this.props.title}
          target={this.props.target}
          onClick={this.handleSelect}
          ref="anchor">
          {this.props.children}
        </a>
      </li>
    );
  },

  handleSelect(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

export default PageItem;
