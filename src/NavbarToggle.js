import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';
import NavbarContext from './NavbarContext';

class NavbarToggle extends React.Component {
  static propTypes = {
    /** @default 'navbar-toggler' */
    bsPrefix: PropTypes.string,

    /** An accessible ARIA label for the toggler button. */
    label: PropTypes.string,

    /** @private */
    onClick: PropTypes.func,

    /**
     * The toggle content. When empty, the default toggle will be rendered.
     */
    children: PropTypes.node,

    as: elementType,
  };

  static defaultProps = {
    label: 'Toggle navigation',
    as: 'button',
  };

  handleClick = e => {
    const { onClick } = this.props;
    const { onToggle } = this.navbarContext;

    if (onClick) onClick(e);
    if (onToggle) onToggle();
  };

  render() {
    const {
      bsPrefix,
      className,
      children,
      label,
      as: Component,
      ...props
    } = this.props;

    if (Component === 'button') {
      props.type = 'button';
    }

    return (
      <NavbarContext.Consumer>
        {context => {
          this.navbarContext = context || {};
          return (
            <Component
              {...props}
              onClick={this.handleClick}
              aria-label={label}
              className={classNames(
                className,
                bsPrefix,
                !!(context && context.expanded) && 'collapsed',
              )}
            >
              {children || <span className={`${bsPrefix}-icon`} />}
            </Component>
          );
        }}
      </NavbarContext.Consumer>
    );
  }
}

export default createBootstrapComponent(NavbarToggle, 'navbar-toggler');
