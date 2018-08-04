import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import AbstractNavItem from './AbstractNavItem';
import { makeEventKey } from './SelectableContext';
import { createBootstrapComponent } from './ThemeProvider';

class ListGroupItem extends React.Component {
  static propTypes = {
    /**
     * @default 'list-group-item'
     */
    bsPrefix: PropTypes.string.isRequired,

    /**
     * Sets contextual classes for list item
     * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
     */
    variant: PropTypes.string,
    /**
     * Marks a ListGroupItem as actionable, applying additional hover, active and disabled styles
     * for links and buttons.
     */
    action: PropTypes.bool,
    /**
     * Sets list item as active
     */
    active: PropTypes.bool,

    /**
     * Sets list item state as disabled
     */
    disabled: PropTypes.bool,

    /**
     * You can use a custom element type for this component. For none `action` items, items render as `li`.
     * For actions the default is an achor or button element depending on whether a `href` is provided.
     *
     * @default {'li' | 'a' | 'button'}
     */
    as: elementType,
  };

  static defaultProps = {
    variant: null,
    active: false,
    disabled: false,
  };

  render() {
    const {
      bsPrefix,
      active,
      disabled,
      className,
      variant,
      action,
      as,
      eventKey,
      ...props
    } = this.props;

    return (
      <AbstractNavItem
        {...props}
        eventKey={makeEventKey(eventKey, props.href)}
        // eslint-disable-next-line
        as={as || (action ? (props.href ? 'a' : 'button') : 'li')}
        className={classNames(
          className,
          bsPrefix,
          active && 'active',
          disabled && 'disabled',
          variant && `${bsPrefix}-${variant}`,
          action && `${bsPrefix}-action`,
        )}
      />
    );
  }
}

export default createBootstrapComponent(ListGroupItem, 'list-group-item');
