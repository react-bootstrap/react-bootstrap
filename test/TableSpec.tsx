import { render } from '@testing-library/react';

import Table from '../src/Table';

describe('Table', () => {
  it('Should be a table', () => {
    const { getByTestId } = render(<Table data-testid="test" />);
    const tableElem = getByTestId('test');

    tableElem.classList.contains('table').should.be.true;
    tableElem.tagName.toLowerCase().should.equal('table');
  });

  it('Should have correct class when using striped row', () => {
    const { getByTestId } = render(<Table data-testid="test" striped />);
    const tableElem = getByTestId('test');

    tableElem.classList.contains('table-striped').should.be.true;
  });

  it('Should have correct class when using striped column', () => {
    const { getByTestId } = render(
      <Table data-testid="test" striped="columns" />,
    );
    const tableElem = getByTestId('test');

    tableElem.classList.contains('table-striped-columns').should.be.true;
  });

  it('Should have correct class when hover', () => {
    const { getByTestId } = render(<Table data-testid="test" hover />);
    const tableElem = getByTestId('test');

    tableElem.classList.contains('table-hover').should.be.true;
  });

  it('Should have correct class when bordered', () => {
    const { getByTestId } = render(<Table data-testid="test" bordered />);
    const tableElem = getByTestId('test');

    tableElem.classList.contains('table-bordered').should.be.true;
  });

  it('Should have correct class when borderless', () => {
    const { getByTestId } = render(<Table data-testid="test" borderless />);
    const tableElem = getByTestId('test');

    tableElem.classList.contains('table-borderless').should.be.true;
  });

  it('Should have correct class when small', () => {
    const { getByTestId } = render(<Table data-testid="test" size="sm" />);
    const tableElem = getByTestId('test');

    tableElem.classList.contains('table-sm').should.be.true;
  });

  it('Should have correct class when dark', () => {
    const { getByTestId } = render(<Table data-testid="test" variant="dark" />);
    const tableElem = getByTestId('test');

    tableElem.classList.contains('table-dark').should.be.true;
  });

  it('Should have responsive wrapper', () => {
    const { container } = render(<Table responsive />);
    const tableElem = container.firstElementChild!;

    tableElem!.classList.contains('table-responsive').should.be.true;
  });

  it('Should have responsive breakpoints', () => {
    const { container } = render(<Table responsive="sm" />);
    const tableElem = container.firstElementChild!;

    tableElem!.classList.contains('table-responsive-sm').should.be.true;
  });
});
