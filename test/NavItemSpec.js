import { mount } from 'enzyme';

import NavItem from '../src/NavItem';

describe('<NavItem>', () => {
  it('should have div as default component', () => {
    mount(<NavItem />).assertSingle('div');
  });

  it('should allow custom elements instead of "div"', () => {
    mount(<NavItem as="section" />).assertSingle('section.nav-item');
  });

  it('should pass classNames down and render children', () => {
    mount(
      <NavItem className="custom-class and-other">
        <strong>Children</strong>
      </NavItem>,
    ).assertSingle('div.nav-item.custom-class.and-other strong');
  });
});
