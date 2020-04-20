import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useDropdownMenu } from 'react-overlays/DropdownMenu';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import NavbarContext from './NavbarContext';
import { useBootstrapPrefix } from './ThemeProvider';
import useWrappedRefWithWarning from './useWrappedRefWithWarning';
import usePopperMarginModifiers from './usePopperMarginModifiers';

const propTypes = {
  /**
   * @default 'dropdown-menu'
   */
  bsPrefix: PropTypes.string,

  /** Controls the visibility of the Dropdown menu  */
  show: PropTypes.bool,

  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderOnMount: PropTypes.bool,

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
   * A set of popper options and props passed directly to Popper.
   */
  popperConfig: PropTypes.object,
};

const defaultProps = {
  alignRight: false,
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
      show: showProps,
      renderOnMount,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      popperConfig = {},
      ...props
    },
    ref,
  ) => {
    const isNavbar = useContext(NavbarContext);
    const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-menu');
    const [popperRef, marginModifiers] = usePopperMarginModifiers();

    const {
      hasShown,
      placement,
      show,
      alignEnd,
      close,
      props: menuProps,
    } = useDropdownMenu({
      flip,
      rootCloseEvent,
      show: showProps,
      alignEnd: alignRight,
      usePopper: !isNavbar,
      popperConfig: {
        ...popperConfig,
        modifiers: marginModifiers.concat(popperConfig.modifiers || []),
      },
    });

    menuProps.ref = useMergedRefs(
      popperRef,
      useMergedRefs(
        useWrappedRefWithWarning(ref, 'DropdownMenu'),
        menuProps.ref,
      ),
    );

    if (!hasShown && !renderOnMount) return null;

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
  },
);

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
