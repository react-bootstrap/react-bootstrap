import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';

import BaseDropdownToggle from 'react-overlays/DropdownToggle';
import React from 'react';

import Button from './Button';
import { useBootstrapPrefix } from './ThemeProvider';

const wrapRef = props => {
  const { ref } = props;
  props.ref = ref.__wrapped || (ref.__wrapped = r => ref(findDOMNode(r)));
  return props;
};

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

const defaultProps = {
  as: Button,
};

const DropdownToggle = React.forwardRef((props, ref) => {
  const {
    bsPrefix,
    split,
    className,
    children,
    childBsPrefix,
    as: Component,
    ...otherProps
  } = props;

  if (childBsPrefix !== undefined) {
    otherProps.bsPrefix = childBsPrefix;
  }

  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-toggle');

  // This intentionally forwards size and variant (if set) to the
  // underlying component, to allow it to render size and style variants.
  return (
    <BaseDropdownToggle ref={ref}>
      {({ toggle, props: toggleProps }) => (
        <Component
          onClick={toggle}
          className={classNames(
            className,
            decoratedBsPrefix,
            split && `${decoratedBsPrefix}-split`,
          )}
          {...wrapRef(toggleProps)}
          {...otherProps}
        >
          {children}
        </Component>
      )}
    </BaseDropdownToggle>
  );
});

DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;

export default DropdownToggle;
