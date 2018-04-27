import React from 'react';
import { mount } from 'enzyme';

import ListGroupItem from '../src/ListGroupItem';

describe('<ListGroupItem>', () => {
  it('should output a li', () => {
    mount(<ListGroupItem />).assertSingle('li.list-group-item');
  });

  it('accepts variants', () => {
    mount(<ListGroupItem variant="success" />).assertSingle(
      'li.list-group-item.list-group-item-success',
    );
  });

  it('accepts active', () => {
    mount(<ListGroupItem active />).assertSingle('li.list-group-item.active');
  });

  it('accepts disabled', () => {
    mount(<ListGroupItem disabled />).assertSingle(
      'li.list-group-item.disabled',
    );
  });

  it('accepts as prop', () => {
    mount(<ListGroupItem as="span" />).assertSingle('span.list-group-item');
  });
});
