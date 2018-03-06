import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import * as StyleContext from './StyleContext';

const propTypes = {
  /** Make the set of Buttons appear vertically stacked. */
  vertical: PropTypes.bool,

  /**
   * Display as a button toggle group.
   *
   * (Generally it's better to use `ToggleButtonGroup` directly)
   */
  toggle: PropTypes.bool,

  /**
   * The ARIA role describing the button group. Generallu the default
   * "group" role is correct. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role: PropTypes.string,

  componentClass: elementType
};

const defaultProps = {
  block: false,
  vertical: false,
  toggle: false,
  role: 'group',
  componentClass: 'div'
};

class ButtonGroup extends React.Component {
  render() {
    const {
      bsClass,
      bsSize,
      toggle,
      vertical,
      className,
      componentClass: Component,
      ...props
    } = this.props;

    delete props.bsRole;
    let baseClass = bsClass;
    if (vertical) baseClass = `${bsClass}-vertical`;

    return (
      <Component
        {...props}
        className={classNames(
          className,
          baseClass,
          toggle && `${bsClass}-toggle`,
          bsSize && `${bsClass}-${bsSize}`
        )}
      />
    );
  }
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default StyleContext.createBoostrapComponent(
  { prefix: 'btn-group' },
  ButtonGroup
);
