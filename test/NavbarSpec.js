import { mount } from 'enzyme';

import Nav from '../src/Nav';
import Navbar from '../src/Navbar';
import Collapse from '../src/Collapse';

describe('<Navbar>', () => {
  it('Should create nav element', () => {
    mount(<Navbar />).assertSingle('nav.navbar.navbar-light');
  });

  it('Should add "navigation" role when not using a `<nav>`', () => {
    mount(<Navbar as="div" />).assertSingle('Navbar > div[role="navigation"]');
  });

  it('Should add fixed=top|bottom variation', () => {
    mount(<Navbar fixed="top" />).assertSingle('nav.fixed-top');

    mount(<Navbar fixed="bottom" />).assertSingle('nav.fixed-bottom');
  });

  it('Should variant=dark', () => {
    mount(<Navbar variant="dark" />).assertSingle('.navbar-dark');
  });

  it('Should override role attribute', () => {
    assert.ok(
      mount(<Navbar role="banner" />)
        .getDOMNode()
        .getAttribute('role'),
      'banner',
    );
  });

  describe('Brand', () => {
    it('Should render brand', () => {
      mount(<Navbar.Brand />).assertSingle('span.navbar-brand');
    });

    it('Should render brand as anchor', () => {
      mount(<Navbar.Brand href="#" />).assertSingle('a.navbar-brand');
    });
  });

  it('Should pass navbar context to navs', () => {
    mount(
      <Navbar>
        <Nav />
      </Navbar>,
    ).assertSingle('div.navbar-nav');
  });

  it('Should add custom toggle', () => {
    assert(
      mount(
        <Navbar>
          <Navbar.Toggle as="p">hi</Navbar.Toggle>
        </Navbar>,
      )
        .assertSingle('p.navbar-toggler')
        .text()
        .should.equal('hi'),
    );
  });

  it('Should trigger onToggle', () => {
    const toggleSpy = sinon.spy();
    mount(
      <Navbar onToggle={toggleSpy}>
        <Navbar.Toggle />
      </Navbar>,
    )
      .find('NavbarToggle')
      .simulate('click');

    expect(toggleSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledWith(true);
  });

  it('Should not swallow onClick', () => {
    const clickSpy = sinon.spy();

    mount(
      <Navbar>
        <Navbar.Toggle onClick={clickSpy} />
      </Navbar>,
    )
      .find('NavbarToggle')
      .simulate('click');

    expect(clickSpy).to.have.been.called;
  });

  it('Should render collapse', () => {
    mount(
      <Navbar>
        <Navbar.Collapse>hello</Navbar.Collapse>
      </Navbar>,
    ).assertSingle('.navbar-collapse');
  });

  it('Should pass expanded to Collapse', () => {
    const wrapper = mount(
      <Navbar defaultExpanded>
        <Navbar.Collapse>hello</Navbar.Collapse>
      </Navbar>,
    );
    expect(wrapper.find(Collapse).prop('in')).to.be.true;
  });

  it('Should wire the toggle to the collapse', () => {
    const wrapper = mount(
      <Navbar>
        <Navbar.Toggle />
        <Navbar.Collapse>hello</Navbar.Collapse>
      </Navbar>,
    );

    let toggle = wrapper.find('.navbar-toggler');
    let collapse = wrapper.find(Collapse);

    expect(collapse.is('[in=false]')).to.equal(true);
    expect(toggle.hasClass('collapsed')).to.equal(true);

    toggle.simulate('click');

    toggle = wrapper.find('.navbar-toggler');
    collapse = wrapper.find(Collapse);

    expect(collapse.is('[in=true]')).to.equal(true);
    expect(toggle.hasClass('collapsed')).to.equal(false);
  });

  it('Should open external href link in collapseOnSelect', () => {
    const selectSpy = sinon.spy();
    const navItemOnClick = sinon.stub();
    mount(
      <Navbar onSelect={selectSpy}>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="https://www.google.com" onClick={navItemOnClick} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    )
      .find('a.nav-link')
      .simulate('click');

    const event = navItemOnClick.getCall(0).args[0];
    const preventDefaultSpy = sinon.spy(event.preventDefault);

    expect(selectSpy).to.be.calledOnce;
    expect(navItemOnClick).to.be.calledOnce;
    expect(event.target.getAttribute('href')).to.be.equal(
      'https://www.google.com',
    );
    expect(preventDefaultSpy).to.not.be.called;
  });

  it('Should fire external href click', () => {
    const navItemSpy = sinon.spy();
    mount(
      <Navbar defaultExpanded>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="https://www.google.com" onClick={navItemSpy}>
              <span className="link-text">Option 1</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    )
      .find('.link-text')
      .simulate('click');

    expect(navItemSpy.getCall(0).args[0].isDefaultPrevented()).to.be.false;
  });

  it('Should collapseOnSelect & fire Nav subcomponent onSelect event if expanded', () => {
    const toggleSpy = sinon.spy();
    const navItemSpy = sinon.spy();
    mount(
      <Navbar collapseOnSelect onToggle={toggleSpy} defaultExpanded>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="#" onClick={navItemSpy}>
              <span className="link-text">Option 1</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    )
      .find('.link-text')
      .simulate('click');

    expect(navItemSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledWith(false);
  });

  it('Should fire onSelect with eventKey for nav children', () => {
    const selectSpy = sinon.spy();
    const navItemSpy = sinon.spy();

    mount(
      <Navbar onSelect={selectSpy}>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="#home" onClick={navItemSpy}>
              <span className="link-text">Option 1</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>,
    )
      .find('.link-text')
      .simulate('click');

    expect(navItemSpy).to.be.calledOnce;
    expect(selectSpy).to.be.calledOnce;
    expect(selectSpy).to.be.calledWith('#home');
  });

  it('Should have nav as default component', () => {
    const wrapper = mount(<Navbar />);
    expect(wrapper.find('nav').length).to.equal(1);
  });

  it('Should render correctly when expand is a string', () => {
    mount(<Navbar expand="sm" />).assertSingle('.navbar-expand-sm');
  });

  it('Should render correctly when bg is set', () => {
    mount(<Navbar bg="light" />).assertSingle('.navbar.bg-light');
  });

  it('Should render correctly when sticky is set', () => {
    mount(<Navbar sticky="top" />).assertSingle('.navbar.sticky-top');
  });
});
