import { mount } from 'enzyme';

import Carousel from '../src/Carousel';

describe('<Carousel.Caption>', () => {
  it('uses "div" by default', () => {
    mount(
      <Carousel.Caption className="custom-class">
        <strong>Children</strong>
      </Carousel.Caption>,
    ).assertSingle('div.carousel-caption.custom-class strong');
  });

  it('should allow custom elements instead of "div"', () => {
    mount(<Carousel.Caption as="section" />).assertSingle(
      'section.carousel-caption',
    );
  });
});
