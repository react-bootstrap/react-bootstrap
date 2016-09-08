import React from 'react';
import tsp from 'teaspoon';

import Nav from '../src/Nav';
import NavItem from '../src/NavItem';
import TabPane from '../src/TabPane';
import TabContent from '../src/TabContent';
import TabContainer from '../src/TabContainer';

const s = tsp.selector;

describe('<TabContainer>', () => {
  it('should not propagate context past TabPanes', () => {
    let instance = tsp(
      <TabContainer id="custom-id">
        <div>
          <Nav>
            <NavItem eventKey="1">One</NavItem>
          </Nav>
          <TabContent>
            <TabPane eventKey="1">
              <Nav>
                <NavItem eventKey="2">One</NavItem>
              </Nav>
            </TabPane>
          </TabContent>
        </div>
      </TabContainer>
    ).render();

    let top = instance
      .find(s`div > ${Nav}`)
      .context('$bs_tabContainer');

    let nested = instance
      .find(s`${TabPane} ${Nav}`)
      .context('$bs_tabContainer');

    expect(top).to.exist;
    expect(nested).to.not.exist;
  });

  it('should match up ids', () => {
    let instance = tsp(
      <TabContainer id="custom-id">
        <div>
          <Nav>
            <NavItem eventKey="1">One</NavItem>
          </Nav>
          <TabContent>
            <TabPane eventKey="1" />
          </TabContent>
        </div>
      </TabContainer>
    ).render();

    let tabId = instance
      .first(s`${NavItem} a`)
      .props('id');

    let paneId = instance
      .first(s`${TabPane} div`)
      .props('id');

    expect(tabId).to.exist;
    expect(paneId).to.exist;

    instance.single(`a[aria-controls=${paneId}]`);
    instance.single(`div[aria-labelledby=${tabId}]`);
  });

  it('should default Nav role to tablist', () => {
    let instance = tsp(
      <TabContainer id="custom-id">
        <div>
          <Nav bsStyle="pills">
            <NavItem eventKey="1">One</NavItem>
          </Nav>
        </div>
      </TabContainer>
    ).render();

    instance
      .find(Nav)
      .dom()
      .getAttribute('role')
      .should.equal('tablist');

    instance
      .find(s`${NavItem} a`)[0]
      .getAttribute('role')
      .should.equal('tab');
  });

  it('should use explicit Nav role', () => {
    let instance = tsp(
      <TabContainer id="custom-id">
        <div>
          <Nav role="navigation" bsStyle="pills">
            <NavItem href="#foo" eventKey="1">One</NavItem>
          </Nav>
        </div>
      </TabContainer>
    ).render();

    instance
      .find(Nav)
      .dom()
      .getAttribute('role')
      .should.equal('navigation');

    // make sure its not passed to the NavItem
    expect(instance
      .find(s`${NavItem} a`)[0]
      .getAttribute('role')).to.not.exist;
  });

  describe('tab switching edge cases', () => {
    class Switcher extends React.Component {
      state = { ...this.props };

      render() {
        const {
          eventKeys, show = true, onSelect = () => {}, tabProps = [], ...props,
        } = this.state;

        if (!show) {
          return null;
        }

        return (
          <TabContainer {...props} id="custom-id" onSelect={onSelect}>
            <TabContent>
              {eventKeys.map((eventKey, index) => (
                <TabPane
                  key={index}
                  eventKey={eventKey}
                  {...tabProps[index]}
                />
              ))}
            </TabContent>
          </TabContainer>
        );
      }
    }

    it('should not get stuck after tab becomes unmounted', () => {
      const instance = tsp(
        <Switcher eventKeys={[1, 2]} activeKey={2} />
      ).render();

      instance.single(TabContent);
      instance.single('[eventKey=2]').single('.active');

      instance.state({ eventKeys: [1] });
      instance.none('.active');

      instance.state({ activeKey: 1 });
      instance.single('[eventKey=1]').single('.active');
    });

    it('should handle closing tab and changing active tab', () => {
      const instance = tsp(
        <Switcher eventKeys={[1, 2]} activeKey={2} />
      ).render();

      instance.single('[eventKey=2]').single('.active');

      instance.state({ eventKeys: [1], activeKey: 1 });
      instance.single('[eventKey=1]').single('.active');
    });

    it('should not call onSelect when container unmounts', () => {
      const spy = sinon.spy();
      const instance = tsp(
        <Switcher eventKeys={[1]} activeKey={1} onSelect={spy} />
      ).render();

      instance.single(TabPane);

      instance.state({ show: false });
      spy.should.have.not.been.called;
    });

    it('should clean up unmounted tab state', () => {
      const instance = tsp(
        <Switcher eventKeys={[1, 2, 3]} activeKey={3} />
      ).render();

      instance.find(TabPane).length.should.equal(3);
      instance.single('[eventKey=3]').single('.active');

      instance.state({ eventKeys: [1, 2], activeKey: 2 });
      instance.find(TabPane).length.should.equal(2);
      instance.single('[eventKey=2]').single('.active');
    });

    it('should not get stuck if tab stops animating', () => {
      const instance = tsp(
        <Switcher eventKeys={[1, 2]} activeKey={1} />
      ).render();

      instance.single('[eventKey=1]').single('.active');

      instance.state({ animation: false });
      instance.single('[eventKey=1]').single('.active');

      instance.state({ activeKey: 2 });
      instance.single('[eventKey=2]').single('.active');

      instance.state({ animation: true });
      instance.state({ activeKey: 1 });
      instance.single('[eventKey=2]').single('.active');
    });

    it('should handle simultaneous eventKey and activeKey change', () => {
      const instance = tsp(
        <Switcher eventKeys={[1, 2]} activeKey={2} />
      ).render();

      instance.single('[eventKey=2]').single('.active');

      instance.state({ eventKeys: [1, 3], activeKey: 3 });
      instance.single('[eventKey=3]').single('.active');

      instance.state({ eventKeys: [1, 4], activeKey: 4 });
      instance.single('[eventKey=4]').single('.active');
    });

    it('should not get stuck if eventKey ceases to exist', () => {
      const instance = tsp(
        <Switcher eventKeys={[1, 2]} activeKey={2} />
      ).render();

      instance.single('[eventKey=2]').single('.active');

      instance.state({ eventKeys: [1, 3] });
      instance.none('.active');

      instance.state({ activeKey: 3 });
      instance.single('[eventKey=3]').single('.active');

      // Check that active state lingers after changing event key.
      instance.state({ activeKey: 1 });
      instance.single('[eventKey=3]').single('.active');

      // But once event key changes again, make sure active state switches.
      instance.state({ eventKeys: [1, 2] });
      instance.single('[eventKey=1]').single('.active');
    });

    [
      [[1, 2], [2, 1]],
      [[2, 1], [1, 2]],
    ].forEach(([order1, order2]) => {
      it('should handle event key swaps', () => {
        const instance = tsp(
          <Switcher eventKeys={order1} activeKey={1} />
        ).render();

        instance.single('[eventKey=1]').single('.active');

        instance.state({ eventKeys: order2 });
        instance.single('[eventKey=1]').single('.active');

        // Check that the animation is still wired up.
        instance.state({ activeKey: 2 });
        instance.single('[eventKey=1]').single('.active');
      });
    });
  });
});
