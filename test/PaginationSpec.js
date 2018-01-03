import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Pagination from '../src/Pagination';

describe('<Pagination>', () => {
  it('should have class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination>Item content</Pagination>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'pagination')
    );
  });
});
