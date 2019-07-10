import React from 'react';
import { mount } from 'enzyme';

import Popover from '../src/Popover';

describe('Popover', () => {
  it('Should output a popover title and content', () => {
    mount(
      <Popover id="test-popover">
        <Popover.Title>Popover title</Popover.Title>
        <Popover.Content>
          <strong>Popover Content</strong>
        </Popover.Content>
      </Popover>,
    ).assertSingle(
      '.popover[x-placement="right"][role="tooltip"].bs-popover-right strong',
    );
  });
});
