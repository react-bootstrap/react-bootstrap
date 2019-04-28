import React from 'react';
import { mount } from 'enzyme';

import TabContent from '../src/TabContent';

describe('<TabContent>', () => {
  it('Should define default "as" in prop destructuring instead of deafultProps', () => {
    expect(TabContent.defaultProps.as).to.be.undefined;
  });

  it('Should have div as default component', () => {
    mount(<TabContent />).assertSingle('div');
  });
});
