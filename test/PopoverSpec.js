import React from 'react';
import { mount } from 'enzyme';

import Popover from '../src/Popover';

describe('Popover', () => {
  it('Should output a popover title and content', () => {
    let wrapper = mount(
      <Popover id="test-popover" title="Popover title">
        <strong>Popover Content</strong>
      </Popover>
    );

    assert.ok(wrapper.find('.popover-title').getDOMNode());
    assert.ok(wrapper.find('.popover-content').getDOMNode());
    assert.ok(wrapper.find('strong').getDOMNode());
  });
});
