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
    expect(card.tagName).toEqual('FIGURE');
    expect(card.classList).toContain('card-img');
  });

  describe('variants', () => {
    it('null', () => {
      render(<CardImg />);

      expect(screen.getByRole('img').classList).toContain('card-img');
    });

    it('top', () => {
      render(<CardImg variant="top" />);

      expect(screen.getByRole('img').classList).toContain('card-img-top');
    });

    it('bottom', () => {
      render(<CardImg variant="bottom" />);

      expect(screen.getByRole('img').classList).toContain('card-img-bottom');
    });
  });
});
