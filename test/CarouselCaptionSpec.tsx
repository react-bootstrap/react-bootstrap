import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Carousel from '../src/Carousel';

describe('<Carousel.Caption>', () => {
  it('uses "div" by default', () => {
    render(
      <Carousel.Caption className="custom-class" data-testid="test">
        <strong>Children</strong>
      </Carousel.Caption>,
    );

    const captionWrapper = screen.getByTestId('test');
    expect(captionWrapper.tagName.toLowerCase()).toEqual('div');
    expect(captionWrapper.classList.contains('carousel-caption')).toEqual(true);
    expect(captionWrapper.classList.contains('custom-class')).toEqual(true);

    const content = screen.getByText('Children');
    expect(content.tagName.toLowerCase()).toEqual('strong');
  });

  it('should allow custom elements instead of "div"', () => {
    render(<Carousel.Caption as="section" data-testid="test" />);

    const caption = screen.getByTestId('test');
    expect(caption.tagName.toLowerCase()).toEqual('section');
    expect(caption.classList.contains('carousel-caption')).toEqual(true);
  });
});
