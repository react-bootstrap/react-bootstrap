import React from 'react';
import { mount } from 'enzyme';

import Feedback from '../src/Feedback';

describe('<Feedback>', () => {
  it('Should define default "as" in prop destructuring instead of deafultProps', () => {
    expect(Feedback.defaultProps.as).to.be.undefined;
  });

  it('Should have div as default component', () => {
    mount(<Feedback />).assertSingle('div');
  });
});
