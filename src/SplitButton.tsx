import React from 'react';
import PropTypes from 'prop-types';

import Button, { ButtonType } from './Button';
import ButtonGroup from './ButtonGroup';
import Dropdown from './Dropdown';
import { alignPropTypes, ResponsiveAlignProp } from './DropdownMenu';
import { PropsFromToggle } from './DropdownToggle';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface SplitButtonProps
  extends PropsFromToggle,
    BsPrefixPropsWithChildren {
  id: string | number;
  menuAlign?: ResponsiveAlignProp;
  menuRole?: string;
  onClick?: React.MouseEventHandler<this>;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: 'click' | 'mousedown';
  target?: string;
  title: React.ReactNode;
  toggleLabel?: string;
  type?: ButtonType;
}

type SplitButton = BsPrefixRefForwardingComponent<'div', SplitButtonProps>;

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

  /** A `type` passed to the non-toggle Button */
  type: PropTypes.string,

  /** Disables both Buttons  */
  disabled: PropTypes.bool,

  /**
   * Aligns the dropdown menu responsively.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  menuAlign: alignPropTypes,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: PropTypes.string,

  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: PropTypes.bool,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
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
  type: 'button',
};

const SplitButton: SplitButton = React.forwardRef(
  (
    {
      id,
      bsPrefix,
      size,
      variant,
      title,
      type,
      toggleLabel,
      children,
      onClick,
      href,
      target,
      menuAlign,
      menuRole,
      renderMenuOnMount,
      rootCloseEvent,
      ...props
    }: SplitButtonProps,
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
        type={type}
      >
        {title}
      </Button>
      <Dropdown.Toggle
        split
        id={id ? id.toString() : undefined}
        size={size}
        variant={variant}
        disabled={props.disabled}
        childBsPrefix={bsPrefix}
      >
        <span className="sr-only">{toggleLabel}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        align={menuAlign}
        role={menuRole}
        renderOnMount={renderMenuOnMount}
        rootCloseEvent={rootCloseEvent}
      >
        {children}
      </Dropdown.Menu>
    </Dropdown>
  ),
);

SplitButton.propTypes = propTypes;
SplitButton.defaultProps = defaultProps;
SplitButton.displayName = 'SplitButton';

export default SplitButton;
