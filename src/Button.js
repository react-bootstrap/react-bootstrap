import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import * as StyleContext from './StyleContext';
import SafeAnchor from './SafeAnchor';

class Button extends React.Component {
  static propTypes = {
    /**
     * @default 'btn'
     */
    bsClass: PropTypes.string,

    /**
     * One or more button variant combinations
     *
     * buttons may be one of a variety of visual variants such as:
     *
     * `'primary', 'secondary', 'success', 'danger', 'warning', 'info, 'dark', 'light', 'link'`
     *
     * as well as "outline" versions (prefixed by 'outline-*')
     *
     * `'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info, 'outline-dark', 'outline-light'`
     */
    bsStyle: PropTypes.string,

    /**
     * Specifies a large or small button.
     *
     * @type ('sm'|'lg')
     */
    bsSize: PropTypes.string,

    /** Manually set the visual state of the button to `:active` */
    active: PropTypes.bool,

    /**
     * Disables the Button, preventing mouse events,
     * even if the underlying component is an `<a>` tag
     */
    disabled: PropTypes.bool,

    /** Providing a `href` will render an `<a>` tag, _styled_ as a button. */
    href: PropTypes.string,

    /**
     * Defines HTML button type attribute.
     *
     * @default 'button'
     */
    type: PropTypes.oneOf(['button', 'reset', 'submit', null]),

    componentClass: elementType
  };

  static defaultProps = {
    bsStyle: 'primary',
    active: false,
    disabled: false,
    type: 'button'
  };

  render() {
    return (
      <StyleContext.Consumer componentType="Button" props={this.props}>
        {({
          bsStyle,
          bsClass,
          bsSize,
          props: { active, block, className, componentClass, ...props }
        }) => {
          const classes = classNames(
            className,
            bsClass,
            `${bsClass}-${bsStyle}`,
            bsSize && `${bsClass}-${bsSize}`,
            block && `${bsClass}-block`,
            active && 'active',
            !!(props.href && props.disabled) && 'disabled'
          );

          if (props.href) {
            return (
              <SafeAnchor
                {...props}
                componentClass={componentClass}
                className={classNames(classes, props.disabled && 'disabled')}
              />
            );
          }

          const Component = componentClass || 'button';
          return <Component {...props} type={props.type} className={classes} />;
        }}
      </StyleContext.Consumer>
    );
  }
}

export default Button;
