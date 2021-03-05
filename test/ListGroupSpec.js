import { mount } from 'enzyme';

import ListGroup from '../src/ListGroup';

import { shouldWarn } from './helpers';

describe('<ListGroup>', () => {
  it('Should render correctly "list-group"', () => {
    mount(<ListGroup />).assertSingle('div.list-group');
  });

  it('accepts <ListGroup.Item> children', () => {
    mount(
      <ListGroup>
        <ListGroup.Item>hey!</ListGroup.Item>
      </ListGroup>,
    ).assertSingle('div.list-group-item');
  });

  it('accepts variant', () => {
    mount(<ListGroup variant="flush" />).assertSingle(
      'div.list-group.list-group-flush',
    );
  });

  it('accepts global horizontal', () => {
    mount(<ListGroup horizontal />).assertSingle(
      'div.list-group.list-group-horizontal',
    );
  });
  it('accepts responsive horizontal', () => {
    mount(<ListGroup horizontal="sm" />).assertSingle(
      'div.list-group.list-group-horizontal-sm',
    );
    mount(<ListGroup horizontal="md" />).assertSingle(
      'div.list-group.list-group-horizontal-md',
    );
    mount(<ListGroup horizontal="lg" />).assertSingle(
      'div.list-group.list-group-horizontal-lg',
    );
    mount(<ListGroup horizontal="xl" />).assertSingle(
      'div.list-group.list-group-horizontal-xl',
    );
  });

  it('throws a warning if flush and horizontal are used', () => {
    shouldWarn('together');
    mount(<ListGroup horizontal variant="flush" />);
  });

  it('accepts as prop', () => {
    mount(<ListGroup as="ul" />).assertSingle('ul.list-group');
  });
});
