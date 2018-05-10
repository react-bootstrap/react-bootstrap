import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';

class PageItem extends React.Component {
  static propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    previous: PropTypes.bool,
    next: PropTypes.bool,
    onSelect: PropTypes.func,
    eventKey: PropTypes.any
  };

  static defaultProps = {
    disabled: false,
    previous: false,
    next: false
  };

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
  }

  handleSelect = (e) => {
    if (this.props.onSelect || this.props.disabled) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  };
}

export default PageItem;
