import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import BaseDropdownMenu from 'react-overlays/DropdownMenu';
import NavbarContext from './NavbarContext';

import { useBootstrapPrefix } from './ThemeProvider';

const wrapRef = props => {
  const { ref } = props;
  props.ref = ref.__wrapped || (ref.__wrapped = r => ref(findDOMNode(r)));
  return props;
};

const propTypes = {
  /**
   * @default 'dropdown-menu'
   */
  bsPrefix: PropTypes.string,

  /** Controls the visibility of the Dropdown menu  */
  show: PropTypes.bool,

  /** Have the dropdown switch to it's opposite placement when necessary to stay on screen. */
  flip: PropTypes.bool,

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
   * are also injected and should be handled appropriately.
   */
  as: PropTypes.elementType,

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: PropTypes.object,
};

const defaultProps = {
  alignRight: false,
  as: 'div',
  flip: true,
};

const DropdownMenu = React.forwardRef(
  (
    {
      bsPrefix,
      className,
      alignRight,
      rootCloseEvent,
      flip,
      popperConfig,
      show: showProps,
      as: Component,
      ...props
    },
    ref,
  ) => {
    const isNavbar = useContext(NavbarContext);
    const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-menu');

    return (
      <BaseDropdownMenu
        ref={ref} // FIXME: the ref situation is out of hand here
        flip={flip}
        show={showProps}
        alignEnd={alignRight}
        usePopper={!isNavbar}
        popperConfig={popperConfig}
        rootCloseEvent={rootCloseEvent}
      >
        {({ placement, show, alignEnd, close, props: menuProps }) => {
          wrapRef(menuProps);
          // For custom components provide additional, non-DOM, props;
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
                prefix,
                show && 'show',
                alignEnd && `${prefix}-right`,
              )}
            />
          );
        }}
      </BaseDropdownMenu>
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
