import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import all from 'prop-types-extra/lib/all';
import elementType from 'prop-types-extra/lib/elementType';

import chain from './utils/createChainedFunction';
import SafeAnchor from './SafeAnchor';
import SelectableContext, { makeEventKey } from './SelectableContext';
import { createBootstrapComponent } from './ThemeProvider';
import mapContextToProps from './utils/mapContextToProps';
import NavContext from './NavContext';

class DropdownItem extends React.Component {
  static propTypes = {
    /** @default 'dropdown' */
    bsPrefix: PropTypes.string.isRequired,

    /**
     * Highlight the menu item as active.
     */
    active: PropTypes.bool,

    /**
     * Disable the menu item, making it unselectable.
     */
    disabled: PropTypes.bool,

    /**
     * Styles the menu item as a horizontal rule, providing visual separation between
     * groups of menu items.
     */
    divider: all(
      PropTypes.bool,
      ({ divider, children }) =>
        divider && children
          ? new Error('Children will not be rendered for dividers')
          : null
    ),

    /**
     * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
     */
    eventKey: PropTypes.any,

    /**
     * Styles the menu item as a header label, useful for describing a group of menu items.
     */
    header: PropTypes.bool,

    /**
     * HTML `href` attribute corresponding to `a.href`.
     */
    href: PropTypes.string,

    /**
     * Callback fired when the menu item is clicked.
     */
    onClick: PropTypes.func,

    /**
     * Callback fired when the menu item is selected.
     *
     * ```js
     * (eventKey: any, event: Object) => any
     * ```
     */
    onSelect: PropTypes.func,

    componentClass: elementType
  };

  static defaultProps = {
    componentClass: SafeAnchor,
    divider: false,
    disabled: false,
    header: false
  };

  handleClick = event => {
    const { disabled, onSelect, onClick, eventKey, href } = this.props;
    const key = makeEventKey(eventKey, href);
    // SafeAnchor handles the disabled case, but be handle it here
    // for other components
    if (disabled) return;
    if (onClick) onClick(event);
    if (onSelect) onSelect(key, event);
    if (key !== null && this.contextSelect) this.contextSelect(key, event);
  };

  render() {
    const {
      bsPrefix,
      active,
      divider,
      header,
      className,
      children,
      eventKey: _,
      onSelect: _1,
      componentClass: Component,
      ...props
    } = this.props;

    if (divider) {
      return (
        <div
          role="separator"
          {...props}
          className={classNames(className, `${bsPrefix}-divider`)}
        />
      );
    }

    if (header) {
      return (
        <div
          role="heading"
          {...props}
          className={classNames(className, `${bsPrefix}-header`)}
        >
          {children}
        </div>
      );
    }

    return (
      <Component
        {...props}
        className={classNames(
          className,
          `${bsPrefix}-item`,
          active && 'active',
          props.disabled && 'disabled'
        )}
        onClick={this.handleClick}
      >
        {children}
      </Component>
    );
  }
}

export default mapContextToProps(
  createBootstrapComponent(DropdownItem, 'dropdown'),
  [SelectableContext, NavContext],
  (onSelect, navContext, props) => {
    const { activeKey } = navContext || {};
    const key = makeEventKey(props.eventKey, props.href);
    return {
      onSelect: chain(props.onSelect, onSelect),
      active:
        props.active == null && key != null
          ? makeEventKey(activeKey) === key
          : props.active
    };
  }
);
