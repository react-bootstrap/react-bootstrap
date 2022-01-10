import { render } from '@testing-library/react';

import PageItem, { First } from '../src/PageItem';

describe('<PageItem>', () => {
  describe('<First>', () => {
    it('should have expected default innerText', () => {
      const { getByTestId } = render(<First data-testid="test" />);
      const firstElem = getByTestId('test');

      firstElem.classList.contains('page-link').should.be.true;

      firstElem.firstElementChild!.tagName.toLowerCase().should.equal('span');
      firstElem
        .firstElementChild!.getAttribute('aria-hidden')!
        .should.equal('true');
      firstElem.firstElementChild!.textContent!.should.equal('«');
    });
    it('should have expected custom innerText', () => {
      const innerHTML = 'custom';
      const { getByTestId } = render(
        <First data-testid="test">{innerHTML}</First>,
      );
      const firstElem = getByTestId('test');

      firstElem.firstElementChild!.textContent!.should.equal(innerHTML);
    });

    it('should render a nested span if active is true', () => {
      const { container } = render(<PageItem active />);
      const pageItemElem = container.firstElementChild!;
      const pageItemInnerElem = pageItemElem.firstElementChild!;

      pageItemElem.classList.contains('active').should.be.true;
      pageItemInnerElem.classList.contains('page-link').should.be.true;

      // check if nested span is rendered
      pageItemInnerElem
        .firstElementChild!.tagName.toLowerCase()
        .should.equal('span');
    });

    it('should render a span if disabled is true', () => {
      const { container } = render(<PageItem disabled />);
      const pageItemElem = container.firstElementChild!;
      const pageItemInnerElem = pageItemElem.firstElementChild!;

      pageItemElem.classList.contains('disabled').should.be.true;

      pageItemInnerElem.classList.contains('page-link').should.be.true;
      pageItemInnerElem.getAttribute('disabled')!.should.exist;
    });
  });
});
