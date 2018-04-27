import React from 'react';
import { mount } from 'enzyme';

import ListGroup from '../src/ListGroup';

describe('<ListGroup>', () => {
  it('Should output a "ul" with the class "list-group"', () => {
    mount(<ListGroup />).assertSingle('ul.list-group');
  });

  it('accepts <ListGroup.Item> children', () => {
    mount(
      <ListGroup>
        <ListGroup.Item>hey!</ListGroup.Item>
      </ListGroup>,
    ).assertSingle('li.list-group-item');
  });

  it('accepts variant', () => {
    mount(<ListGroup variant="flush" />).assertSingle(
      'ul.list-group.list-group-flush',
    );
  });

  it('accepts as prop', () => {
    mount(<ListGroup as="div" />).assertSingle('div.list-group');
  });
});
