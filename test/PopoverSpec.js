import React from 'react';
import { mount } from 'enzyme';

import Popover from '../src/Popover';

describe('Popover', () => {
  it('Should output a popover title and content', () => {
    mount(
      <Popover id="test-popover" title="Popover title">
        <strong>Popover Content</strong>
      </Popover>,
    ).assertSingle(
      '.popover[x-placement="right"][role="tooltip"].bs-popover-right strong',
    );
  });
});
