import React from 'react';
import { mount } from 'enzyme';

import DropdownItem from '../src/DropdownItem';
import Nav from '../src/Nav';
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

    wrapper
      .assertSingle('a.nav-link')
      .text()
      .should.equal('Title');
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
});
