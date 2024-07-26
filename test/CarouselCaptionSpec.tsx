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
    expect(captionWrapper.tagName).toEqual('DIV');
    expect(captionWrapper.classList).toContain('carousel-caption');
    expect(captionWrapper.classList).toContain('custom-class');

    const content = screen.getByText('Children');
    expect(content.tagName).toEqual('STRONG');
  });

  it('should allow custom elements instead of "div"', () => {
    render(<Carousel.Caption as="section" data-testid="test" />);

    const caption = screen.getByTestId('test');
    expect(caption.tagName).toEqual('SECTION');
    expect(caption.classList).toContain('carousel-caption');
  });
});
