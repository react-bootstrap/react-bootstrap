import { render } from '@testing-library/react';

import ProgressBar from '../src/ProgressBar';
import { shouldWarn } from './helpers';

describe('<ProgressBar>', () => {
  it('Should output a progress bar with wrapper', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={0} max={10} now={0} />,
    );
    const progressElem = getByTestId('test');
    const innerProgressElem = progressElem.firstElementChild!;

    progressElem.classList.contains('progress').should.be.true;
    innerProgressElem.classList.contains('progress-bar').should.be.true;
    innerProgressElem.getAttribute('role')!.should.equal('progressbar');
  });

  ['success', 'warning', 'info', 'danger'].forEach((variant) => {
    it(`Should have the variant="${variant}" class`, () => {
      const { getByTestId } = render(
        <ProgressBar
          data-testid="test"
          min={0}
          max={10}
          now={0}
          variant={variant}
        />,
      );
      const innerProgressElem = getByTestId('test').firstElementChild!;
      innerProgressElem.classList.contains(`bg-${variant}`);
    });
  });

  it('Should default to min:0, max:100', () => {
    const { getByTestId } = render(<ProgressBar data-testid="test" now={5} />);
    const innerProgressElem = getByTestId('test').firstElementChild!;
    innerProgressElem.getAttribute('aria-valuemin')!.should.equal('0');
    innerProgressElem.getAttribute('aria-valuemax')!.should.equal('100');
  });

  it('Should have 0% computed width', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={0} max={10} now={0} />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;
    (innerProgressElem as HTMLElement).style.width.should.equal('0%');
  });

  it('Should have 10% computed width', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={0} max={10} now={1} />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;
    (innerProgressElem as HTMLElement).style.width.should.equal('10%');
  });

  it('Should have 100% computed width', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={0} max={10} now={10} />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;
    (innerProgressElem as HTMLElement).style.width.should.equal('100%');
  });

  it('Should have 50% computed width with non-zero min', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={1} max={11} now={6} />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;
    (innerProgressElem as HTMLElement).style.width.should.equal('50%');
  });

  it('Should not have label', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={0} max={10} now={5} />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;
    innerProgressElem.textContent!.should.equal('');
  });

  it('Should have label', () => {
    const { getByTestId } = render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        variant="success"
        label="progress bar label"
      />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;
    innerProgressElem.textContent!.should.equal('progress bar label');
  });

  it('Should have screen reader only label', () => {
    const { getByTestId } = render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        visuallyHidden
        variant="success"
        label="progress bar label"
      />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;

    innerProgressElem.classList.contains('visually-hidden');
    innerProgressElem.textContent!.should.equal('progress bar label');
  });

  it('Should have a label that is a React component', () => {
    const customLabel = <strong className="special-label">My label</strong>;

    const { getByTestId } = render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        label={customLabel}
      />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;
    innerProgressElem.firstElementChild!.classList.contains('special-label')
      .should.be.true;
  });

  it('Should have screen reader only label that wraps a React component', () => {
    const customLabel = <strong className="special-label">My label</strong>;

    const { getByTestId } = render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        label={customLabel}
        visuallyHidden
      />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;
    innerProgressElem.firstElementChild!.classList.contains('visually-hidden')
      .should.be.true;
    innerProgressElem.firstElementChild!.firstElementChild!.classList.contains(
      'special-label',
    ).should.be.true;
  });

  it('Should show striped bar', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={1} max={11} now={6} striped />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;
    innerProgressElem.classList.contains('progress-bar-striped');
  });

  it('Should show animated striped bar', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={1} max={11} now={6} animated />,
    );
    const innerProgressElem = getByTestId('test').firstElementChild!;
    innerProgressElem.classList.contains('progress-bar-striped');
    innerProgressElem.classList.contains('progress-bar-animated');
  });

  it('Should show stacked bars', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test">
        <ProgressBar key={1} now={50} />
        <ProgressBar key={2} now={30} />
      </ProgressBar>,
    );
    const innerProgressElem = getByTestId('test');

    const bar1 = innerProgressElem.firstElementChild!;
    const bar2 = innerProgressElem.lastElementChild!;

    bar1.classList.contains('progress-bar').should.be.true;
    (bar1 as HTMLElement).style.width.should.equal('50%');

    bar2.classList.contains('progress-bar').should.be.true;
    (bar2 as HTMLElement).style.width.should.equal('30%');
  });

  it('Should render animated and striped children in stacked bar too', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test">
        <ProgressBar animated key={1} now={50} />
        <ProgressBar striped key={2} now={30} />
      </ProgressBar>,
    );
    const innerProgressElem = getByTestId('test');

    const bar1 = innerProgressElem.firstElementChild!;
    const bar2 = innerProgressElem.lastElementChild!;

    bar1.classList.contains('progress-bar').should.be.true;
    bar1.classList.contains('progress-bar-striped').should.be.true;
    bar1.classList.contains('progress-bar-animated').should.be.true;

    bar2.classList.contains('progress-bar').should.be.true;
    bar2.classList.contains('progress-bar-striped').should.be.true;
    bar2.classList.contains('progress-bar-animated').should.be.false;
  });

  it('Should forward className and style to nested bars', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test">
        <ProgressBar now={1} className="bar1" />
        <ProgressBar now={2} style={{ minWidth: 10 }} />
      </ProgressBar>,
    );
    const innerProgressElem = getByTestId('test');

    const bar1 = innerProgressElem.firstElementChild!;
    const bar2 = innerProgressElem.lastElementChild!;

    bar1.classList.contains('progress-bar').should.be.true;
    (bar2 as HTMLElement).style.minWidth.should.equal('10px');
  });

  it('allows only ProgressBar in children', () => {
    shouldWarn('Failed prop');

    function NotProgressBar() {
      return null;
    }
    function NotProgressBar2() {
      return <div>asdf</div>;
    }

    render(
      <ProgressBar>
        <ProgressBar key={1} />
        <NotProgressBar />
        foo
        <NotProgressBar2 />
        <ProgressBar key={2} />
      </ProgressBar>,
    );
  });
});
