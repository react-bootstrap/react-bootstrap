import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';
import SafeAnchor from './SafeAnchor';

class Button extends React.Component {
  static propTypes = {
    /**
     * @default 'btn'
     */
    bsPrefix: PropTypes.string,

    /**
     * One or more button variant combinations
     *
     * buttons may be one of a variety of visual variants such as:
     *
     * `'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'link'`
     *
     * as well as "outline" versions (prefixed by 'outline-*')
     *
     * `'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'outline-light'`
     */
    variant: PropTypes.string,

    /**
     * Specifies a large or small button.
     *
     * @type ('sm'|'lg')
     */
    size: PropTypes.string,

    /** Spans the full width of the Button parent */
    block: PropTypes.bool,

    /** Manually set the visual state of the button to `:active` */
    active: PropTypes.bool,

    /**
     * Disables the Button, preventing mouse events,
     * even if the underlying component is an `<a>` element
     */
    disabled: PropTypes.bool,

    /** Providing a `href` will render an `<a>` element, _styled_ as a button. */
    href: PropTypes.string,

    /**
     * Defines HTML button type attribute.
     *
     * @default 'button'
     */
    type: PropTypes.oneOf(['button', 'reset', 'submit', null]),

    as: elementType,
  };

  static defaultProps = {
    variant: 'primary',
    active: false,
    disabled: false,
    type: 'button',
  };

  render() {
    const {
      bsPrefix,
      variant,
      size,
      active,
      className,
      block,
      type,
      as,
      innerRef,
      ...props
    } = this.props;

    const classes = classNames(
      className,
      bsPrefix,
      active && 'active',
      `${bsPrefix}-${variant}`,
      block && `${bsPrefix}-block`,
      size && `${bsPrefix}-${size}`,
    );

    if (props.href) {
      return (
        <SafeAnchor
          {...props}
          as={as}
          innerRef={innerRef}
          className={classNames(classes, props.disabled && 'disabled')}
        />
      );
    }

    const Component = as || 'button';
    if (innerRef) props.ref = innerRef;

    return <Component {...props} type={type} className={classes} />;
  }
}

export default createBootstrapComponent(Button, {
  prefix: 'btn',
  forwardRefAs: 'innerRef',
});
