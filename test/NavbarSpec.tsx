import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';
import Nav from '../src/Nav';
import Navbar from '../src/Navbar';

describe('<Navbar>', () => {
  it('Should create nav element', () => {
    const { getByTestId } = render(<Navbar data-testid="test" />);
    const navbarElem = getByTestId('test');

    navbarElem.classList.contains('navbar').should.be.true;
    navbarElem.classList.contains('navbar-expand').should.be.true;
    navbarElem.classList.contains('navbar-light').should.be.true;
  });

  it('Should add "navigation" role when not using a `<nav>`', () => {
    const { getByTestId } = render(<Navbar as="div" data-testid="test" />);
    const navbarElem = getByTestId('test');

    navbarElem.tagName.toLowerCase().should.equal('div');
    navbarElem.getAttribute('role')!.should.equal('navigation');
  });

  it('Should add fixed=top|bottom variation', () => {
    const { getByTestId: getByFirstTestId } = render(
      <Navbar fixed="top" data-testid="test1" />,
    );
    const firstNavbarElem = getByFirstTestId('test1');
    firstNavbarElem.classList.contains('fixed-top').should.be.true;

    const { getByTestId: getBySecondTestId } = render(
      <Navbar fixed="bottom" data-testid="test2" />,
    );
    const navbarElem = getBySecondTestId('test2');
    navbarElem.classList.contains('fixed-bottom').should.be.true;
  });

  it('Should variant=dark', () => {
    const { getByTestId } = render(
      <Navbar variant="dark" data-testid="test" />,
    );
    getByTestId('test').classList.contains('navbar-dark').should.be.true;
  });

  it('Should override role attribute', () => {
    const { getByTestId } = render(<Navbar role="banner" data-testid="test" />);
    getByTestId('test').getAttribute('role')!.should.equal('banner');
  });

  describe('Brand', () => {
    it('Should render brand', () => {
      const { getByTestId } = render(<Navbar.Brand data-testid="test" />);
      const navbarBrandElem = getByTestId('test');
      navbarBrandElem.classList.contains('navbar-brand').should.be.true;
      navbarBrandElem.tagName.toLowerCase().should.equal('span');
    });

    it('Should render brand as anchor', () => {
      const { getByTestId } = render(
        <Navbar.Brand href="#" data-testid="test" />,
      );
      const navbarBrandElem = getByTestId('test');
      navbarBrandElem.classList.contains('navbar-brand').should.be.true;
      navbarBrandElem.tagName.toLowerCase().should.equal('a');
    });
  });

  it('Should pass navbar context to navs', () => {
    const { getByTestId } = render(
      <Navbar>
        <Nav data-testid="test" />
      </Navbar>,
    );
    const navElem = getByTestId('test');
    navElem.classList.contains('navbar-nav').should.be.true;
  });

  it('Should add custom toggle', () => {
    const { getByTestId } = render(
      <Navbar>
        <Navbar.Toggle as="p" data-testid="test">
          hi
        </Navbar.Toggle>
      </Navbar>,
    );
    const navToggleElem = getByTestId('test');
    navToggleElem.textContent!.should.equal('hi');
    navToggleElem.classList.contains('navbar-toggler');
    navToggleElem.tagName.toLowerCase().should.equal('p');
  });

  it('Should trigger onToggle', () => {
    const toggleSpy = sinon.spy();
    const { getByTestId } = render(
      <Navbar onToggle={toggleSpy}>
        <Navbar.Toggle data-testid="test" />
      </Navbar>,
    );
    const toggleElem = getByTestId('test');
    fireEvent.click(toggleElem);

    toggleSpy.should.have.been.calledOnce;
    toggleSpy.should.have.been.calledWith(true);
  });

  it('Should not swallow onClick', () => {
    const clickSpy = sinon.spy();

    const { getByTestId } = render(
      <Navbar>
        <Navbar.Toggle onClick={clickSpy} data-testid="test" />
      </Navbar>,
    );
    const toggleElem = getByTestId('test');
    fireEvent.click(toggleElem);

    clickSpy.should.have.been.calledOnce;
  });

  it('Should render collapse', () => {
    const { getByTestId } = render(
      <Navbar>
        <Navbar.Collapse data-testid="test">hello</Navbar.Collapse>
      </Navbar>,
    );
    getByTestId('test').classList.contains('navbar-collapse').should.be.true;
  });

  it('Should pass expanded to Collapse', () => {
    const { getByTestId } = render(
      <Navbar expanded>
        <Navbar.Collapse data-testid="test">hello</Navbar.Collapse>
      </Navbar>,
    );
    const toggleElem = getByTestId('test');
    toggleElem.classList.contains('show').should.be.true;
  });

  it('Should wire the toggle to the collapse', (done) => {
    const clock = sinon.useFakeTimers();
    const { getByTestId } = render(
      <Navbar>
        <Navbar.Toggle data-testid="toggler" />
        <Navbar.Collapse data-testid="collapse">hello</Navbar.Collapse>
      </Navbar>,
    );

    let toggleElem = getByTestId('toggler');
    let collapseElem = getByTestId('collapse');

    collapseElem.classList.contains('show').should.be.false;
    toggleElem.classList.contains('collapsed').should.be.true;

    fireEvent.click(toggleElem);
    clock.tick(500);

    toggleElem = getByTestId('toggler');
    collapseElem = getByTestId('collapse');

    collapseElem.classList.contains('show').should.be.true;
    toggleElem.classList.contains('collapsed').should.be.false;
    clock.restore();
    done();
  });

  it('Should open external href link in collapseOnSelect', () => {
    const spy = sinon.spy((e) => {
      // prevent actual redirect
      e.persist();
      e.preventDefault();
    });
    const { getByTestId } = render(
      <Navbar>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link
              href="https://www.google.com"
              data-testid="test"
              onClick={spy}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    );
    const linkItem = getByTestId('test');
    fireEvent.click(linkItem);
    spy.should.have.been.calledOnce;
    getByTestId('test')
      .getAttribute('href')!
      .should.equal('https://www.google.com');
  });

  it('Should fire external href click', (done) => {
    const spy = sinon.spy((e) => {
      // prevent actual redirect
      e.persist();
      e.preventDefault();
      done();
    });
    const { getByTestId } = render(
      <Navbar expanded>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="https://www.google.com" onClick={spy}>
              <span className="link-text" data-testid="test">
                Option 1
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    );
    const innerLinkItem = getByTestId('test');
    fireEvent.click(innerLinkItem);
  });

  it('Should collapseOnSelect & fire Nav subcomponent onSelect event if expanded', () => {
    const toggleSpy = sinon.spy();
    const navItemSpy = sinon.spy();
    const { getByTestId } = render(
      <Navbar collapseOnSelect onToggle={toggleSpy} expanded>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="#" onClick={navItemSpy}>
              <span className="link-text" data-testid="test">
                Option 1
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    );
    const innerLinkElem = getByTestId('test');
    fireEvent.click(innerLinkElem);

    navItemSpy.should.have.been.calledOnce;
    toggleSpy.should.have.been.calledOnce;
    toggleSpy.should.have.been.calledWith(false);
  });

  it('Should fire onSelect with eventKey for nav children', () => {
    const selectSpy = sinon.spy();
    const navItemSpy = sinon.spy();

    const { getByTestId } = render(
      <Navbar onSelect={selectSpy}>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="#home" onClick={navItemSpy}>
              <span className="link-text" data-testid="test">
                Option 1
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    );
    const innerLinkElem = getByTestId('test');
    fireEvent.click(innerLinkElem);

    navItemSpy.should.have.been.calledOnce;
    selectSpy.should.have.been.calledOnce;
    selectSpy.should.have.been.calledWith('#home');
  });

  it('Should have nav as default component', () => {
    const { getByTestId } = render(<Navbar data-testid="test" />);
    getByTestId('test').tagName.toLowerCase().should.equal('nav');
  });

  it('Should render correctly when expand is a string', () => {
    const { getByTestId } = render(<Navbar expand="sm" data-testid="test" />);
    getByTestId('test').classList.contains('navbar-expand-sm').should.be.true;
  });

  it('should allow custom breakpoints for expand', () => {
    const { getByTestId } = render(
      <Navbar expand="custom" data-testid="test" />,
    );
    getByTestId('test').classList.contains('navbar-expand-custom').should.be
      .true;
  });

  it('Should render correctly when bg is set', () => {
    const { getByTestId } = render(<Navbar bg="light" data-testid="test" />);
    getByTestId('test').classList.contains('bg-light').should.be.true;
  });

  it('Should render correctly when sticky is set', () => {
    const { getByTestId } = render(<Navbar sticky="top" data-testid="test" />);
    getByTestId('test').classList.contains('sticky-top').should.be.true;
  });
});
