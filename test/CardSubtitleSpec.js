import React from 'react';
import { mount } from 'enzyme';

import CardSubtitle from '../src/CardSubtitle';

describe('<CardSubtitle>', () => {
  it('should output a div.h5', () => {
    mount(<CardSubtitle>hello</CardSubtitle>).assertSingle('div.h6');
  });

  it('accepts componentClass', () => {
    mount(<CardSubtitle componentClass="h5">title</CardSubtitle>).assertSingle(
      'h5.card-subtitle'
    );
  });

  it('accepts custom classes', () => {
    mount(
      <CardSubtitle className="custom-one">Title</CardSubtitle>
    ).assertSingle('.card-subtitle.custom-one');
  });
});
