import React from 'react';
import { mount } from 'enzyme';

import ThemeProvider from '../src/ThemeProvider';
import Overlay from '../src/Overlay';
import Popover from '../src/Popover';

describe('usePopperMarginModifiers', () => {
  it('Should set arrow margin to 0px with prefixed popover and dropdown-menu', () => {
    const wrapper = mount(
      <ThemeProvider prefixes={{ popover: 'prefixed' }}>
        <Overlay show>
          <Popover id="test-popover" />
        </Overlay>
      </ThemeProvider>,
    );

    const margin = wrapper.find('.arrow').getDOMNode().style.margin;
    assert.equal(margin, '0px');
  });
});
