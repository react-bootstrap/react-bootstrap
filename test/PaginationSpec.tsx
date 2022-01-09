import { render } from '@testing-library/react';

import Pagination from '../src/Pagination';

describe('<Pagination>', () => {
  it('should have class', () => {
    const { getByTestId } = render(
      <Pagination data-testid="test">Item content</Pagination>,
    );
    const paginationElem = getByTestId('test');
    paginationElem.classList.contains('pagination').should.be.true;
  });

  it('should render correctly when size is set', () => {
    const { getByTestId } = render(
      <Pagination data-testid="test" size="sm">
        Item content
      </Pagination>,
    );
    const paginationElem = getByTestId('test');
    paginationElem.classList.contains('pagination-sm').should.be.true;
  });
});
