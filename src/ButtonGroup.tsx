import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface ButtonGroupProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'lg';
  vertical?: boolean;
}

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
   * An ARIA role describing the button group. Usually the default
   * "group" role is fine. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role: PropTypes.string,

  as: PropTypes.elementType,
};

const defaultProps = {
  vertical: false,
  role: 'group',
};

const ButtonGroup: BsPrefixRefForwardingComponent<'div', ButtonGroupProps> =
  React.forwardRef(
    (
      {
        bsPrefix,
        size,
        vertical,
        className,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        ...rest
      }: ButtonGroupProps,
      ref,
    ) => {
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
          )}
        />
      );
    },
  );

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
