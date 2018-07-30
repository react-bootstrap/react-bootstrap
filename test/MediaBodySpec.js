import React from 'react';
import { mount } from 'enzyme';

import Media from '../src/Media';

describe('<Media.Body>', () => {
  it('uses "div" by default', () => {
    mount(
      <Media.Body className="custom-class">
        <strong>Content</strong>
      </Media.Body>,
    ).assertSingle('div.media-body.custom-class strong');
  });

  it('should allow custom elements instead of "div"', () => {
    mount(<Media.Body as="section" />).assertSingle('section.media-body');
  });
});
