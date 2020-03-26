import React from 'react';
import PropTypes from 'prop-types';

import createChainedFunction from './createChainedFunction';

const propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
  role: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * this is sort of silly but needed for Button
   */
  as: PropTypes.elementType,
};

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}

/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, DropdownItems, etc.
 */
const SafeAnchor = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'a',
      disabled,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const handleClick = (event) => {
      const { href, onClick } = props;

      if (disabled || isTrivialHref(href)) {
        event.preventDefault();
      }

      if (disabled) {
        event.stopPropagation();
        return;
      }

      if (onClick) {
        onClick(event);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        event.preventDefault();
        handleClick(event);
      }
    };

    if (isTrivialHref(props.href)) {
      props.role = props.role || 'button';
      // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')
      props.href = props.href || '#';
    }

    if (disabled) {
      props.tabIndex = -1;
      props['aria-disabled'] = true;
    }

    return (
      <Component
        ref={ref}
        {...props}
        onClick={handleClick}
        onKeyDown={createChainedFunction(handleKeyDown, onKeyDown)}
      />
    );
  },
);

SafeAnchor.propTypes = propTypes;
SafeAnchor.displayName = 'SafeAnchor';

export default SafeAnchor;
