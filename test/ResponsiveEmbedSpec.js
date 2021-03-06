import { mount } from 'enzyme';

import ResponsiveEmbed from '../src/ResponsiveEmbed';

describe('ResponsiveEmbed', () => {
  it('should contain `embed-responsive` class', () => {
    mount(
      <ResponsiveEmbed aspectRatio="4by3" className="custom-class">
        <div />
      </ResponsiveEmbed>,
    ).assertSingle(
      'div.custom-class.embed-responsive.embed-responsive-4by3 div.embed-responsive-item',
    );
  });
});
