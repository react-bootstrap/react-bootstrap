import { render } from '@testing-library/react';

import Carousel from '../src/Carousel';

describe('<Carousel.Caption>', () => {
  it('uses "div" by default', () => {
    const { getByTestId, getByText } = render(
      <Carousel.Caption className="custom-class" data-testid="test">
        <strong>Children</strong>
      </Carousel.Caption>,
    );

    const captionWrapper = getByTestId('test');
    captionWrapper.tagName.toLowerCase().should.equal('div');
    captionWrapper.classList.contains('carousel-caption').should.be.true;
    captionWrapper.classList.contains('custom-class').should.be.true;

    const content = getByText('Children');
    content.tagName.toLowerCase().should.equal('strong');
  });

  it('should allow custom elements instead of "div"', () => {
    const { getByTestId } = render(
      <Carousel.Caption as="section" data-testid="test" />,
    );

    const caption = getByTestId('test');
    caption.tagName.toLowerCase().should.equal('section');
    caption.classList.contains('carousel-caption').should.be.true;
  });
});
