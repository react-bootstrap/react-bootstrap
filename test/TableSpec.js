import { mount } from 'enzyme';

import Table from '../src/Table';

describe('Table', () => {
  it('Should be a table', () => {
    mount(<Table />).assertSingle('table.table');
  });

  it('Should have correct class when striped', () => {
    mount(<Table striped />).assertSingle('table.table-striped');
  });

  it('Should have correct class when hover', () => {
    mount(<Table hover />).assertSingle('table.table-hover');
  });

  it('Should have correct class when bordered', () => {
    mount(<Table bordered />).assertSingle('table.table-bordered');
  });

  it('Should have correct class when borderless', () => {
    mount(<Table borderless />).assertSingle('table.table-borderless');
  });

  it('Should have correct class when small', () => {
    mount(<Table size="sm" />).assertSingle('table.table-sm');
  });

  it('Should have correct class when dark', () => {
    mount(<Table variant="dark" />).assertSingle('table.table-dark');
  });

  it('Should have responsive wrapper', () => {
    mount(<Table responsive />).assertSingle('div.table-responsive > .table');
  });

  it('Should have responsive breakpoints', () => {
    mount(<Table responsive="sm" />).assertSingle(
      'div.table-responsive-sm > .table',
    );
  });
});
