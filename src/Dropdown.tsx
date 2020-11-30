import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import BaseDropdown from 'react-overlays/Dropdown';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import DropdownToggle from './DropdownToggle';
import SelectableContext from './SelectableContext';
import { useBootstrapPrefix } from './ThemeProvider';
import createWithBsPrefix from './createWithBsPrefix';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
  SelectCallback,
} from './helpers';

const DropdownHeader = createWithBsPrefix('dropdown-header', {
  defaultProps: { role: 'heading' },
});
const DropdownDivider = createWithBsPrefix('dropdown-divider', {
  defaultProps: { role: 'separator' },
});
const DropdownItemText = createWithBsPrefix('dropdown-item-text', {
  Component: 'span',
});

export interface DropdownProps extends BsPrefixPropsWithChildren {
  drop?: 'up' | 'left' | 'right' | 'down';
  alignRight?: boolean;
  show?: boolean;
  flip?: boolean;
  onToggle?: (
    isOpen: boolean,
    event: React.SyntheticEvent<Dropdown>,
    metadata: { source: 'select' | 'click' | 'rootClose' | 'keydown' },
  ) => void;
  focusFirstItemOnShow?: boolean | 'keyboard';
  onSelect?: SelectCallback;
  navbar?: boolean;
  escDisabled?: boolean;
}

type Dropdown = BsPrefixRefForwardingComponent<'div', DropdownProps> & {
  Toggle: typeof DropdownToggle;
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
  ItemText: typeof DropdownItemText;
  Divider: typeof DropdownDivider;
  Header: typeof DropdownHeader;
};

const propTypes = {
  /** @default 'dropdown' */
  bsPrefix: PropTypes.string,
  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: PropTypes.oneOf(['up', 'left', 'right', 'down']),

  as: PropTypes.elementType,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  alignRight: PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: PropTypes.bool,

  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   *
   */
  flip: PropTypes.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   *   metadata: {
   *     source: 'select' | 'click' | 'rootClose' | 'keydown'
   *   }
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: PropTypes.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * Controls the focus behavior for when the Dropdown is opened. Set to
   * `true` to always focus the first menu item, `keyboard` to focus only when
   * navigating via the keyboard, or `false` to disable completely
   *
   * The Default behavior is `false` **unless** the Menu has a `role="menu"`
   * where it will default to `keyboard` to match the recommended [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
   */
  focusFirstItemOnShow: PropTypes.oneOf([false, true, 'keyboard']),

  /** @private */
  navbar: PropTypes.bool,

  /**
   * Disables the behavior of pressing the key 'Escape' when the Dropdown is opened.
   *
   * The default value is `false`.
   */
  escDisabled: PropTypes.bool,
};

const defaultProps = {
  navbar: false,
  escDisabled: false,
};

const Dropdown: Dropdown = (React.forwardRef((pProps: DropdownProps, ref) => {
  const {
    bsPrefix,
    drop,
    show,
    className,
    alignRight,
    onSelect,
    onToggle,
    focusFirstItemOnShow,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    navbar: _4,
    escDisabled,
    ...props
  } = useUncontrolled(pProps, { show: 'onToggle' });

  const onSelectCtx = useContext(SelectableContext);
  const prefix = useBootstrapPrefix(bsPrefix, 'dropdown');

  const handleToggle = useEventCallback(
    (nextShow, event, source = event.type) => {
      const isEsc = event.type === 'keydown' && event.key === 'Escape';
      if (
        (event.type === 'click' && event.currentTarget === document) ||
        (isEsc && event.currentTarget)
      ) {
        source = 'rootClose';
      }
      if (!nextShow && isEsc && escDisabled) {
        return;
      }
      if (onToggle) {
        onToggle(nextShow, event, { source });
      }
    },
  );

  const handleSelect = useEventCallback((key, event) => {
    if (onSelectCtx) onSelectCtx(key, event);
    if (onSelect) onSelect(key, event);
    handleToggle(false, event, 'select');
  });

  return (
    <SelectableContext.Provider value={handleSelect}>
      <BaseDropdown
        drop={drop}
        show={show}
        alignEnd={alignRight}
        onToggle={handleToggle}
        focusFirstItemOnShow={focusFirstItemOnShow}
        itemSelector={`.${prefix}-item:not(.disabled):not(:disabled)`}
      >
        {({ props: dropdownProps }) => (
          <Component
            {...props}
            {...dropdownProps}
            ref={ref}
            className={classNames(
              className,
              show && 'show',
              (!drop || drop === 'down') && prefix,
              drop === 'up' && 'dropup',
              drop === 'right' && 'dropright',
              drop === 'left' && 'dropleft',
            )}
          />
        )}
      </BaseDropdown>
    </SelectableContext.Provider>
  );
}) as unknown) as Dropdown;

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;
Dropdown.Item = DropdownItem;
Dropdown.ItemText = DropdownItemText;
Dropdown.Menu = DropdownMenu;
Dropdown.Toggle = DropdownToggle;

export default Dropdown;
