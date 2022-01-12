import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';
import CardHeader from '../src/CardHeader';
import Nav from '../src/Nav';
import Navbar from '../src/Navbar';
import NavDropdown from '../src/NavDropdown';
import { shouldWarn } from './helpers';

describe('<Nav>', () => {
  it('should have div as default component', () => {
    const { getByTestId } = render(<Nav data-testid="test" />);
    getByTestId('test').tagName.toLowerCase().should.equal('div');
  });

  it('should set the correct item active', () => {
    const { getByTestId } = render(
      <Nav variant="pills" defaultActiveKey={1} data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    );
    const navLinks = getByTestId('test').children;

    navLinks[0].classList.contains('active').should.be.true;
    navLinks[1].classList.contains('active').should.not.be.true;
  });

  it('should add variant class', () => {
    const { getByTestId } = render(
      <Nav variant="tabs" data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    );
    const navElem = getByTestId('test');
    navElem.classList.contains('nav-tabs').should.be.true;
    navElem.classList.contains('nav').should.be.true;
  });

  it('should add justified class', () => {
    const { getByTestId } = render(
      <Nav justify data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    );
    const navElem = getByTestId('test');
    navElem.classList.contains('nav-justified').should.be.true;
  });

  it('should add fill class', () => {
    const { getByTestId } = render(
      <Nav fill data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    );
    const navElem = getByTestId('test');
    navElem.classList.contains('nav-fill').should.be.true;
  });

  it('should be navbar aware', () => {
    const { getByTestId } = render(
      <Navbar>
        <Nav data-testid="test">
          <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
          <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
        </Nav>
      </Navbar>,
    );
    const navItem = getByTestId('test');
    navItem.classList.contains('navbar-nav').should.be.true;
  });

  it('should handle navbarScroll if within navbar', () => {
    const { getByTestId } = render(
      <Navbar>
        <Nav navbarScroll data-testid="test" />
      </Navbar>,
    );
    const navItem = getByTestId('test');
    navItem.classList.contains('navbar-nav-scroll').should.be.true;
  });

  it('should not add navbarScroll when not within navbar', () => {
    const { getByTestId } = render(<Nav navbarScroll data-testid="test" />);

    const navItem = getByTestId('test');
    navItem.classList.contains('navbar-nav-scroll').should.be.false;
  });

  it('should be card header aware', () => {
    const { getByTestId } = render(
      <CardHeader>
        <Nav variant="pills" data-testid="test">
          <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
          <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
        </Nav>
      </CardHeader>,
    );
    const navItem = getByTestId('test');
    navItem.classList.contains('card-header-pills').should.be.true;
  });

  it('should call onSelect when a Nav.Link is selected', () => {
    const onSelectSpy = sinon.spy();

    const { getByTestId } = render(
      // eslint-disable-next-line react/jsx-no-bind
      <Nav onSelect={onSelectSpy} data-testid="test">
        <Nav.Link eventKey={1}>Tab 1 content</Nav.Link>
        <Nav.Link eventKey={2}>
          <span>Tab 2 content</span>
        </Nav.Link>
      </Nav>,
    );
    const navItem = getByTestId('test');
    fireEvent.click(navItem.lastElementChild!);
    onSelectSpy.should.have.been.calledWith('2');
  });

  it('should call onSelect when a NavDropdown.Item is selected', () => {
    const onSelectSpy = sinon.spy();

    const { getByTestId } = render(
      <Nav onSelect={onSelectSpy}>
        <NavDropdown title="Dropdown" id="nav-dropdown-test" renderMenuOnMount>
          <NavDropdown.Item eventKey={1} data-testid="test">
            Dropdown item
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>,
    );
    const dropdownItem = getByTestId('test');
    fireEvent.click(dropdownItem!);

    onSelectSpy.should.have.been.calledOnce;
  });

  it('should set the correct item active by href', () => {
    const { getByTestId } = render(
      <Nav defaultActiveKey="#item1" data-testid="test">
        <Nav.Link href="#item1" className="test-selected">
          Pill 1 content
        </Nav.Link>
        <Nav.Link href="#item2">Pill 2 content</Nav.Link>
      </Nav>,
    );
    const navItem = getByTestId('test');
    navItem.firstElementChild!.classList.contains('active').should.be.true;
  });

  it('should warn when attempting to use a justify navbar nav', () => {
    shouldWarn('justify navbar `Nav`s are not supported');

    render(<Nav navbar justify />);
  });

  describe('Web Accessibility', () => {
    it('should have tablist and tab roles', () => {
      const Component = (props) => (
        <Nav data-testid="test" {...props}>
          <Nav.Link key={1}>Tab 1 content</Nav.Link>
          <Nav.Link key={2}>Tab 2 content</Nav.Link>
        </Nav>
      );
      const { rerender, getByTestId } = render(<Component />);

      rerender(<Component role="tablist" />);
      const navItem = getByTestId('test');
      navItem.getAttribute('role')!.should.equal('tablist');
      navItem.querySelectorAll('a[role="tab"]').length.should.equal(2);
    });
  });
});
