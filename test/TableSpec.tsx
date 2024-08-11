import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Table from '../src/Table';

describe('Table', () => {
  it('Should be a table', () => {
    render(<Table data-testid="test" />);
    const tableElem = screen.getByTestId('test');

    expect(tableElem.classList).toContain('table');
    expect(tableElem.tagName).toEqual('TABLE');
  });

  it('Should have correct class when using striped row', () => {
    render(<Table data-testid="test" striped />);
    const tableElem = screen.getByTestId('test');

    expect(tableElem.classList).toContain('table-striped');
  });

  it('Should have correct class when using striped column', () => {
    render(<Table data-testid="test" striped="columns" />);
    const tableElem = screen.getByTestId('test');

    expect(tableElem.classList).toContain('table-striped-columns');
  });

  it('Should have correct class when hover', () => {
    render(<Table data-testid="test" hover />);
    const tableElem = screen.getByTestId('test');

    expect(tableElem.classList).toContain('table-hover');
  });

  it('Should have correct class when bordered', () => {
    render(<Table data-testid="test" bordered />);
    const tableElem = screen.getByTestId('test');

    expect(tableElem.classList).toContain('table-bordered');
  });

  it('Should have correct class when borderless', () => {
    render(<Table data-testid="test" borderless />);
    const tableElem = screen.getByTestId('test');

    expect(tableElem.classList).toContain('table-borderless');
  });

  it('Should have correct class when small', () => {
    render(<Table data-testid="test" size="sm" />);
    const tableElem = screen.getByTestId('test');

    expect(tableElem.classList).toContain('table-sm');
  });

  it('Should have correct class when dark', () => {
    render(<Table data-testid="test" variant="dark" />);
    const tableElem = screen.getByTestId('test');

    expect(tableElem.classList).toContain('table-dark');
  });

  it('Should have responsive wrapper', () => {
    const { container } = render(<Table responsive />);
    const tableElem = container.firstElementChild!;

    expect(tableElem.classList).toContain('table-responsive');
  });

  it('Should have responsive breakpoints', () => {
    const { container } = render(<Table responsive="sm" />);
    const tableElem = container.firstElementChild!;

    expect(tableElem.classList).toContain('table-responsive-sm');
  });
});
