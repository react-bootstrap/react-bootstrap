import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardImg from '../src/CardImg';

describe('<CardImg>', () => {
  it('should output an img', () => {
    render(<CardImg src="#" />);

    expect(screen.getByRole('img')).toBeTruthy();
  });

  it('should pass down src to img', () => {
    const url = 'http://fakeurl.com/pic.jpg';
    render(<CardImg src={url} />);

    expect(screen.getByRole('img').getAttribute('src')).to.be.equal(url);
  });

  it('Should have img as default component', () => {
    render(<CardImg />);

    expect(screen.getByRole('img')).toBeTruthy();
  });

  it('accepts as prop', () => {
    render(<CardImg as="figure">img</CardImg>);

    const card = screen.getByRole('figure');
    expect(card.tagName.toLowerCase()).toEqual('figure');
    expect(card.classList.contains('card-img')).toEqual(true);
  });

  describe('variants', () => {
    it('null', () => {
      render(<CardImg />);

      expect(screen.getByRole('img').classList.contains('card-img')).toEqual(
        true,
      );
    });

    it('top', () => {
      render(<CardImg variant="top" />);

      expect(
        screen.getByRole('img').classList.contains('card-img-top'),
      ).toEqual(true);
    });

    it('bottom', () => {
      render(<CardImg variant="bottom" />);

      expect(
        screen.getByRole('img').classList.contains('card-img-bottom'),
      ).toEqual(true);
    });
  });
});
