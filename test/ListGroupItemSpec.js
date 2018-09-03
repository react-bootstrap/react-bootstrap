import React from 'react';
import { mount } from 'enzyme';

import ListGroupItem from '../src/ListGroupItem';

describe('<ListGroupItem>', () => {
  it('should output a div', () => {
    mount(<ListGroupItem />).assertSingle('div.list-group-item');
  });

  it('accepts variants', () => {
    mount(<ListGroupItem variant="success" />).assertSingle(
      'div.list-group-item.list-group-item-success',
    );
  });

  it('accepts active', () => {
    mount(<ListGroupItem active />).assertSingle('div.list-group-item.active');
  });

  it('accepts disabled', () => {
    mount(<ListGroupItem disabled />).assertSingle(
      'div.list-group-item.disabled',
    );
  });

  it('accepts as prop', () => {
    mount(<ListGroupItem as="span" />).assertSingle('span.list-group-item');
  });
  describe('actions', () => {
    it('renders a button', () => {
      mount(<ListGroupItem action />).assertSingle(
        'button.list-group-item.list-group-item-action',
      );
    });
    it('renders an anchor', () => {
      mount(<ListGroupItem action href="/foo" />).assertSingle(
        'a.list-group-item.list-group-item-action[href="/foo"]',
      );
    });
  });
});
