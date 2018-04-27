import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

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
     * Sets list item as active
     */
    active: PropTypes.bool,

    /**
     * Sets list item state as disabled
     */
    disabled: PropTypes.bool,

    /**
     * You can use a custom element type for this component
     */
    as: elementType,
  };

  static defaultProps = {
    variant: null,
    active: false,
    disabled: false,
    as: 'li',
  };

  render() {
    const {
      bsPrefix,
      active,
      disabled,
      className,
      variant,
      as: Component,
      ...props
    } = this.props;

    const classes = classNames(
      bsPrefix,
      active && 'active',
      disabled && 'disabled',
      `${bsPrefix}-${variant}`,
      className,
    );

    return <Component {...props} className={classes} />;
  }
}

export default createBootstrapComponent(ListGroupItem, 'list-group-item');
