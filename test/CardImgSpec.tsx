import { render } from '@testing-library/react';
import { expect } from 'chai';

import CardImg from '../src/CardImg';

describe('<CardImg>', () => {
  it('should output an img', () => {
    const { getByRole } = render(<CardImg src="#" />);

    getByRole('img').should.exist;
  });

  it('should pass down src to img', () => {
    const url = 'http://fakeurl.com/pic.jpg';
    const { getByRole } = render(<CardImg src={url} />);

    expect(getByRole('img').getAttribute('src')).to.be.equal(url);
  });

  it('Should have img as default component', () => {
    const { getByRole } = render(<CardImg />);

    getByRole('img').should.exist;
  });

  it('accepts as prop', () => {
    const { getByRole } = render(<CardImg as="figure">img</CardImg>);

    const card = getByRole('figure');
    card.tagName.toLowerCase().should.equal('figure');
    card.classList.contains('card-img').should.equal(true);
  });

  describe('variants', () => {
    it('null', () => {
      const { getByRole } = render(<CardImg />);

      getByRole('img').classList.contains('card-img').should.be.true;
    });

    it('top', () => {
      const { getByRole } = render(<CardImg variant="top" />);

      getByRole('img').classList.contains('card-img-top').should.be.true;
    });

    it('bottom', () => {
      const { getByRole } = render(<CardImg variant="bottom" />);

      getByRole('img').classList.contains('card-img-bottom').should.be.true;
    });
  });
});
