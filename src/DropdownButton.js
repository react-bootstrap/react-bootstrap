import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';

const propTypes = {
  /** An `href` passed to the Toggle component */
  href: PropTypes.string,

  /** An `onClick` handler passed to the Toggle component */
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
  size: PropTypes.string
};

class DropdownButton extends React.Component {
  render() {
    const {
      title,
      children,
      bsPrefix,
      rootCloseEvent,
      variant,
      size,
      menuRole,
      disabled,
      href,
      ...props
    } = this.props;

    return (
      <Dropdown {...props}>
        <Dropdown.Toggle
          href={href}
          size={size}
          variant={variant}
          disabled={disabled}
          childBsPrefix={bsPrefix}
        >
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu role={menuRole} rootCloseEvent={rootCloseEvent}>
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

DropdownButton.propTypes = propTypes;

export default DropdownButton;
