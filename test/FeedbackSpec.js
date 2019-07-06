import React from 'react';
import { mount } from 'enzyme';

import Feedback from '../src/Feedback';

describe('<Feedback>', () => {
  it('Should have div as default component', () => {
    mount(<Feedback />).assertSingle('div');
  });
});
