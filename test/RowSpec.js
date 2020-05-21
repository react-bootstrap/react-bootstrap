import React from 'react';
import { mount } from 'enzyme';

import Row from '../src/Row';

describe('Row', () => {
  it('Should include "row" when there are no sizes', () => {
    mount(<Row />).assertSingle('.row');
  });

  it('Should include sizes', () => {
    mount(<Row xs={4} md={8} />).assertSingle('.row-cols-md-8.row-cols-4');
  });

  it('Should allow sizes as objects', () => {
    mount(<Row xs={{ cols: 4 }} md={{ cols: 8 }} />).assertSingle(
      '.row-cols-md-8.row-cols-4',
    );
  });

  it('uses "div" by default', () => {
    mount(
      <Row className="custom-class">
        <strong>Children</strong>
      </Row>,
    ).assertSingle('div.row.custom-class strong');
  });

  it('should allow custom elements instead of "div"', () => {
    mount(<Row as="section" />).assertSingle('section.row');
  });

  it('Should render no-gutters correctly', () => {
    mount(<Row noGutters />).assertSingle('.row.no-gutters');
  });
});
