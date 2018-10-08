import React from 'react';
import { mount } from 'enzyme';

import Pagination from '../src/Pagination';

describe('<Pagination>', () => {
  it('should have class', () => {
    mount(<Pagination>Item content</Pagination>).assertSingle('.pagination');
  });
});
