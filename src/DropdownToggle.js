import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { elementType } from 'prop-types-extra';
import BaseDropdownToggle from 'react-overlays/DropdownToggle';
import React from 'react';

import Button from './Button';
import { createBootstrapComponent } from './ThemeProvider';

const wrapRef = props => {
  const { ref } = props;
  props.ref = ref.__wrapped || (ref.__wrapped = r => ref(findDOMNode(r)));
  return props;
};

class DropdownToggle extends React.Component {
  static propTypes = {
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

    as: elementType,

    /**
     * to passthrough to the underlying button or whatever from DropdownButton
     * @private
     */
    childBsPrefix: PropTypes.string,
  };

  static defaultProps = {
    as: Button,
  };

  render() {
    const {
      bsPrefix,
      split,
      className,
      children,
      childBsPrefix,
      as: Component,
      ...props
    } = this.props;

    // This intentionally forwards size and variant (if set) to the
    // underlying component, to allow it to render size and style variants.
    return (
      <BaseDropdownToggle>
        {({ toggle, props: toggleProps }) => (
          <Component
            onClick={toggle}
            bsPrefix={childBsPrefix}
            className={classNames(
              className,
              bsPrefix,
              split && `${bsPrefix}-split`,
            )}
            {...wrapRef(toggleProps)}
            {...props}
          >
            {children}
          </Component>
        )}
      </BaseDropdownToggle>
    );
  }
}

export default createBootstrapComponent(DropdownToggle, 'dropdown-toggle');
