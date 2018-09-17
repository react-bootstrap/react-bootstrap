import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';

class ButtonGroup extends React.Component {
  static propTypes = {
    /**
     * @default 'btn-group'
     */
    bsPrefix: PropTypes.string,

    /**
     * Sets the size for all Buttons in the group.
     *
     * @type ('sm'|'lg')
     */
    size: PropTypes.string,

    /** Make the set of Buttons appear vertically stacked. */
    vertical: PropTypes.bool,

    /**
     * Display as a button toggle group.
     *
     * (Generally it's better to use `ToggleButtonGroup` directly)
     */
    toggle: PropTypes.bool,

    /**
     * An ARIA role describing the button group. Usually the default
     * "group" role is fine. An `aria-label` or `aria-labelledby`
     * prop is also recommended.
     */
    role: PropTypes.string,

    as: elementType,
  };

  static defaultProps = {
    vertical: false,
    toggle: false,
    role: 'group',
    as: 'div',
  };

  render() {
    const {
      bsPrefix,
      size,
      toggle,
      vertical,
      className,
      as: Component,
      ...props
    } = this.props;

    let baseClass = bsPrefix;
    if (vertical) baseClass = `${bsPrefix}-vertical`;

    return (
      <Component
        {...props}
        className={classNames(
          className,
          baseClass,
          size && `${bsPrefix}-${size}`,
          toggle && `${bsPrefix}-toggle`,
        )}
      />
    );
  }
}

export default createBootstrapComponent(ButtonGroup, 'btn-group');
