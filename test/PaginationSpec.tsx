import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pagination from '../src/Pagination';

describe('<Pagination>', () => {
  it('should have class', () => {
    render(<Pagination data-testid="test">Item content</Pagination>);
    const paginationElem = screen.getByTestId('test');
    expect(paginationElem.classList).toContain('pagination');
  });

  it('should render correctly when size is set', () => {
    render(
      <Pagination data-testid="test" size="sm">
        Item content
      </Pagination>,
    );
    const paginationElem = screen.getByTestId('test');
    expect(paginationElem.classList).toContain('pagination-sm');
  });

  it('sub-components should forward ref correctly', () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <Pagination data-testid="test" size="sm">
        Item content
        <Pagination.Next ref={ref} data-testid="next" />
      </Pagination>,
    );
    expect(ref.current?.tagName).toEqual('LI');
  });
});
