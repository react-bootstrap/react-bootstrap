import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

function isTrivialHref(href) {
  return (
    !href ||
    href.trim() === '#'
  );
}

/**
 * There are situations due to browser quirks or bootstrap css where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, MenuItems, etc.
 */
export default class SafeAnchor extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let { href, role, tabIndex, disabled, style, ...props } = this.props;
    let Component = this.props.componentClass || 'a';

    if (isTrivialHref(href)) {
      role = role || 'button';
      // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')
      href = href || '';
    }

    if (disabled) {
      tabIndex = -1;
      style = { pointerEvents: 'none', ...style };
    }

    return (
      <Component
        {...props}
        role={role}
        href={href}
        style={style}
        tabIndex={tabIndex}
        onClick={this.handleClick}
      />
    );
  }

  handleClick(event) {
    let { disabled, href, onClick } = this.props;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  }
}

SafeAnchor.propTypes = {
  href: React.PropTypes.string,
  onClick: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  role: React.PropTypes.string,
  tabIndex: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  /**
   * this is sort of silly but needed for Button
   */
  componentClass: elementType,
};
