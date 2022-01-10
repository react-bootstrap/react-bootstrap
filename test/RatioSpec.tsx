import { render } from '@testing-library/react';

import Ratio from '../src/Ratio';

describe('Ratio', () => {
  it('should contain `ratio-1x1` and custom class', () => {
    const { getByTestId } = render(
      <Ratio data-testid="test" aspectRatio="1x1" className="custom-class">
        <div />
      </Ratio>,
    );
    const ratioElem = getByTestId('test');

    ratioElem.classList.contains('custom-class').should.be.true;
    ratioElem.classList.contains('ratio').should.be.true;
    ratioElem.classList.contains('ratio-1x1').should.be.true;
  });

  it('should support custom ratios using percent for aspectRatio', () => {
    const { getByTestId } = render(
      <Ratio data-testid="test" aspectRatio={50}>
        <div />
      </Ratio>,
    );
    const ratioElem = getByTestId('test');
    const styleAttr = ratioElem.getAttribute('style')!;
    styleAttr.should.match(/--bs-aspect-ratio:[ ]*50%;/);
  });

  it('should support custom ratios using fraction for aspectRatio', () => {
    const { getByTestId } = render(
      <Ratio data-testid="test" aspectRatio={1 / 2}>
        <div />
      </Ratio>,
    );
    const ratioElem = getByTestId('test');
    const styleAttr = ratioElem.getAttribute('style')!;
    styleAttr.should.match(/--bs-aspect-ratio:[ ]*50%;/);
  });

  it('should support use 100% as custom ratio if aspectRatio is less than 0', () => {
    const { getByTestId } = render(
      <Ratio data-testid="test" aspectRatio={-1}>
        <div />
      </Ratio>,
    );
    const ratioElem = getByTestId('test');
    const styleAttr = ratioElem.getAttribute('style')!;
    styleAttr.should.match(/--bs-aspect-ratio:[ ]*100%;/);
  });

  it('should support use 100% as custom ratio if aspectRatio is greater than 100', () => {
    const { getByTestId } = render(
      <Ratio data-testid="test" aspectRatio={200}>
        <div />
      </Ratio>,
    );
    const ratioElem = getByTestId('test');
    const styleAttr = ratioElem.getAttribute('style')!;
    styleAttr.should.match(/--bs-aspect-ratio:[ ]*100%;/);
  });
});
