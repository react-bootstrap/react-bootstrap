import { render } from '@testing-library/react';

import ListGroup from '../src/ListGroup';

import { shouldWarn } from './helpers';

describe('<ListGroup>', () => {
  it('Should render correctly "list-group"', () => {
    const { getByTestId } = render(<ListGroup data-testid="test" />);

    const listGroup = getByTestId('test');
    listGroup.tagName.toLowerCase().should.equal('div');
    listGroup.classList.contains('list-group').should.be.true;
  });

  it('accepts <ListGroup.Item> children', () => {
    const { getByTestId } = render(
      <ListGroup>
        <ListGroup.Item data-testid="test">hey!</ListGroup.Item>
      </ListGroup>,
    );

    const listGroupItem = getByTestId('test');
    listGroupItem.classList.contains('list-group-item').should.be.true;
  });

  it('accepts variant', () => {
    const { getByTestId } = render(
      <ListGroup variant="flush" data-testid="test" />,
    );

    const listGroup = getByTestId('test');
    listGroup.classList.contains('list-group').should.be.true;
    listGroup.classList.contains('list-group-flush').should.be.true;
  });

  it('accepts global horizontal', () => {
    const { getByTestId } = render(<ListGroup horizontal data-testid="test" />);

    const listGroup = getByTestId('test');
    listGroup.classList.contains('list-group-horizontal').should.be.true;
  });

  (['sm', 'md', 'lg', 'xl', 'xxl', 'custom'] as const).forEach((breakpoint) => {
    it(`accepts responsive horizontal ${breakpoint} breakpoint`, () => {
      const { getByTestId } = render(
        <ListGroup horizontal={breakpoint} data-testid="test" />,
      );

      const listGroup = getByTestId('test');
      const breakpointClass = `list-group-horizontal-${breakpoint}`;
      listGroup.classList.contains(breakpointClass).should.be.true;
    });
  });

  it('throws a warning if flush and horizontal are used', () => {
    shouldWarn('together');
    render(<ListGroup horizontal variant="flush" />);
  });

  it('accepts as prop', () => {
    const { getByTestId } = render(<ListGroup as="ul" data-testid="test" />);

    const listGroup = getByTestId('test');
    listGroup.tagName.toLowerCase().should.equal('ul');
    listGroup.classList.contains('list-group').should.be.true;
  });

  it('should set active class on list item if activeKey set on parent', () => {
    const { getByTestId } = render(
      <ListGroup activeKey="1">
        <ListGroup.Item eventKey="1" data-testid="list-item">
          test
        </ListGroup.Item>
      </ListGroup>,
    );

    getByTestId('list-item').classList.contains('active').should.be.true;
  });

  it('should add numbered class', () => {
    const { getByTestId } = render(
      <ListGroup activeKey="1" numbered data-testid="list-group">
        <ListGroup.Item eventKey="1">test</ListGroup.Item>
      </ListGroup>,
    );

    const listGroup = getByTestId('list-group');
    listGroup.classList.contains('list-group-numbered').should.be.true;
  });
});
