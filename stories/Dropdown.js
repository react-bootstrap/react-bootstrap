import React from 'react';
import { storiesOf } from '@storybook/react';

import DropdownButton from '../src/DropdownButton';
import DropdownItem from '../src/DropdownItem';

// Needs a Popper overlay
storiesOf('Dropdown ', module).add('dropdown button', () => (
  <DropdownButton title="dropdown" id="dropdown-basic">
    <DropdownItem eventKey="1">Action</DropdownItem>
    <DropdownItem eventKey="2">Another action</DropdownItem>
    <DropdownItem eventKey="3" active>
      Active Item
    </DropdownItem>
    <DropdownItem divider />
    <DropdownItem eventKey="4">Separated link</DropdownItem>
  </DropdownButton>
));
