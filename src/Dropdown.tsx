import clsx from 'clsx';
import * as React from 'react';
import { useContext, useMemo } from 'react';
import BaseDropdown, { ToggleMetadata } from '@restart/ui/Dropdown';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import DropdownContext from './DropdownContext.js';
import DropdownDivider from './DropdownDivider.js';
import DropdownHeader from './DropdownHeader.js';
import DropdownItem from './DropdownItem.js';
import DropdownItemText from './DropdownItemText.js';
import DropdownMenu, { getDropdownMenuPlacement } from './DropdownMenu.js';
import DropdownToggle from './DropdownToggle.js';
import InputGroupContext from './InputGroupContext.js';
import { useBootstrapPrefix, useIsRTL } from './ThemeProvider.js';
import type { BsDropdownProps } from './types.js';

export interface DropdownProps
  extends
    BsDropdownProps,
    Omit<
      React.HTMLAttributes<HTMLElement>,
      'onSelect' | 'children' | 'onToggle'
    > {}

const Dropdown: DynamicRefForwardingComponent<'div', DropdownProps> =
  React.forwardRef<HTMLElement, DropdownProps>((pProps, ref) => {
    const {
      bsPrefix,
      drop = 'down',
      show,
      className,
      align = 'start',
      onSelect,
      onToggle,
      focusFirstItemOnShow,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      navbar: _4,
      autoClose = true,
      ...props
    } = useUncontrolled(pProps, { show: 'onToggle' });

    const isInputGroup = useContext(InputGroupContext);
    const prefix = useBootstrapPrefix(bsPrefix, 'dropdown');
    const isRTL = useIsRTL();

    const isClosingPermitted = (source: string): boolean => {
      // autoClose=false only permits close on button click
      if (autoClose === false) return source === 'click';

      // autoClose=inside doesn't permit close on rootClose
      if (autoClose === 'inside') return source !== 'rootClose';

      // autoClose=outside doesn't permit close on select
      if (autoClose === 'outside') return source !== 'select';

      return true;
    };

    const handleToggle = useEventCallback(
      (nextShow: boolean, meta: ToggleMetadata) => {
        /** Checking if target of event is ToggleButton,
         * if it is then nullify mousedown event
         */
        const isToggleButton = (
          meta.originalEvent?.target as HTMLElement
        )?.classList.contains('dropdown-toggle');

        if (isToggleButton && meta.source === 'mousedown') {
          return;
        }

        if (
          meta.originalEvent!.currentTarget === document &&
          (meta.source !== 'keydown' ||
            (meta.originalEvent as any).key === 'Escape')
        )
          meta.source = 'rootClose';

        if (isClosingPermitted(meta.source!)) onToggle?.(nextShow, meta);
      },
    );

    const alignEnd = align === 'end';
    const placement = getDropdownMenuPlacement(alignEnd, drop, isRTL);

    const contextValue = useMemo(
      () => ({
        align,
        drop,
        isRTL,
      }),
      [align, drop, isRTL],
    );

    const directionClasses = {
      down: prefix,
      'down-centered': `${prefix}-center`,
      up: 'dropup',
      'up-centered': 'dropup-center dropup',
      end: 'dropend',
      start: 'dropstart',
    };

    return (
      <DropdownContext.Provider value={contextValue}>
        <BaseDropdown
          placement={placement}
          show={show}
          onSelect={onSelect}
          onToggle={handleToggle}
          focusFirstItemOnShow={focusFirstItemOnShow}
          itemSelector={`.${prefix}-item:not(.disabled):not(:disabled)`}
        >
          {isInputGroup ? (
            props.children
          ) : (
            <Component
              {...props}
              ref={ref}
              className={clsx(
                className,
                show && 'show',
                directionClasses[drop!],
              )}
            />
          )}
        </BaseDropdown>
      </DropdownContext.Provider>
    );
  });

Dropdown.displayName = 'Dropdown';

export default Object.assign(Dropdown, {
  Toggle: DropdownToggle,
  Menu: DropdownMenu,
  Item: DropdownItem,
  ItemText: DropdownItemText,
  Divider: DropdownDivider,
  Header: DropdownHeader,
});
