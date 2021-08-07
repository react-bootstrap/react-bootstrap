import { mount } from 'enzyme';

import NavLink from '../src/NavLink';

describe('<NavLink>', () => {
  it('renders correctly', () => {
    mount(
      <NavLink
        className="custom-class"
        href="/some/unique-thing/"
        title="content"
      >
        <strong>Children</strong>
      </NavLink>,
    ).assertSingle(
      'a.nav-link.custom-class[href="/some/unique-thing/"][title="content"] strong',
    );
  });

  it('Should add active class', () => {
    mount(<NavLink active>Item content</NavLink>).assertSingle(
      'a.nav-link.active',
    );
  });

  it('Should add disabled class', () => {
    mount(<NavLink disabled>Item content</NavLink>).assertSingle(
      'a.nav-link.disabled',
    );
  });

  describe('Web Accessibility', () => {
    it('Should add aria-selected to the link when role is "tab"', () => {
      mount(
        <NavLink role="tab" active>
          Item content
        </NavLink>,
      ).assertSingle('a[aria-selected=true]');
    });

    it('Should not add aria-selected to the link when role is not "tab"', () => {
      mount(
        <NavLink role="button" active>
          Item content
        </NavLink>,
      ).assertNone('a[aria-selected]');
    });
  });
});
