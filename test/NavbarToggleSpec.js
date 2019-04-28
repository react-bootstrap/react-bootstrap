import React from 'react';
import { mount } from 'enzyme';

import NavbarToggle from '../src/NavbarToggle';

describe('<NavbarToggle>', () => {
  it('Should define default "as" in prop destructuring instead of deafultProps', () => {
    expect(NavbarToggle.defaultProps.as).to.be.undefined;
  });

  it('Should have button as default component', () => {
    mount(<NavbarToggle />).assertSingle('button');
  });
});
