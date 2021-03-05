import { mount } from 'enzyme';

import Pagination from '../src/Pagination';

describe('<Pagination>', () => {
  it('should have class', () => {
    mount(<Pagination>Item content</Pagination>).assertSingle('.pagination');
  });

  it('should render correctly when size is set', () => {
    mount(<Pagination size="sm">Item content</Pagination>).assertSingle(
      '.pagination.pagination-sm',
    );
  });
});
