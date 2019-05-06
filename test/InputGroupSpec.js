import React from 'react';
import { mount } from 'enzyme';

import InputGroup from '../src/InputGroup';

describe('<InputGroup>', () => {
  it('Should have div as default component', () => {
    const wrapper = mount(<InputGroup />);
    expect(wrapper.find('div').length).to.equal(1);
  });
});
