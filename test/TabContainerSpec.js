import React from 'react';
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
      </TabContainer>
    );

    instance.find('TabPane Nav a').simulate('click');

    onSelect.should.not.have.been.called;

    instance
      .find('Nav a')
      .first()
      .simulate('click');

    onSelect.should.have.been.calledOnce;
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
      </TabContainer>
    );

    let tabId = instance
      .find('Nav.Link a')
      .first()
      .prop('id');

    let paneId = instance
      .find('TabPane div')
      .first()
      .prop('id');

    expect(tabId).to.exist;
    expect(paneId).to.exist;

    instance.assertSingle(`a[aria-controls="${paneId}"]`);
    instance.assertSingle(`div[aria-labelledby="${tabId}"]`);
  });

  it('should default Nav role to tablist', () => {
    let instance = mount(
      <TabContainer id="custom-id">
        <div>
          <Nav bsStyle="pills">
            <Nav.Item>
              <Nav.Link eventKey="1">One</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </TabContainer>
    );

    instance
      .find(Nav)
      .getDOMNode()
      .getAttribute('role')
      .should.equal('tablist');

    instance
      .find('Nav.Link a')
      .first()
      .getDOMNode()
      .getAttribute('role')
      .should.equal('tab');
  });

  it('should use explicit Nav role', () => {
    let instance = mount(
      <TabContainer id="custom-id">
        <div>
          <Nav role="navigation" bsStyle="pills">
            <Nav.Item>
              <Nav.Link href="#foo" eventKey="1">
                One
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </TabContainer>
    );

    instance
      .find(Nav)
      .getDOMNode()
      .getAttribute('role')
      .should.equal('navigation');

    // make sure its not passed to the Nav.Link
    expect(
      instance
        .find('Nav.Link a')
        .first()
        .getDOMNode()
        .getAttribute('role')
    ).to.not.exist;
  });

  describe('tab switching edge cases', () => {
    class Switcher extends React.Component {
      state = { ...this.props };

      render() {
        const {
          eventKeys,
          show = true,
          onSelect = () => {},
          tabProps = [],
          ...props
        } = this.state;

        if (!show) {
          return null;
        }

        return (
          <TabContainer {...props} id="custom-id" onSelect={onSelect}>
            <TabContent>
              {eventKeys.map((eventKey, index) => (
                <TabPane key={index} eventKey={eventKey} {...tabProps[index]} />
              ))}
            </TabContent>
          </TabContainer>
        );
      }
    }

    it('should not get stuck after tab becomes unmounted', () => {
      const instance = mount(<Switcher eventKeys={[1, 2]} activeKey={2} />);

      instance.assertSingle(TabContent);
      instance.assertSingle('[eventKey=2]').assertSingle('.active');

      instance.setState({ eventKeys: [1] });
      instance.assertNone('.active');

      instance.setState({ activeKey: 1 });
      instance.assertSingle('[eventKey=1]').assertSingle('.active');
    });

    it('should handle closing tab and changing active tab', () => {
      const instance = mount(<Switcher eventKeys={[1, 2]} activeKey={2} />);

      instance.assertSingle('[eventKey=2]').assertSingle('.active');

      instance.setState({ eventKeys: [1], activeKey: 1 });
      instance.assertSingle('[eventKey=1]').assertSingle('.active');
    });

    it('should not call onSelect when container unmounts', () => {
      const spy = sinon.spy();
      const instance = mount(
        <Switcher eventKeys={[1]} activeKey={1} onSelect={spy} />
      );

      instance.assertSingle(TabPane);

      instance.setState({ show: false });
      spy.should.have.not.been.called;
    });

    it('should clean up unmounted tab state', () => {
      const instance = mount(<Switcher eventKeys={[1, 2, 3]} activeKey={3} />);

      instance.find(TabPane).length.should.equal(3);
      instance.assertSingle('[eventKey=3]').assertSingle('.active');

      instance.setState({ eventKeys: [1, 2], activeKey: 2 });
      instance.find(TabPane).length.should.equal(2);
      instance.assertSingle('[eventKey=2]').assertSingle('.active');
    });

    it('should not get stuck if tab stops animating', () => {
      const instance = mount(<Switcher eventKeys={[1, 2]} activeKey={1} />);

      instance.assertSingle('[eventKey=1]').assertSingle('.active');

      instance.setState({ animation: false });
      instance.assertSingle('[eventKey=1]').assertSingle('.active');

      instance.setState({ activeKey: 2 });
      instance.assertSingle('[eventKey=2]').assertSingle('.active');

      instance.setState({ animation: true });
      instance.setState({ activeKey: 1 });
      instance.assertSingle('[eventKey=2]').assertSingle('.active');
    });

    it('should handle simultaneous eventKey and activeKey change', () => {
      const instance = mount(<Switcher eventKeys={[1, 2]} activeKey={2} />);

      instance.assertSingle('[eventKey=2]').assertSingle('.active');

      instance.setState({ eventKeys: [1, 3], activeKey: 3 });
      instance.assertSingle('[eventKey=3]').assertSingle('.active');

      instance.setState({ eventKeys: [1, 4], activeKey: 4 });
      instance.assertSingle('[eventKey=4]').assertSingle('.active');
    });

    it('should not get stuck if eventKey ceases to exist', () => {
      const instance = mount(<Switcher eventKeys={[1, 2]} activeKey={2} />);

      instance.assertSingle('[eventKey=2]').assertSingle('.active');

      instance.setState({ eventKeys: [1, 3] });
      instance.assertNone('.active');

      instance.setState({ activeKey: 3 });
      instance.assertSingle('[eventKey=3]').assertSingle('.active');

      // Check that active state lingers after changing event key.
      instance.setState({ activeKey: 1 });
      instance.assertSingle('[eventKey=3]').assertSingle('.active');

      // But once event key changes again, make sure active state switches.
      instance.setState({ eventKeys: [1, 2] });
      instance.assertSingle('[eventKey=1]').assertSingle('.active');
    });

    [[[1, 2], [2, 1]], [[2, 1], [1, 2]]].forEach(([order1, order2]) => {
      it('should handle event key swaps', () => {
        const instance = mount(<Switcher eventKeys={order1} activeKey={1} />);

        instance.assertSingle('[eventKey=1]').assertSingle('.active');

        instance.setState({ eventKeys: order2 });
        instance.assertSingle('[eventKey=1]').assertSingle('.active');

        // Check that the animation is still wired up.
        instance.setState({ activeKey: 2 });
        instance.assertSingle('[eventKey=1]').assertSingle('.active');
      });
    });
  });
});
