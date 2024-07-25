import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../src/ProgressBar';

describe('<ProgressBar>', () => {
  it('Should output a progress bar with wrapper', () => {
    render(<ProgressBar data-testid="test" min={0} max={10} now={0} />);

    const progressElem = screen.getByTestId('test');
    const innerProgressElem = progressElem.firstElementChild!;

    expect(progressElem.classList).toContain('progress');
    expect(innerProgressElem.classList).toContain('progress-bar');
    expect(innerProgressElem.getAttribute('role')).toEqual('progressbar');
  });

  ['success', 'warning', 'info', 'danger'].forEach((variant) => {
    it(`Should have the variant="${variant}" class`, () => {
      render(
        <ProgressBar
          data-testid="test"
          min={0}
          max={10}
          now={0}
          variant={variant}
        />,
      );
      const innerProgressElem = screen.getByTestId('test').firstElementChild!;
      expect(innerProgressElem.classList).toContain(`bg-${variant}`);
    });
  });

  it('Should default to min:0, max:100', () => {
    render(<ProgressBar data-testid="test" now={5} />);
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect(innerProgressElem.getAttribute('aria-valuemin')).toEqual('0');
    expect(innerProgressElem.getAttribute('aria-valuemax')).toEqual('100');
  });

  it('Should have 0% computed width', () => {
    render(<ProgressBar data-testid="test" min={0} max={10} now={0} />);
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect((innerProgressElem as HTMLElement).style.width).toEqual('0%');
  });

  it('Should have 10% computed width', () => {
    render(<ProgressBar data-testid="test" min={0} max={10} now={1} />);
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect((innerProgressElem as HTMLElement).style.width).toEqual('10%');
  });

  it('Should have 100% computed width', () => {
    render(<ProgressBar data-testid="test" min={0} max={10} now={10} />);
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect((innerProgressElem as HTMLElement).style.width).toEqual('100%');
  });

  it('Should have 50% computed width with non-zero min', () => {
    render(<ProgressBar data-testid="test" min={1} max={11} now={6} />);
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect((innerProgressElem as HTMLElement).style.width).toEqual('50%');
  });

  it('Should not have label', () => {
    render(<ProgressBar data-testid="test" min={0} max={10} now={5} />);
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect(innerProgressElem.textContent).toEqual('');
  });

  it('Should have label', () => {
    render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        variant="success"
        label="progress bar label"
      />,
    );
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect(innerProgressElem.textContent).toEqual('progress bar label');
  });

  it('Should have screen reader only label', () => {
    render(
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
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect(innerProgressElem.firstElementChild!.classList).toContain(
      'visually-hidden',
    );
    expect(innerProgressElem.textContent).toEqual('progress bar label');
  });

  it('Should have a label that is a React component', () => {
    const customLabel = <strong className="special-label">My label</strong>;

    render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        label={customLabel}
      />,
    );
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect(innerProgressElem.firstElementChild!.classList).toContain(
      'special-label',
    );
  });

  it('Should have screen reader only label that wraps a React component', () => {
    const customLabel = <strong className="special-label">My label</strong>;

    render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        label={customLabel}
        visuallyHidden
      />,
    );
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect(innerProgressElem.firstElementChild!.classList).toContain(
      'visually-hidden',
    );
    expect(
      innerProgressElem.firstElementChild!.firstElementChild!.classList,
    ).toContain('special-label');
  });

  it('Should show striped bar', () => {
    render(<ProgressBar data-testid="test" min={1} max={11} now={6} striped />);
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect(innerProgressElem.classList).toContain('progress-bar-striped');
  });

  it('Should show animated striped bar', () => {
    render(
      <ProgressBar data-testid="test" min={1} max={11} now={6} animated />,
    );
    const innerProgressElem = screen.getByTestId('test').firstElementChild!;
    expect(innerProgressElem.classList).toContain('progress-bar-striped');
    expect(innerProgressElem.classList).toContain('progress-bar-animated');
  });

  it('Should show stacked bars', () => {
    render(
      <ProgressBar data-testid="test">
        <ProgressBar key={1} now={50} />
        <ProgressBar key={2} now={30} />
      </ProgressBar>,
    );
    const innerProgressElem = screen.getByTestId('test');

    const bar1 = innerProgressElem.firstElementChild!;
    const bar2 = innerProgressElem.lastElementChild!;

    expect(bar1.classList).toContain('progress-bar');
    expect((bar1 as HTMLElement).style.width).toEqual('50%');

    expect(bar2.classList).toContain('progress-bar');
    expect((bar2 as HTMLElement).style.width).toEqual('30%');
  });

  it('Should render animated and striped children in stacked bar too', () => {
    render(
      <ProgressBar data-testid="test">
        <ProgressBar animated key={1} now={50} />
        <ProgressBar striped key={2} now={30} />
      </ProgressBar>,
    );
    const innerProgressElem = screen.getByTestId('test');

    const bar1 = innerProgressElem.firstElementChild!;
    const bar2 = innerProgressElem.lastElementChild!;

    expect(bar1.classList).toContain('progress-bar');
    expect(bar1.classList).toContain('progress-bar-striped');
    expect(bar1.classList).toContain('progress-bar-animated');

    expect(bar2.classList).toContain('progress-bar');
    expect(bar2.classList).toContain('progress-bar-striped');
    expect(bar2.classList).not.toContain('progress-bar-animated');
  });

  it('Should forward className and style to nested bars', () => {
    render(
      <ProgressBar data-testid="test">
        <ProgressBar now={1} className="bar1" />
        <ProgressBar now={2} style={{ minWidth: 10 }} />
      </ProgressBar>,
    );
    const innerProgressElem = screen.getByTestId('test');

    const bar1 = innerProgressElem.firstElementChild!;
    const bar2 = innerProgressElem.lastElementChild!;

    expect(bar1.classList).toContain('progress-bar');
    expect((bar2 as HTMLElement).style.minWidth).toEqual('10px');
  });
});
