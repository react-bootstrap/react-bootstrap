import type {
  Offset,
  State,
  UsePopperOptions,
  UsePopperState,
  VirtualElement,
} from '@restart/ui/usePopper';
import type { ToggleMetadata } from '@restart/ui/Dropdown';
import type ModalManager from '@restart/ui/ModalManager';
import type { EventKey, SelectCallback } from '@restart/ui/types';
import type { DropDirection } from './DropdownContext.js';

export type DOMContainer<T extends HTMLElement | VirtualElement = HTMLElement> =

    | T
    | React.RefObject<T | null>
    | null
    | (() => T | React.RefObject<T | null> | null);

export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | (string & {});
export type ButtonVariant =
  | Variant
  | 'link'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-dark'
  | 'outline-light';
export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | 'white'
  | 'muted'
  | (string & {});

export type Placement = import('@restart/ui/usePopper').Placement;

export type AlignDirection = 'start' | 'end';

export type ResponsiveAlignProp =
  | { sm: AlignDirection }
  | { md: AlignDirection }
  | { lg: AlignDirection }
  | { xl: AlignDirection }
  | { xxl: AlignDirection }
  | Record<string, AlignDirection>;

export type AlignType = AlignDirection | ResponsiveAlignProp;

export type RootCloseEvent = 'click' | 'mousedown';

export type GapValue = 0 | 1 | 2 | 3 | 4 | 5 | number;

export interface PopperRef {
  state: State | undefined;
  outOfBoundaries: boolean;
  placement: Placement | undefined;
  scheduleUpdate?: () => void;
  strategy: UsePopperOptions['strategy'];
}

export interface TransitionCallbacks {
  /**
   * Callback fired before the component transitions in
   *
   * @type {((node: HTMLElement, isAppearing: boolean) => any) | undefined}
   */
  onEnter?: ((node: HTMLElement, isAppearing: boolean) => any) | undefined;

  /**
   * Callback fired as the component begins to transition in
   *
   * @type {((node: HTMLElement, isAppearing: boolean) => any) | undefined}
   */
  onEntering?: ((node: HTMLElement, isAppearing: boolean) => any) | undefined;

  /**
   * Callback fired after the component finishes transitioning in
   *
   * @type {((node: HTMLElement, isAppearing: boolean) => any) | undefined}
   */
  onEntered?: ((node: HTMLElement, isAppearing: boolean) => any) | undefined;

  /**
   * Callback fired right before the component transitions out
   *
   * @type {((node: HTMLElement) => any) | undefined}
   */
  onExit?: ((node: HTMLElement) => any) | undefined;

  /**
   * Callback fired as the component begins to transition out
   *
   * @type {((node: HTMLElement) => any) | undefined}
   */
  onExiting?: ((node: HTMLElement) => any) | undefined;

  /**
   * Callback fired after the component finishes transitioning out
   *
   * @type {((node: HTMLElement) => any) | undefined}
   */
  onExited?: ((node: HTMLElement) => any) | undefined;
}

// A copy of types from @restart/ui so react-docgen can parse it
export interface BaseDropdownProps {
  /**
   * The PopperJS placement for positioning the Dropdown menu in relation to
   * its Toggle.
   *
   * @type {'auto' | 'auto-start' | "auto-end' | 'top' | 'bottom' | 'right' | 'left' | 'top-start' | "top-end | 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end' | 'left-start' | 'left-end'}
   * @default 'bottom-start'
   */
  placement?: Placement | undefined;

  /**
   * Sets the initial visibility of the Dropdown.
   */
  defaultShow?: boolean | undefined;

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show?: boolean | undefined;

  /**
   * A callback fired when a DropdownItem has been selected.
   *
   * @type {((eventKey: string | null, e: React.SyntheticEvent<any>) => void) | undefined}
   */
  onSelect?: SelectCallback | undefined;

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with
   * the requested `show` value, the DOM event, and the source that fired it:
   * `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```ts static
   * function(
   *   nextShow: boolean,
   *   meta: ToggleMetadata,
   * ): void
   * ```
   * @type {((nextShow: boolean, meta: ToggleMetadata) => void) | undefined}
   * @controllable show
   */
  onToggle?: ((nextShow: boolean, meta: ToggleMetadata) => void) | undefined;

  /**
   * Controls the focus behavior for when the Dropdown is opened. Set to
   * `true` to always focus the first menu item, `keyboard` to focus only when
   * navigating via the keyboard, or `false` to disable completely
   *
   * The Default behavior is `false` **unless** the Menu has a `role="menu"`
   * where it will default to `keyboard` to match the recommended [ARIA Authoring
   * practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
   */
  focusFirstItemOnShow?: boolean | 'keyboard' | undefined;

  /**
   * A render prop that returns the root dropdown element. The `props`
   * argument should spread through to an element containing _both_ the
   * menu and toggle in order to handle keyboard events for focus management.
   */
  children: React.ReactNode;
}

export interface BaseNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /**
   * Key for the currently active NavItem.
   *
   * @type {string | number | undefined}
   */
  activeKey?: EventKey | undefined;

  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * A callback fired when a NavItem has been selected.
   *
   * @type {((eventKey: string | null, e: React.SyntheticEvent<any>) => void) | undefined}
   */
  onSelect?: SelectCallback;
}

export interface BaseNavItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Highlight the NavItem as active.
   */
  active?: boolean | undefined;

  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * Disable the NavItem, making it unselectable.
   */
  disabled?: boolean | undefined;

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected NavItem.
   *
   * @type {string | number | undefined}
   */
  eventKey?: EventKey | undefined;

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href?: string | undefined;
}

export interface BaseModalProps extends TransitionCallbacks {
  /**
   * Set the visibility of the Modal
   */
  show?: boolean | undefined;

  /**
   * A DOM element, a `ref` to an element, or function that returns either. The Modal is appended to it's `container` element.
   *
   */
  container?: DOMContainer | undefined;

  /**
   * A callback fired when the Modal is opening.
   *
   * @type {(() => void) | undefined}
   */
  onShow?: (() => void) | undefined;

  /**
   * A callback fired when either the backdrop is clicked, or the escape key is pressed.
   *
   * The `onHide` callback only signals intent from the Modal,
   * you must actually set the `show` prop to `false` for the Modal to close.
   *
   * @type {(() => void) | undefined}
   */
  onHide?: (() => void) | undefined;

  /**
   * A ModalManager instance used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container
   *
   * @type {ModalManager | undefined}
   */
  manager?: ModalManager | undefined;

  /**
   * Include a backdrop component. A `static`backdrop
   * will not trigger a Modal onHide when clicked.
   */
  backdrop?: boolean | 'static' | undefined;

  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   *
   * If preventDefault() is called on the keyboard event, closing the modal will be cancelled.
   *
   * @type {((e: KeyboardEvent) => void) | undefined}
   */
  onEscapeKeyDown?: ((e: KeyboardEvent) => void) | undefined;

  /**
   * A callback fired when the backdrop, if specified, is clicked.
   *
   * @type {((e: React.SyntheticEvent) => void) | undefined}
   */
  onBackdropClick?: ((e: React.SyntheticEvent) => void) | undefined;

  /**
   * Close the modal when escape key is pressed
   */
  keyboard?: boolean | undefined;

  /**
   * When `true` The modal will automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes. This also
   * works correctly with any Modal children that have the `autoFocus` prop.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  autoFocus?: boolean | undefined;

  /**
   * When `true` The modal will prevent focus from leaving the Modal while open.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  enforceFocus?: boolean | undefined;

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus?: boolean | undefined;

  /**
   * Options passed to focus function when `restoreFocus` is set to `true`
   *
   * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
   */
  restoreFocusOptions?:
    | {
        preventScroll: boolean;
      }
    | undefined;
}

export interface OverlayArrowProps extends Record<string, any> {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
}
export interface OverlayMetadata {
  show: boolean;
  placement: Placement | undefined;
  popper: UsePopperState | null;
  arrowProps: Partial<OverlayArrowProps>;
}

export interface OverlayInjectedProps extends Record<string, any> {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
  'aria-labelledby'?: string;
}
export interface BaseOverlayProps extends TransitionCallbacks {
  /**
   * Enables the Popper.js `flip` modifier, allowing the Overlay to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip?: boolean | undefined;

  /** Specify where the overlay element is positioned in relation to the target element */
  placement?: Placement | undefined;

  /**
   * Control offset of the overlay to the reference element.
   * A convenience shortcut to setting `popperConfig.modfiers.offset`
   */
  offset?: Offset | undefined;

  /**
   * Control how much space there is between the edge of the boundary element and overlay.
   * A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
   */
  containerPadding?: number | undefined;

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig?: Omit<UsePopperOptions, 'placement'> | undefined;

  /**
   * A DOM Element, [Virtual Element](https://popper.js.org/docs/v2/virtual-elements/), Ref to an element, or
   * function that returns either. The `target` element is where the overlay is positioned relative to.
   */
  container?: DOMContainer | undefined;

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `target` element is where
   * the overlay is positioned relative to.
   */
  target: DOMContainer<HTMLElement | VirtualElement>;

  /**
   * Set the visibility of the Overlay
   */
  show?: boolean | undefined;

  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   *
   * @type {((e: Event) => void) | undefined}
   */
  onHide?: ((e: Event) => void) | undefined;

  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose?: boolean | undefined;

  /**
   * Specify disabled for disable RootCloseWrapper
   */
  rootCloseDisabled?: boolean | undefined;
}

export interface BsDropdownProps extends BaseDropdownProps {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'dropdown'
   */
  bsPrefix?: string | undefined;

  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop?: DropDirection | undefined;

  /**
   * Aligns the dropdown menu to the specified side of the Dropdown toggle. You can
   * also align the menu responsively for breakpoints starting at `sm` and up.
   * The alignment direction will affect the specified breakpoint or larger.
   *
   * *Note: Using responsive alignment will disable Popper usage for positioning.*
   */
  align?: AlignType | undefined;

  /**
   * Controls the focus behavior for when the Dropdown is opened. Set to
   * `true` to always focus the first menu item, `keyboard` to focus only when
   * navigating via the keyboard, or `false` to disable completely
   *
   * The Default behavior is `false` **unless** the Menu has a `role="menu"`
   * where it will default to `keyboard` to match the recommended
   * [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
   */
  focusFirstItemOnShow?: boolean | 'keyboard' | undefined;

  /**
   * Controls the auto close behaviour of the dropdown when clicking outside of
   * the button or the list.
   */
  autoClose?: boolean | 'outside' | 'inside' | undefined;

  /**
   * @private
   */
  navbar?: boolean | undefined;
}
