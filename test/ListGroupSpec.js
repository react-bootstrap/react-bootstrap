import React from 'react';
import { mount } from 'enzyme';

import ListGroup from '../src/ListGroup';

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

  it('accepts as prop', () => {
    mount(<ListGroup as="div" />).assertSingle('div.list-group');
  });
});
