import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { useBootstrapPrefix } from '../ThemeProvider';

const propTypes = {
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

const defaultProps = {
  vertical: false,
  toggle: false,
  role: 'group',
  as: 'div',
};

const ButtonGroup = React.forwardRef((props, ref) => {
  const {
    bsPrefix,
    size,
    toggle,
    vertical,
    className,
    as: Component,
    ...rest
  } = props;

  const prefix = useBootstrapPrefix(bsPrefix, 'btn-group');
  let baseClass = prefix;

  if (vertical) baseClass = `${prefix}-vertical`;

  return (
    <Component
      {...rest}
      ref={ref}
      className={classNames(
        className,
        baseClass,
        size && `${prefix}-${size}`,
        toggle && `${prefix}-toggle`,
      )}
    />
  );
});

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
