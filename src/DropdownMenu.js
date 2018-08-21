import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import BaseDropdownMenu from 'react-overlays/DropdownMenu';
import NavbarContext from './NavbarContext';

import { createBootstrapComponent } from './ThemeProvider';

class DropdownMenu extends React.Component {
  static propTypes = {
    /**
     * @default 'dropdown-menu'
     */
    bsPrefix: PropTypes.string,

    /** Controls the visibility of the Dropdown menu  */
    show: PropTypes.bool,

    /** Aligns the Dropdown menu to the right of it's container. */
    alignRight: PropTypes.bool,

    onSelect: PropTypes.func,

    /**
     * Which event when fired outside the component will cause it to be closed
     *
     * *Note: For custom dropdown components, you will have to pass the
     * `rootCloseEvent` to `<RootCloseWrapper>` in your custom dropdown menu
     * component ([similarly to how it is implemented in `<Dropdown.Menu>`](https://github.com/react-bootstrap/react-bootstrap/blob/v0.31.5/src/DropdownMenu.js#L115-L119)).*
     */
    rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),

    /**
     * Control the rendering of the DropdownMenu. All non-menu props
     * (listed here) are passed through to the `as` Component.
     *
     * If providing a custom, non DOM, component. the `show`, `close` and `alignRight` props
     * are also injected and should be handled appropriatedly.
     */
    as: elementType,
  };

  static defaultProps = {
    alignRight: false,
    as: 'div',
  };

  render() {
    const {
      bsPrefix,
      className,
      alignRight,
      rootCloseEvent,
      show: showProps,
      as: Component,
      ...props
    } = this.props;

    // For custom components provide additional, non-DOM, props;

    return (
      <NavbarContext>
        {isNavbar => (
          <BaseDropdownMenu
            show={showProps}
            alignEnd={alignRight}
            usePopper={!isNavbar}
            rootCloseEvent={rootCloseEvent}
          >
            {({ placement, show, alignEnd, close, props: menuProps }) => {
              if (typeof Component !== 'string') {
                menuProps.show = show;
                menuProps.close = close;
                menuProps.alignRight = alignEnd;
              }
              let style = props.style;
              if (placement) {
                // we don't need the default popper style,
                // menus are display: none when not shown.
                style = { ...style, ...menuProps.style };
                props['x-placement'] = placement;
              }
              return (
                <Component
                  {...props}
                  {...menuProps}
                  style={style}
                  className={classNames(
                    className,
                    bsPrefix,
                    show && 'show',
                    alignRight && `${bsPrefix}-right`,
                  )}
                />
              );
            }}
          </BaseDropdownMenu>
        )}
      </NavbarContext>
    );
  }
}

export default createBootstrapComponent(DropdownMenu, 'dropdown-menu');
