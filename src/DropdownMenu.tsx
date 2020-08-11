import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import {
  useDropdownMenu,
  UseDropdownMenuValue,
  UseDropdownMenuOptions,
} from 'react-overlays/DropdownMenu';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import NavbarContext from './NavbarContext';
import { useBootstrapPrefix } from './ThemeProvider';
import useWrappedRefWithWarning from './useWrappedRefWithWarning';
import usePopperMarginModifiers from './usePopperMarginModifiers';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
  SelectCallback,
} from './helpers';

export type AlignDirection = 'left' | 'right';

export interface ResponsiveAlignProp {
  sm?: AlignDirection;
  md?: AlignDirection;
  lg?: AlignDirection;
  xl?: AlignDirection;
}

export interface DropdownMenuProps extends BsPrefixPropsWithChildren {
  show?: boolean;
  renderOnMount?: boolean;
  flip?: boolean;
  align?: AlignDirection | ResponsiveAlignProp;
  alignRight?: boolean;
  onSelect?: SelectCallback;
  rootCloseEvent?: 'click' | 'mousedown';
  popperConfig?: UseDropdownMenuOptions['popperConfig'];
}

type DropdownMenu = BsPrefixRefForwardingComponent<'div', DropdownMenuProps>;

const alignDirection = PropTypes.oneOf(['left', 'right']);

export const alignPropType = PropTypes.oneOfType([
  alignDirection,
  PropTypes.shape({
    sm: alignDirection,
    md: alignDirection,
    lg: alignDirection,
    xl: alignDirection,
  }),
]);

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

  /**
   * Aligns the dropdown menu to the specified side of the container. You can also align
   * the menu responsively for breakpoints starting at `sm` and up. The alignment
   * direction will affect the specified breakpoint or larger.
   *
   * *Note: Using responsive alignment will disable Popper usage for positioning.*
   *
   * @type {"left"|"right"|{ sm: "left"|"right", md: "left"|"right", lg: "left"|"right", xl: "left"|"right" }}
   */
  align: alignPropType,

  /**
   * Aligns the Dropdown menu to the right of it's container.
   *
   * @deprecated Use align="right"
   */
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

const defaultProps: Partial<DropdownMenuProps> = {
  align: 'left',
  alignRight: false,
  flip: true,
};

// TODO: remove this hack
type UseDropdownMenuValueHack = UseDropdownMenuValue & { placement: any };

const DropdownMenu: DropdownMenu = React.forwardRef(
  (
    {
      bsPrefix,
      className,
      align,
      alignRight,
      rootCloseEvent,
      flip,
      show: showProps,
      renderOnMount,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      popperConfig,
      ...props
    }: DropdownMenuProps,
    ref,
  ) => {
    const isNavbar = useContext(NavbarContext);
    const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-menu');
    const [popperRef, marginModifiers] = usePopperMarginModifiers();

    const alignClasses: string[] = [];
    if (align) {
      if (typeof align === 'object') {
        Object.keys(align).forEach((brkPoint) => {
          const direction = align[brkPoint];
          if (direction) {
            // .dropdown-menu-right is required for responsively aligning
            // left in addition to align left classes.
            // Reuse alignRight to toggle the class below.
            alignRight = alignRight || direction === 'left';
            alignClasses.push(`${prefix}-${brkPoint}-${direction}`);
          }
        });
      } else if (align === 'right') {
        alignRight = true;
      }
    }

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
      usePopper: !isNavbar && alignClasses.length === 0,
      popperConfig: {
        ...popperConfig,
        modifiers: marginModifiers.concat(popperConfig?.modifiers || []),
      },
    }) as UseDropdownMenuValueHack;

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
      (menuProps as any).show = show;
      (menuProps as any).close = close;
      (menuProps as any).alignRight = alignEnd;
    }

    if (placement) {
      // we don't need the default popper style,
      // menus are display: none when not shown.
      (props as any).style = { ...(props as any).style, ...menuProps.style };
      props['x-placement'] = placement;
    }

    return (
      <Component
        {...props}
        {...menuProps}
        className={classNames(
          className,
          prefix,
          show && 'show',
          alignEnd && `${prefix}-right`,
          ...alignClasses,
        )}
      />
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
