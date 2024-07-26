import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CardHeader from '../src/CardHeader';
import Nav from '../src/Nav';
import Navbar from '../src/Navbar';
import NavDropdown from '../src/NavDropdown';

describe('<Nav>', () => {
  it('should have div as default component', () => {
    render(<Nav data-testid="test" />);
    expect(screen.getByTestId('test').tagName).toEqual('DIV');
  });

  it('should set the correct item active', () => {
    render(
      <Nav variant="pills" defaultActiveKey={1} data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    );
    const navLinks = screen.getByTestId('test').children;

    expect(navLinks[0].classList).toContain('active');
    expect(navLinks[1].classList).not.toContain('active');
  });

  it('should add variant class', () => {
    render(
      <Nav variant="tabs" data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    );
    const navElem = screen.getByTestId('test');
    expect(navElem.classList).toContain('nav-tabs');
    expect(navElem.classList).toContain('nav');
  });

  it('should add justified class', () => {
    render(
      <Nav justify data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    );
    const navElem = screen.getByTestId('test');
    expect(navElem.classList).toContain('nav-justified');
  });

  it('should add fill class', () => {
    render(
      <Nav fill data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    );
    const navElem = screen.getByTestId('test');
    expect(navElem.classList).toContain('nav-fill');
  });

  it('should be navbar aware', () => {
    render(
      <Navbar>
        <Nav data-testid="test">
          <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
          <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
        </Nav>
      </Navbar>,
    );
    const navItem = screen.getByTestId('test');
    expect(navItem.classList).toContain('navbar-nav');
  });

  it('should handle navbarScroll if within navbar', () => {
    render(
      <Navbar>
        <Nav navbarScroll data-testid="test" />
      </Navbar>,
    );
    const navItem = screen.getByTestId('test');
    expect(navItem.classList).toContain('navbar-nav-scroll');
  });

  it('should not add navbarScroll when not within navbar', () => {
    render(<Nav navbarScroll data-testid="test" />);

    const navItem = screen.getByTestId('test');
    expect(navItem.classList).not.toContain('navbar-nav-scroll');
  });

  it('should be card header aware', () => {
    render(
      <CardHeader>
        <Nav variant="pills" data-testid="test">
          <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
          <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
        </Nav>
      </CardHeader>,
    );
    const navItem = screen.getByTestId('test');
    expect(navItem.classList).toContain('card-header-pills');
  });

  it('should call onSelect when a Nav.Link is selected', () => {
    const onSelectSpy = vi.fn();

    render(
      // eslint-disable-next-line react/jsx-no-bind
      <Nav onSelect={onSelectSpy} data-testid="test">
        <Nav.Link eventKey={1}>Tab 1 content</Nav.Link>
        <Nav.Link eventKey={2}>
          <span>Tab 2 content</span>
        </Nav.Link>
      </Nav>,
    );
    const navItem = screen.getByTestId('test');
    fireEvent.click(navItem.lastElementChild!);
    expect(onSelectSpy).toHaveBeenCalledWith('2', expect.anything());
  });

  it('should call onSelect when a NavDropdown.Item is selected', () => {
    const onSelectSpy = vi.fn();

    render(
      <Nav onSelect={onSelectSpy}>
        <NavDropdown title="Dropdown" id="nav-dropdown-test" renderMenuOnMount>
          <NavDropdown.Item eventKey={1} data-testid="test">
            Dropdown item
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>,
    );
    const dropdownItem = screen.getByTestId('test');
    fireEvent.click(dropdownItem!);

    expect(onSelectSpy).toHaveBeenCalledOnce();
  });

  it('should set the correct item active by href', () => {
    render(
      <Nav defaultActiveKey="#item1" data-testid="test">
        <Nav.Link href="#item1" className="test-selected">
          Pill 1 content
        </Nav.Link>
        <Nav.Link href="#item2">Pill 2 content</Nav.Link>
      </Nav>,
    );
    const navItem = screen.getByTestId('test');
    expect(navItem.firstElementChild!.classList).toContain('active');
  });

  describe('Web Accessibility', () => {
    it('should have tablist and tab roles', () => {
      const Component = (props) => (
        <Nav data-testid="test" {...props}>
          <Nav.Link key={1}>Tab 1 content</Nav.Link>
          <Nav.Link key={2}>Tab 2 content</Nav.Link>
        </Nav>
      );
      const { rerender } = render(<Component />);

      rerender(<Component role="tablist" />);
      const navItem = screen.getByTestId('test');
      expect(navItem.getAttribute('role')).toEqual('tablist');
      expect(navItem.querySelectorAll('a[role="tab"]')).toHaveLength(2);
    });
  });
});
