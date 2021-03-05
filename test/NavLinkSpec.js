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

  it('Should call `onSelect` when item is selected', (done) => {
    function handleSelect(key, event) {
      assert.equal(key, '2');
      assert.ok(event.target.tagName === 'A');
      done();
    }
    mount(
      <NavLink eventKey="2" onSelect={handleSelect}>
        <span>Item content</span>
      </NavLink>,
    ).simulate('click');
  });

  it('Should not call `onSelect` when item disabled and is selected', () => {
    function handleSelect() {
      throw new Error('onSelect should not be called');
    }

    mount(
      <NavLink disabled onSelect={handleSelect}>
        <span>Item content</span>
      </NavLink>,
    ).simulate('click');
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
