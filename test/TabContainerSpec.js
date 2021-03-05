import { mount } from 'enzyme';

import Nav from '../src/Nav';
import TabPane from '../src/TabPane';
import TabContent from '../src/TabContent';
import TabContainer from '../src/TabContainer';

describe('<TabContainer>', () => {
  it('should not propagate context past TabPanes', () => {
    const onSelect = sinon.spy();

    let instance = mount(
      <TabContainer id="custom-id" onSelect={onSelect}>
        <Nav>
          <Nav.Item>
            <Nav.Link eventKey="1">One</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent>
          <TabPane eventKey="1">
            <Nav>
              <Nav.Item>
                <Nav.Link eventKey="2">One</Nav.Link>
              </Nav.Item>
            </Nav>
          </TabPane>
        </TabContent>
      </TabContainer>,
    );

    instance.find('TabPane Nav a').simulate('click');

    onSelect.should.not.have.been.called;

    instance.find('Nav a').first().simulate('click');

    onSelect.should.have.been.calledOnce;
  });

  it('should let generateChildId function create id', () => {
    const generateChildIdSpy = sinon.spy(() => 'test-id');

    let instance = mount(
      <TabContainer generateChildId={generateChildIdSpy}>
        <div>
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey="1">One</Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContent>
            <TabPane eventKey="1" />
          </TabContent>
        </div>
      </TabContainer>,
    );

    instance.assertSingle(`SafeAnchor[id="test-id"]`);
  });

  it('should throw an error if id is not set', () => {
    try {
      mount(
        <TabContainer>
          <div>
            <Nav>
              <Nav.Item>
                <Nav.Link eventKey="1">One</Nav.Link>
              </Nav.Item>
            </Nav>
            <TabContent>
              <TabPane eventKey="1" />
            </TabContent>
          </div>
        </TabContainer>,
      );
    } catch (error) {
      expect(error.message).to.contain(
        'In order to properly initialize Tabs in a way that is accessible ' +
          'to assistive technologies (such as screen readers) an `id` or a ' +
          '`generateChildId` prop to TabContainer is required',
      );
    }
  });

  it('should match up ids', () => {
    let instance = mount(
      <TabContainer id="custom-id">
        <div>
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey="1">One</Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContent>
            <TabPane eventKey="1" />
          </TabContent>
        </div>
      </TabContainer>,
    );

    let tabId = instance.find('NavLink a').first().prop('id');

    let paneId = instance.find('TabPane div').first().prop('id');

    expect(tabId).to.exist;
    expect(paneId).to.exist;

    instance.assertSingle(`a[aria-controls="${paneId}"]`);
    instance.assertSingle(`div[aria-labelledby="${tabId}"]`);
  });

  it('should default Nav role to tablist', () => {
    let instance = mount(
      <TabContainer id="custom-id">
        <div>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="1">One</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </TabContainer>,
    );
    instance.assertSingle('div.nav[role="tablist"]');

    instance
      .find('NavLink a')
      .first()
      .getDOMNode()
      .getAttribute('role')
      .should.equal('tab');
  });

  it('should use explicit Nav role', () => {
    let instance = mount(
      <TabContainer id="custom-id">
        <div>
          <Nav role="navigation" variant="pills">
            <Nav.Item>
              <Nav.Link href="#foo" eventKey="1">
                One
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </TabContainer>,
    );

    instance.assertSingle('div.nav[role="navigation"]');

    // make sure its not passed to the Nav.Link
    expect(instance.find('NavLink a').first().getDOMNode().getAttribute('role'))
      .to.not.exist;
  });

  it('Should show the correct tab when selected', () => {
    const wrapper = mount(
      <TabContainer id="test" defaultActiveKey={1} transition={false}>
        <Nav>
          <Nav.Item>
            <Nav.Link eventKey="1">One</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">Two</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent>
          <TabPane eventKey="1">Tab 1</TabPane>
          <TabPane eventKey="2">Tab 2</TabPane>
        </TabContent>
      </TabContainer>,
    );

    wrapper
      .find('div.tab-pane.active')
      .tap((p) => p.should.have.lengthOf(1))
      .text()
      .should.equal('Tab 1');

    wrapper.find('a.nav-link').last().simulate('click');

    wrapper
      .find('div.tab-pane.active')
      .tap((p) => p.should.have.lengthOf(1))
      .text()
      .should.equal('Tab 2');
  });

  it('Should mount and unmount tabs when set', () => {
    const wrapper = mount(
      <TabContainer
        id="test"
        mountOnEnter
        unmountOnExit
        defaultActiveKey={1}
        transition={false}
      >
        <Nav>
          <Nav.Item>
            <Nav.Link eventKey="1">One</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">Two</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent>
          <TabPane eventKey="1">Tab 1</TabPane>
          <TabPane eventKey="2">Tab 2</TabPane>
        </TabContent>
      </TabContainer>,
    );

    wrapper
      .find('div.tab-pane')
      .tap((p) => p.should.have.lengthOf(1))
      .text()
      .should.equal('Tab 1');

    wrapper.find('a.nav-link').last().simulate('click');

    wrapper
      .find('div.tab-pane')
      .tap((p) => p.should.have.lengthOf(1))
      .text()
      .should.equal('Tab 2');
  });
});
