import React from 'react';
import { mount } from 'enzyme';

import Card from '../src/Card';

describe('<Card>', () => {
  it('should output a div', () => {
    mount(<Card>Card</Card>).assertSingle('div');
  });

  it('should have additional classes', () => {
    mount(<Card className="custom-class">Card</Card>).assertSingle(
      '.card.custom-class'
    );
  });

  it('should render children', () => {
    mount(
      <Card>
        <p>hello</p>
      </Card>
    ).assertSingle('p');
  });

  it('accepts componentClass', () => {
    mount(<Card componentClass="section">body</Card>).assertSingle('section');
  });
});
