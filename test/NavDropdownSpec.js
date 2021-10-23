import { mount } from 'enzyme';

import DropdownItem from '../src/DropdownItem';
import Nav from '../src/Nav';
import Navbar from '../src/Navbar';
import NavDropdown from '../src/NavDropdown';

describe('<NavDropdown>', () => {
  it('Should render li when in nav', () => {
    const wrapper = mount(
      <NavDropdown
        defaultShow
        title="Title"
        className="test-class"
        id="nav-test"
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
      </NavDropdown>,
    );

    wrapper.assertSingle('div.dropdown.test-class');

    wrapper.assertSingle('a.nav-link').text().should.equal('Title');
  });

  it('renders active toggle', () => {
    mount(
      <NavDropdown defaultShow active title="Title" id="nav-test">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
      </NavDropdown>,
    ).assertSingle('a.dropdown-toggle.active');
  });

  it('should handle child active state', () => {
    const wrapper = mount(
      <Nav defaultActiveKey="2">
        <NavDropdown defaultShow id="test-id" title="title">
          <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
          <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
          <DropdownItem eventKey="3">DropdownItem 3 content</DropdownItem>
        </NavDropdown>
      </Nav>,
    );

    wrapper
      .assertSingle('a.active')
      .text()
      .should.equal('DropdownItem 2 content');
  });

  it('should pass the id to the NavLink element', () => {
    const wrapper = mount(
      <NavDropdown id="test-id" title="title">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </NavDropdown>,
    );

    wrapper.assertSingle('a#test-id');
  });

  it('should support as as prop', () => {
    const wrapper = mount(
      <NavDropdown as="li" id="test-id" title="title">
        <DropdownItem eventKey="1">Item 1</DropdownItem>
      </NavDropdown>,
    );

    wrapper.assertSingle('li.nav-item');
  });

  it('passes menuVariant to dropdown menu', () => {
    const wrapper = mount(
      <NavDropdown title="blah" menuVariant="dark" id="test">
        <DropdownItem>Item 1</DropdownItem>
      </NavDropdown>,
    );

    expect(wrapper.find('DropdownMenu').props()).to.have.property(
      'variant',
      'dark',
    );
  });

  it('sets data-bs-popper attribute on dropdown menu', () => {
    const wrapper = mount(
      <Navbar>
        <NavDropdown renderMenuOnMount id="test-id" title="title">
          <DropdownItem>Item 1</DropdownItem>
        </NavDropdown>
      </Navbar>,
    );

    wrapper
      .assertSingle('.dropdown-menu')
      .assertSingle('[data-bs-popper="static"]');
  });
});
