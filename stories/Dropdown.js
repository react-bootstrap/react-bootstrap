import React from 'react';

import { storiesOf } from '@storybook/react';


import DropdownButton from '../src/DropdownButton';
import MenuItem from '../src/MenuItem';

// Needs a Popper overlay
storiesOf('Dropdown ', module)
  .add('dropdown button', () => (
    <DropdownButton title="dropdown" id="dropdown-basic">
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3" active>Active Item</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
  ));
