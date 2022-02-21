import { render } from '@testing-library/react';
import Figure from '../src/Figure';

describe('<Figure.Caption>', () => {
  it('uses "figcaption" by default', () => {
    const { getByTestId } = render(
      <Figure>
        <Figure.Caption data-testid="test-figure">Caption</Figure.Caption>
      </Figure>,
    );
    getByTestId('test-figure').tagName.toLowerCase().should.equal('figcaption');
  });

  it('has "figure-caption" class', () => {
    const { getByTestId } = render(
      <Figure.Caption data-testid="test-figure">Caption</Figure.Caption>,
    );
    getByTestId('test-figure').classList.contains('figure-caption').should.be
      .true;
  });

  it('Should merge additional classes passed in', () => {
    const { getByTestId } = render(
      <Figure.Caption className="bob" data-testid="test-figure">
        Caption
      </Figure.Caption>,
    );
    getByTestId('test-figure').classList.contains('bob').should.be.true;
    getByTestId('test-figure').classList.contains('figure-caption').should.be
      .true;
  });

  it('allows custom elements instead of "figcaption"', () => {
    const { getByTestId } = render(
      <Figure.Caption as="section" data-testid="test-figure">
        Caption
      </Figure.Caption>,
    );
    getByTestId('test-figure').tagName.toLowerCase().should.equal('section');
  });
});
