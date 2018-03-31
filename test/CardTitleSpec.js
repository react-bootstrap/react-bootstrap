import React from 'react';
import { mount } from 'enzyme';

import CardTitle from '../src/CardTitle';

describe('<CardTitle>', () => {
  it('should output a div.h5', () => {
    mount(<CardTitle>hello</CardTitle>).assertSingle('div.h5');
  });

  it('accepts componentClass', () => {
    mount(<CardTitle componentClass="h5">title</CardTitle>).assertSingle(
      'h5.card-title'
    );
  });

  it('accepts custom classes', () => {
    mount(<CardTitle className="custom-one">Title</CardTitle>).assertSingle(
      '.card-title.custom-one'
    );
  });
});
