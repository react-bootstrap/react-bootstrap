import * as React from 'react';

declare namespace DropdownItem {
    export interface DropdownItemProps {
        /** @default 'dropdown' */
        bsPrefix?: string;

        /**
         * Highlight the menu item as active.
         */
        active?: boolean;

        /**
         * Disable the menu item, making it unselectable.
         */
        disabled?: boolean;

        /**
         * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
         */
        eventKey?: any;

        /**
         * HTML `href` attribute corresponding to `a.href`.
         */
        href?: string;

        /**
         * Callback fired when the menu item is clicked.
         */
        onClick?: (event: React.SyntheticEvent) => void;

        /**
         * Callback fired when the menu item is selected.
         *
         * ```js
         * (eventKey: any, event: Object) => any
         * ```
         */
        onSelect?: (eventKey: any, event: React.SyntheticEvent) => any;

        as?: any; // tbu
    }
}
declare class DropdownItem extends React.Component<DropdownItem.DropdownItemProps> { }
export = DropdownItem;
