import { mount } from 'enzyme';

import Ratio from '../src/Ratio';

describe('Ratio', () => {
  it('should contain `ratio` class', () => {
    mount(
      <Ratio aspectRatio="1x1" className="custom-class">
        <div />
      </Ratio>,
    ).assertSingle('div.custom-class.ratio.ratio-1x1 div');
  });
});
