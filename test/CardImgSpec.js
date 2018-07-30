import React from 'react';
import { mount } from 'enzyme';

import CardImg from '../src/CardImg';

describe('<CardImg>', () => {
  it('should output an img', () => {
    mount(<CardImg src="#" />).assertSingle('img');
  });

  it('should pass down src to img', () => {
    const img = mount(<CardImg src="http://fakeurl.com/pic.jpg" />).find('img');
    expect(img.prop('src')).to.equal('http://fakeurl.com/pic.jpg');
  });

  it('accepts as prop', () => {
    mount(<CardImg as="figure">img</CardImg>).assertSingle('figure.card-img');
  });

  describe('variants', () => {
    it('null', () => {
      mount(<CardImg />).assertSingle('.card-img');
    });

    it('top', () => {
      mount(<CardImg variant="top" />).assertSingle('.card-img-top');
    });

    it('bottom', () => {
      mount(<CardImg variant="bottom" />).assertSingle('.card-img-bottom');
    });
  });
});
