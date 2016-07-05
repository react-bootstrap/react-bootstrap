import classNames from 'classnames';
import React from 'react';
import all from 'react-prop-types/lib/all';

import SafeAnchor from './SafeAnchor';
import { bsClass, omitBsProps, prefix } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  /**
   * Highlight the menu item as active.
   */
  active: React.PropTypes.bool,

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled: React.PropTypes.bool,

  /**
   * Styles the menu item as a horizontal rule, providing visual separation between
   * groups of menu items.
   */
  divider: all(
    React.PropTypes.bool,
    ({ divider, children }) => (
      divider && children ?
        new Error('Children will not be rendered for dividers') :
        null
    ),
  ),

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey: React.PropTypes.any,

  /**
   * Styles the menu item as a header label, useful for describing a group of menu items.
   */
  header: React.PropTypes.bool,

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href: React.PropTypes.string,

  /**
   * Callback fired when the menu item is clicked.
   */
  onClick: React.PropTypes.func,

  /**
   * Callback fired when the menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: React.PropTypes.func,
};

const defaultProps = {
  divider: false,
  disabled: false,
  header: false,
};

class MenuItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { href, disabled, onSelect, eventKey } = this.props;

    if (!href || disabled) {
      event.preventDefault();
    }

    if (disabled) {
      return;
    }

    if (onSelect) {
      onSelect(eventKey, event);
    }
  }

  render() {
    const {
      active,
      disabled,
      divider,
      header,
      onClick,
      className,
      style,
      ...props,
    } = this.props;

    delete props.eventKey;
    delete props.onSelect;

    if (divider) {
      // Forcibly blank out the children; separators shouldn't render any.
      props.children = undefined;

      return (
        <li
          {...omitBsProps(props)}
          role="separator"
          className={classNames(className, 'divider')}
          style={style}
        />
      );
    }

    if (header) {
      return (
        <li
          {...omitBsProps(props)}
          role="heading"
          className={classNames(className, prefix(props, 'header'))}
          style={style}
        />
      );
    }

    delete props.onSelect;

    return (
      <li
        role="presentation"
        className={classNames(className, { active, disabled })}
        style={style}
      >
        <SafeAnchor
          {...omitBsProps(props)}
          role="menuitem"
          tabIndex="-1"
          onClick={createChainedFunction(onClick, this.handleClick)}
        />
      </li>
    );
  }
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default bsClass('dropdown', MenuItem);
