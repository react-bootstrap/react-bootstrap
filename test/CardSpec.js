import React from 'react';
import { mount } from 'enzyme';

import Card from '../src/Card';

describe('<Card>', () => {
  it('should output a div', () => {
    mount(<Card>Card</Card>).assertSingle('div');
  });

  it('should have additional classes', () => {
    mount(<Card className="custom-class">Card</Card>).assertSingle(
      '.card.custom-class',
    );
  });

  it('accepts a bg prop', () => {
    mount(<Card bg="primary">Card</Card>).assertSingle('.card.bg-primary');
  });

  it('accepts a text prop', () => {
    mount(<Card text="success">Card</Card>).assertSingle('.card.text-success');
  });

  it('accepts a border prop', () => {
    mount(<Card border="danger">Card</Card>).assertSingle(
      '.card.border-danger',
    );
  });

  it('should render children', () => {
    mount(
      <Card>
        <p>hello</p>
      </Card>,
    ).assertSingle('p');
  });

  it('accepts as prop', () => {
    mount(<Card as="section">body</Card>).assertSingle('section');
  });

  it('allows for the body shorthand', () => {
    mount(<Card body>test</Card>).assertSingle('.card-body');
  });
});
