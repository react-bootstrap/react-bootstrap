import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';
import {
  useDropdownMenu,
  UseDropdownMenuOptions,
} from '@restart/ui/DropdownMenu';
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import warning from 'warning';
import DropdownContext, { DropDirection } from './DropdownContext';
import InputGroupContext from './InputGroupContext';
import NavbarContext from './NavbarContext';
import { useBootstrapPrefix } from './ThemeProvider';
import useWrappedRefWithWarning from './useWrappedRefWithWarning';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { AlignType, AlignDirection, alignPropType, Placement } from './types';

export type DropdownMenuVariant = 'dark' | string;

export interface DropdownMenuProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  show?: boolean;
  renderOnMount?: boolean;
  flip?: boolean;
  align?: AlignType;
  rootCloseEvent?: 'click' | 'mousedown';
  popperConfig?: UseDropdownMenuOptions['popperConfig'];
  variant?: DropdownMenuVariant;
}

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
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: alignPropType,

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
   * If providing a custom, non DOM, component. the `show`, `close` and `align` props
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
  variant: PropTypes.string,
};

const defaultProps: Partial<DropdownMenuProps> = {
  flip: true,
};

export function getDropdownMenuPlacement(
  alignEnd: boolean,
  dropDirection?: DropDirection,
  isRTL?: boolean,
) {
  const topStart = isRTL ? 'top-end' : 'top-start';
  const topEnd = isRTL ? 'top-start' : 'top-end';
  const bottomStart = isRTL ? 'bottom-end' : 'bottom-start';
  const bottomEnd = isRTL ? 'bottom-start' : 'bottom-end';
  const leftStart = isRTL ? 'right-start' : 'left-start';
  const leftEnd = isRTL ? 'right-end' : 'left-end';
  const rightStart = isRTL ? 'left-start' : 'right-start';
  const rightEnd = isRTL ? 'left-end' : 'right-end';

  let placement: Placement = alignEnd ? bottomEnd : bottomStart;
  if (dropDirection === 'up') placement = alignEnd ? topEnd : topStart;
  else if (dropDirection === 'end')
    placement = alignEnd ? rightEnd : rightStart;
  else if (dropDirection === 'start')
    placement = alignEnd ? leftEnd : leftStart;
  return placement;
}

const DropdownMenu: BsPrefixRefForwardingComponent<'div', DropdownMenuProps> =
  React.forwardRef<HTMLElement, DropdownMenuProps>(
    (
      {
        bsPrefix,
        className,
        align,
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
      let alignEnd = false;
      const isNavbar = useContext(NavbarContext);
      const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-menu');
      const { align: contextAlign, drop, isRTL } = useContext(DropdownContext);
      align = align || contextAlign;
      const isInputGroup = useContext(InputGroupContext);

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
            alignEnd = direction === 'start';
            alignClasses.push(`${prefix}-${brkPoint}-${direction}`);
          }
        } else if (align === 'end') {
          alignEnd = true;
        }
      }

      const placement = getDropdownMenuPlacement(alignEnd, drop, isRTL);

      const [menuProps, { hasShown, popper, show, toggle }] = useDropdownMenu({
        flip,
        rootCloseEvent,
        show: showProps,
        usePopper: !isNavbar && alignClasses.length === 0,
        offset: [0, 2],
        popperConfig,
        placement,
      });

      menuProps.ref = useMergedRefs(
        useWrappedRefWithWarning(ref, 'DropdownMenu'),
        menuProps.ref,
      );

      useIsomorphicEffect(() => {
        // Popper's initial position for the menu is incorrect when
        // renderOnMount=true. Need to call update() to correct it.
        if (show) popper?.update();
      }, [show]);

      if (!hasShown && !renderOnMount && !isInputGroup) return null;

      // For custom components provide additional, non-DOM, props;
      if (typeof Component !== 'string') {
        menuProps.show = show;
        menuProps.close = () => toggle?.(false);
        menuProps.align = align;
      }

      let style = props.style;
      if (popper?.placement) {
        // we don't need the default popper style,
        // menus are display: none when not shown.
        style = { ...props.style, ...menuProps.style };
        props['x-placement'] = popper.placement;
      }

      return (
        <Component
          {...props}
          {...menuProps}
          style={style}
          // Bootstrap css requires this data attrib to style responsive menus.
          {...((alignClasses.length || isNavbar) && {
            'data-bs-popper': 'static',
          })}
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
