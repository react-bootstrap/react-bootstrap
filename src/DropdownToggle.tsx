import classNames from 'classnames';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import React from 'react';
import { useDropdownToggle } from 'react-overlays/DropdownToggle';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import Button, { ButtonProps } from './Button';
import { useBootstrapPrefix } from './ThemeProvider';
import useWrappedRefWithWarning from './useWrappedRefWithWarning';
import { BsPrefixComponent, BsPrefixComponentClass } from './helpers';

export interface DropdownToggleProps {
  id: string;
  split?: boolean;
  childBsPrefix?: string;
}

declare class DropdownToggle<
  // Need to use BsPrefixComponentClass to get proper type checking.
  As extends React.ElementType = BsPrefixComponentClass<'button', ButtonProps>
> extends BsPrefixComponent<As, DropdownToggleProps> {}

const propTypes = {
  /**
   * @default 'dropdown-toggle'
   */
  bsPrefix: PropTypes.string,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(PropTypes.any),

  split: PropTypes.bool,

  as: PropTypes.elementType,

  /**
   * to passthrough to the underlying button or whatever from DropdownButton
   * @private
   */
  childBsPrefix: PropTypes.string,
};

const DropdownToggle = React.forwardRef(
  (
    {
      bsPrefix,
      split,
      className,
      children,
      childBsPrefix,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = Button,
      ...props
    },
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-toggle');

    if (childBsPrefix !== undefined) {
      props.bsPrefix = childBsPrefix;
    }

    const [toggleProps, { toggle }] = useDropdownToggle();

    toggleProps.ref = useMergedRefs(
      toggleProps.ref,
      useWrappedRefWithWarning(ref, 'DropdownToggle'),
    );

    // This intentionally forwards size and variant (if set) to the
    // underlying component, to allow it to render size and style variants.
    return (
      <Component
        onClick={toggle}
        className={classNames(className, prefix, split && `${prefix}-split`)}
        {...toggleProps}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

DropdownToggle.displayName = 'DropdownToggle';
DropdownToggle.propTypes = propTypes;

export default DropdownToggle;
