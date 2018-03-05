import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Dropdown from './Dropdown';

/**
 * @inherits Button, Dropdown
 */
class SplitButton extends React.Component {
  static propTypes = {
    /**
     * Accessible label for the toggle; the value of `title` if not specified.
     */
    toggleLabel: PropTypes.string,

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

  static defaultProps = {
    toggleLabel: 'Toggle dropdown'
  };

  render() {
    const {
      bsPrefix,
      size,
      variant,
      title,
      toggleLabel,
      children,
      onClick,
      href,
      menuRole,
      rootCloseEvent,
      ...props
    } = this.props;

    return (
      <Dropdown {...props} componentClass={ButtonGroup}>
        <Button
          size={size}
          variant={variant}
          disabled={props.disabled}
          bsPrefix={bsPrefix}
          href={href}
          onClick={onClick}
        >
          {title}
        </Button>
        <Dropdown.Toggle
          split
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
    );
  }
}

export default SplitButton;
