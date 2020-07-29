import React from 'react';
import { mount } from 'enzyme';

import FormRange from '../src/FormRange';

describe('<FormRange>', () => {
  it('should render correctly', () => {
    mount(
      <FormRange id="foo" name="bar" className="my-control" />,
    ).assertSingle('input#foo.form-range.my-control[type="range"][name="bar"]');
  });
});
