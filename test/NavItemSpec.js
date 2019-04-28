import React from 'react';
import { mount } from 'enzyme';

import NavItem from '../src/NavItem';

describe('<NavItem>', () => {
  it('uses "div" by default', () => {
    mount(
      <NavItem className="custom-class">
        <strong>Children</strong>
      </NavItem>,
    ).assertSingle('div.nav-item.custom-class strong');
  });

  it('should allow custom elements instead of "div"', () => {
    mount(<NavItem as="section" />).assertSingle('section.nav-item');
  });

  it('Should define default "as" in prop destructuring instead of deafultProps', () => {
    expect(NavItem.defaultProps.as).to.be.undefined;
  });

  it('Should have div as default component', () => {
    mount(<NavItem />).assertSingle('div');
  });
});
