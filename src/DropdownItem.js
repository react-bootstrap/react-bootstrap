import classNames from 'classnames';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import React from 'react';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';

import chain from './utils/createChainedFunction';
import SafeAnchor from './SafeAnchor';
import SelectableContext, { makeEventKey } from './SelectableContext';
import { createBootstrapComponent } from './ThemeProvider';
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
     * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
     */
    eventKey: PropTypes.any,

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

    as: elementType,
  };

  static defaultProps = {
    as: SafeAnchor,
    disabled: false,
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
      className,
      children,
      eventKey: _,
      onSelect: _1,
      as: Component,
      ...props
    } = this.props;

    return (
      <Component
        {...props}
        className={classNames(
          className,
          bsPrefix,
          active && 'active',
          props.disabled && 'disabled',
        )}
        onClick={this.handleClick}
      >
        {children}
      </Component>
    );
  }
}

export default mapContextToProps(
  [SelectableContext, NavContext],
  (onSelect, navContext, props) => {
    const { activeKey } = navContext || {};
    const key = makeEventKey(props.eventKey, props.href);
    return {
      onSelect: chain(props.onSelect, onSelect),
      active:
        props.active == null && key != null
          ? makeEventKey(activeKey) === key
          : props.active,
    };
  },
  createBootstrapComponent(DropdownItem, 'dropdown-item'),
);
