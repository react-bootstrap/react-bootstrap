import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';
import ListGroupItem from './ListGroupItem';

class ListGroupItemAction extends React.Component {
  static propTypes = {
    /**
     * @default 'list-group-item-action'
     */
    bsPrefix: PropTypes.string.isRequired,

    /**
     * Sets contextual classes for list item
     * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
     */
    variant: PropTypes.string,
    /**
     * Marks a ListGroupItemAction as actionable, applying additional hover, active and disabled styles
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
     * You can use a custom element type for this component. The default is an achor or button element
     * depending on whether a `href` is provided.
     *
     * @default {'a' | 'button'}
     */
    as: elementType,
  };

  static defaultProps = {
    variant: null,
    active: false,
    disabled: false,
  };

  render() {
    const { bsPrefix, as, className, ...props } = this.props;

    return (
      <ListGroupItem
        {...props}
        as={as || (props.href ? 'a' : 'button')}
        className={classNames(className, bsPrefix)}
      />
    );
  }
}

export default createBootstrapComponent(
  ListGroupItemAction,
  'list-group-item-action',
);
