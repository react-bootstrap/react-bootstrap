import { render } from '@testing-library/react';

import DropdownItem from '../src/DropdownItem';
import Nav from '../src/Nav';
import Navbar from '../src/Navbar';
import NavDropdown from '../src/NavDropdown';

describe('<NavDropdown>', () => {
  it('Should render li when in nav', () => {
    const { getByTestId } = render(
      <NavDropdown
        defaultShow
        title="Title"
        className="test-class"
        id="nav-test"
        data-testid="test"
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
      </NavDropdown>,
    );
    const navDropdownElem = getByTestId('test');
    navDropdownElem.classList.contains('dropdown').should.be.true;
    navDropdownElem.classList.contains('test-class').should.be.true;

    navDropdownElem.firstElementChild!.classList.contains('nav-link').should.be
      .true;
    navDropdownElem.firstElementChild!.textContent!.should.equal('Title');
  });

  it('renders active toggle', () => {
    const { getByTestId } = render(
      <NavDropdown
        defaultShow
        active
        title="Title"
        id="nav-test"
        data-testid="test"
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
      </NavDropdown>,
    );
    const navDropdownElem = getByTestId('test');
    navDropdownElem.firstElementChild!.classList.contains('active').should.be
      .true;
  });

  it('should handle child active state', () => {
    const { getByTestId } = render(
      <Nav defaultActiveKey="2">
        <NavDropdown defaultShow id="test-id" title="title">
          <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
          <DropdownItem eventKey="2" data-testid="test">
            DropdownItem 2 content
          </DropdownItem>
          <DropdownItem eventKey="3">DropdownItem 3 content</DropdownItem>
        </NavDropdown>
      </Nav>,
    );

    getByTestId('test').textContent!.should.equal('DropdownItem 2 content');
  });

  it('should pass the id to the NavLink element', () => {
    const { getByTestId } = render(
      <NavDropdown id="test-id" title="title" data-testid="test">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </NavDropdown>,
    );
    getByTestId('test').firstElementChild!.id.should.equal('test-id');
  });

  it('should support as as prop', () => {
    const { getByTestId } = render(
      <NavDropdown as="li" id="test-id" title="title" data-testid="test">
        <DropdownItem eventKey="1">Item 1</DropdownItem>
      </NavDropdown>,
    );
    getByTestId('test').tagName.toLowerCase().should.equal('li');
  });

  it('passes menuVariant to dropdown menu', () => {
    render(
      <NavDropdown renderMenuOnMount title="blah" menuVariant="dark" id="test">
        <DropdownItem>Item 1</DropdownItem>
      </NavDropdown>,
    );
    document.querySelector('.dropdown-menu-dark')!.should.exist;
  });

  it('sets data-bs-popper attribute on dropdown menu', () => {
    render(
      <Navbar>
        <NavDropdown renderMenuOnMount id="test-id" title="title">
          <DropdownItem>Item 1</DropdownItem>
        </NavDropdown>
      </Navbar>,
    );
    document
      .querySelectorAll('.dropdown-menu[data-bs-popper="static"]')
      .length.should.equal(1);
  });
});
