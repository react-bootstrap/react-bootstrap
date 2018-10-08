import React from 'react';
import { mount } from 'enzyme';

import FormText from '../src/FormText';

describe('<FormText>', () => {
  it('should render correctly', () => {
    expect(
      mount(
        <FormText id="foo" className="my-form-text">
          Help contents
        </FormText>,
      )
        .assertSingle('#foo.form-text.my-form-text')
        .text(),
    ).to.equal('Help contents');
  });
});
