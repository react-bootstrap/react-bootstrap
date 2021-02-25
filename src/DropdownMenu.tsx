import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import {
  useDropdownMenu,
  UseDropdownMenuValue,
  UseDropdownMenuOptions,
} from 'react-overlays/DropdownMenu';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import warning from 'warning';
import NavbarContext from './NavbarContext';
import { useBootstrapPrefix } from './ThemeProvider';
import useWrappedRefWithWarning from './useWrappedRefWithWarning';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
  SelectCallback,
} from './helpers';

export type AlignDirection = 'start' | 'end';

export type ResponsiveAlignProp =
  | { sm: AlignDirection }
  | { md: AlignDirection }
  | { lg: AlignDirection }
  | { xl: AlignDirection };

export type AlignType = AlignDirection | ResponsiveAlignProp;

export type DropdownMenuVariant = 'dark';

export interface DropdownMenuProps
  extends BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  show?: boolean;
  renderOnMount?: boolean;
  flip?: boolean;
  align?: AlignType;
  alignRight?: boolean;
  onSelect?: SelectCallback;
  rootCloseEvent?: 'click' | 'mousedown';
  popperConfig?: UseDropdownMenuOptions['popperConfig'];
  variant?: DropdownMenuVariant;
}

const alignDirection = PropTypes.oneOf<AlignDirection>(['start', 'end']);

export const alignPropType = PropTypes.oneOfType([
  alignDirection,
  PropTypes.shape({ sm: alignDirection }),
  PropTypes.shape({ md: alignDirection }),
  PropTypes.shape({ lg: alignDirection }),
  PropTypes.shape({ xl: alignDirection }),
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
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"} }
   */
  align: alignPropType,

  /**
   * Aligns the Dropdown menu to the right of it's container.
   *
   * @deprecated Use align="end"
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

  /**
   * Menu color variant.
   *
   * Omitting this will use the default light color.
   */
  variant: PropTypes.oneOf<DropdownMenuVariant>(['dark']),
};

const defaultProps: Partial<DropdownMenuProps> = {
  align: 'start',
  alignRight: false,
  flip: true,
};

// TODO: remove this hack
type UseDropdownMenuValueHack = UseDropdownMenuValue & { placement: any };

const DropdownMenu: BsPrefixRefForwardingComponent<
  'div',
  DropdownMenuProps
> = React.forwardRef<HTMLElement, DropdownMenuProps>(
  (
    {
      bsPrefix,
      className,
      align,
      // When we remove alignRight from API, use the var locally to toggle
      // .dropdown-menu-end class below.
      alignRight,
      rootCloseEvent,
      flip,
      show: showProps,
      renderOnMount,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      popperConfig,
      variant,
      ...props
    },
    ref,
  ) => {
    const isNavbar = useContext(NavbarContext);
    const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-menu');

    const alignClasses: string[] = [];
    if (align) {
      if (typeof align === 'object') {
        const keys = Object.keys(align);

        warning(
          keys.length === 1,
          'There should only be 1 breakpoint when passing an object to `align`',
        );

        if (keys.length) {
          const brkPoint = keys[0];
          const direction: AlignDirection = align[brkPoint];

          // .dropdown-menu-end is required for responsively aligning
          // left in addition to align left classes.
          // Reuse alignRight to toggle the class below.
          alignRight = direction === 'start';
          alignClasses.push(`${prefix}-${brkPoint}-${direction}`);
        }
      } else if (align === 'end') {
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
      offset: [0, 2],
      popperConfig,
    }) as UseDropdownMenuValueHack;

    menuProps.ref = useMergedRefs(
      useWrappedRefWithWarning(ref, 'DropdownMenu'),
      menuProps.ref,
    );

    if (!hasShown && !renderOnMount) return null;

    // For custom components provide additional, non-DOM, props;
    if (typeof Component !== 'string') {
      (menuProps as any).show = show;
      (menuProps as any).close = close;
      (menuProps as any).alignRight = alignEnd;
    }

    let style = props.style;
    if (placement) {
      // we don't need the default popper style,
      // menus are display: none when not shown.
      style = { ...props.style, ...menuProps.style };
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
          alignEnd && `${prefix}-end`,
          variant && `${prefix}-${variant}`,
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
