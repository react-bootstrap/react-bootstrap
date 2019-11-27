import React from 'react';
import { mount } from 'enzyme';

import Media from '../src/Media';

describe('Media', () => {
  it('uses "div" by default', () => {
    mount(
      <Media className="custom-class">
        <strong>Children</strong>
      </Media>,
    ).assertSingle('div.media.custom-class strong');
  });

  it('should allow custom elements instead of "div"', () => {
    mount(<Media as="section" />).assertSingle('section.media');
  });

  it('Should have div as default component', () => {
    mount(<Media />).assertSingle('div');
  });
});
