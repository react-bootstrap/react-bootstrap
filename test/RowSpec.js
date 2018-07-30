import React from 'react';
import { mount } from 'enzyme';

import Row from '../src/Row';

describe('Row', () => {
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
});
