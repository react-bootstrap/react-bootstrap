import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Dropdown from './Dropdown';

const propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: PropTypes.any,

  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: PropTypes.string,

  /** An `href` passed to the non-toggle Button */
  href: PropTypes.string,

  /** An anchor `target` passed to the non-toggle Button */
  target: PropTypes.string,

  /** An `onClick` handler passed to the non-toggle Button */
  onClick: PropTypes.func,

  /** The content of the non-toggle Button.  */
  title: PropTypes.node.isRequired,

  /** Disables both Buttons  */
  disabled: PropTypes.bool,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: PropTypes.string,
  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: PropTypes.string,

  /** @ignore */
  bsPrefix: PropTypes.string,
  /** @ignore */
  variant: PropTypes.string,
  /** @ignore */
  size: PropTypes.string,
};

const defaultProps = {
  toggleLabel: 'Toggle dropdown',
};

const SplitButton = React.forwardRef(
  (
    {
      id,
      bsPrefix,
      size,
      variant,
      title,
      toggleLabel,
      children,
      onClick,
      href,
      target,
      menuRole,
      rootCloseEvent,
      ...props
    },
    ref,
  ) => (
    <Dropdown ref={ref} {...props} as={ButtonGroup}>
      <Button
        size={size}
        variant={variant}
        disabled={props.disabled}
        bsPrefix={bsPrefix}
        href={href}
        target={target}
        onClick={onClick}
      >
        {title}
      </Button>
      <Dropdown.Toggle
        split
        id={id}
        size={size}
        variant={variant}
        disabled={props.disabled}
        childBsPrefix={bsPrefix}
      >
        <span className="sr-only">{toggleLabel}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu role={menuRole} rootCloseEvent={rootCloseEvent}>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  ),
);

SplitButton.propTypes = propTypes;
SplitButton.defaultProps = defaultProps;
SplitButton.displayName = 'SplitButton';

export default SplitButton;
