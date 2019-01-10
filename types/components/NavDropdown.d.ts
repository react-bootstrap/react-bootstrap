import * as React from 'react';
import { Omit } from 'react-bootstrap';
import { DropdownBaseProps } from './Dropdown';
import Dropdown = require('./Dropdown');

declare namespace NavDropdown {
    export interface NavDropdownBaseProps extends DropdownBaseProps {
        active?: boolean;
        noCaret?: boolean;
        eventKey?: any;
        title: React.ReactNode;
    }

    export type NavDropdownProps = NavDropdownBaseProps & Omit<React.HTMLProps<NavDropdown>, 'title'>;
}
declare class NavDropdown extends React.Component<NavDropdown.NavDropdownProps> {
    public static Item: typeof Dropdown.Item;
}
export = NavDropdown;
