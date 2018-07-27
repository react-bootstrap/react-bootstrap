import React from 'react';
import { mount } from 'enzyme';

import DropdownMenu from '../src/DropdownMenu';
import DropdownItem from '../src/DropdownItem';

describe('<Dropdown.Menu>', () => {
  const simpleMenu = (
    <DropdownMenu>
      <DropdownItem eventKey="1">Item 1</DropdownItem>
      <DropdownItem eventKey="2">Item 2</DropdownItem>
      <DropdownItem eventKey="3">Item 3</DropdownItem>
      <DropdownItem eventKey="4">Item 4</DropdownItem>
    </DropdownMenu>
  );

  it('renders div with dropdown-menu class', () => {
    mount(simpleMenu).assertSingle('div.dropdown-menu');
  });

  it('Should pass props to dropdown', () => {
    mount(
      <DropdownMenu className="new-fancy-class">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </DropdownMenu>,
    ).assertSingle('div.new-fancy-class');
  });

  it('applies alignRight', () => {
    mount(
      <DropdownMenu alignRight>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>,
    ).assertSingle('.dropdown-menu-right');
  });
});
