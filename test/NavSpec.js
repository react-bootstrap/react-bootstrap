import { mount } from 'enzyme';
import CardHeader from '../src/CardHeader';
import Nav from '../src/Nav';
import Navbar from '../src/Navbar';
import NavDropdown from '../src/NavDropdown';
import { shouldWarn } from './helpers';

describe('<Nav>', () => {
  let mountPoint;

  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });

  afterEach(() => {
    document.body.removeChild(mountPoint);
  });

  it('should have div as default component', () => {
    mount(<Nav />).assertSingle('div');
  });

  it('should set the correct item active', () => {
    const wrapper = mount(
      <Nav variant="pills" defaultActiveKey={1}>
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    );

    const items = wrapper.find('a.nav-link');

    assert.ok(items.at(0).is('.active'));
    assert.notOk(items.at(1).is('.active'));
  });

  it('should add variant class', () => {
    mount(
      <Nav variant="tabs">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    ).assertSingle('div.nav.nav-tabs');
  });

  it('should add justified class', () => {
    mount(
      <Nav justify>
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    ).assertSingle('div.nav.nav-justified');
  });

  it('should add fill class', () => {
    mount(
      <Nav fill>
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    ).assertSingle('div.nav.nav-fill');
  });

  it('should be navbar aware', () => {
    mount(
      <Navbar>
        <Nav>
          <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
          <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
        </Nav>
      </Navbar>,
    ).assertSingle('div.navbar-nav');
  });

  it('should handle navbarScroll only if within navbar', () => {
    mount(
      <Navbar>
        <Nav navbarScroll />
      </Navbar>,
    ).assertSingle('div.navbar-nav.navbar-nav-scroll');
  });

  it('should not add navbarScroll when not within navbar', () => {
    const wrapper = mount(<Nav navbarScroll />);

    const nav = wrapper.find('div.nav');
    expect(nav.hasClass('navbar-nav-scroll')).to.not.be.true;
  });

  it('should be card header aware', () => {
    mount(
      <CardHeader>
        <Nav variant="pills">
          <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
          <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
        </Nav>
      </CardHeader>,
    ).assertSingle('div.card-header-pills');
  });

  it('should call onSelect when a Nav.Link is selected', (done) => {
    function handleSelect(key) {
      assert.equal(key, '2');
      done();
    }

    mount(
      <Nav onSelect={handleSelect}>
        <Nav.Link eventKey={1}>Tab 1 content</Nav.Link>
        <Nav.Link eventKey={2}>
          <span>Tab 2 content</span>
        </Nav.Link>
      </Nav>,
    )
      .find('a')
      .last()
      .simulate('click');
  });

  it('should call onSelect when a NavDropdown.Item is selected', () => {
    const onSelectSpy = sinon.spy();

    mount(
      <Nav onSelect={onSelectSpy}>
        <NavDropdown title="Dropdown" id="nav-dropdown-test" renderMenuOnMount>
          <NavDropdown.Item eventKey={1}>Dropdown item</NavDropdown.Item>
        </NavDropdown>
      </Nav>,
    )
      .find('a.dropdown-item')
      .simulate('click');

    onSelectSpy.should.have.been.calledOnce;
  });

  it('should set the correct item active by href', () => {
    mount(
      <Nav defaultActiveKey="#item1">
        <Nav.Link href="#item1" className="test-selected">
          Pill 1 content
        </Nav.Link>
        <Nav.Link href="#item2">Pill 2 content</Nav.Link>
      </Nav>,
    ).assertSingle('a.test-selected.active');
  });

  it('should warn when attempting to use a justify navbar nav', () => {
    shouldWarn('justify navbar `Nav`s are not supported');

    mount(<Nav navbar justify />);
  });

  describe('Web Accessibility', () => {
    it('should have tablist and tab roles', () => {
      const wrapper = mount(
        <Nav>
          <Nav.Link key={1}>Tab 1 content</Nav.Link>
          <Nav.Link key={2}>Tab 2 content</Nav.Link>
        </Nav>,
      );

      wrapper.assertNone('div.nav[role="tablist"]');
      wrapper.assertNone('a[role="tab"]');

      wrapper.setProps({ role: 'tablist' });

      wrapper.assertSingle('div.nav[role="tablist"]');
      wrapper.find('a[role="tab"]').length.should.equal(2);
    });
  });
});
