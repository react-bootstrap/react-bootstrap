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

  it('should not get stuck after tab becomes unmounted', () => {
    class Switcher extends React.Component {
      state = {
        activeKey: '2',
        show: true,
      };

      render() {
        return (
          <TabContainer
            id="custom-id"
            activeKey={this.state.activeKey}
            onSelect={() => {}}
          >
            <div>
              <TabContent>
                <TabPane eventKey="1" />
                {this.state.show &&
                  <TabPane eventKey="2" />
                }
              </TabContent>
            </div>
          </TabContainer>
        );
      }
    }

    const instance = tsp(<Switcher />).render();
    instance.single(TabContent);

    instance.single('[eventKey="2"]').single('.active');

    instance.state('show', false);
    instance.none('.active');

    instance.state('activeKey', '1');
    instance.single('[eventKey="1"]').single('.active');
  });

  it('should not call onSelect when container unmounts', () => {
    class Switcher extends React.Component {
      state = { show: true };
      render() {
        if (!this.state.show) {
          return <div />;
        }

        return (
          <TabContainer id="custom-id" {...this.props}>
            <div>
              <TabContent>
                <TabPane eventKey="1" />
              </TabContent>
            </div>
          </TabContainer>
        );
      }
    }

    let spy = sinon.spy();
    let instance = tsp(<Switcher activeKey="1" onSelect={spy} />).render();

    instance.single(TabPane);

    instance.state('show', false);

    spy.should.have.not.been.called;
  });

  it('should clean up unmounted tab state', () => {
    class Switcher extends React.Component {
      state = {
        activeKey: 2,
        tabs: [0, 1, 2],
      };

      render() {
        return (
          <TabContainer
            id="custom-id"
            activeKey={this.state.activeKey}
            onSelect={() => {}}
          >
            <div>
              <TabContent>
                {this.state.tabs.map(id =>
                  <TabPane key={id} eventKey={id}>{id}</TabPane>
                )}
              </TabContent>
            </div>
          </TabContainer>
        );
      }
    }

    const instance = tsp(<Switcher />).render();

    instance.find(TabPane).length.should.equal(3);
    instance.single('[eventKey=2]').single('.active');

    instance.state({
      activeKey: 1,
      tabs: [0, 1],
    });

    instance.find(TabPane).length.should.equal(2);
    instance.single('[eventKey=1]').single('.active');
  });

  it('should not get stuck if tab stops animating', () => {
    class Switcher extends React.Component {
      state = {
        activeKey: 1,
        animation: true,
      };

      render() {
        return (
          <TabContainer
            id="custom-id"
            activeKey={this.state.activeKey}
            onSelect={() => {}}
          >
            <TabContent>
              <TabPane key={0} eventKey={0} />
              <TabPane key={1} eventKey={1} animation={this.state.animation} />
            </TabContent>
          </TabContainer>
        );
      }
    }

    const instance = tsp(<Switcher />).render();

    instance.single('[eventKey=1]').single('.active');

    instance.state({ animation: false });
    instance.single('[eventKey=1]').single('.active');

    instance.state({ activeKey: 0 });
    instance.single('[eventKey=0]').single('.active');
  });

  it('should handle simultaneous eventKey and activeKey change', () => {
    class Switcher extends React.Component {
      state = {
        activeKey: 1,
      };

      render() {
        return (
          <TabContainer
            id="custom-id"
            activeKey={this.state.activeKey}
            onSelect={() => {}}
          >
            <TabContent>
              <TabPane key={0} eventKey={0} />
              <TabPane key={1} eventKey={this.state.activeKey} />
            </TabContent>
          </TabContainer>
        );
      }
    }

    const instance = tsp(<Switcher />).render();

    instance.single('[eventKey=1]').single('.active');

    instance.state({ activeKey: 2 });
    instance.single('[eventKey=2]').single('.active');
  });

  it('should not get stuck if eventKey ceases to exist', () => {
    class Switcher extends React.Component {
      state = {
        activeKey: 1,
        eventKey: 1,
      };

      render() {
        return (
          <TabContainer
            id="custom-id"
            activeKey={this.state.activeKey}
            onSelect={() => {}}
          >
            <TabContent>
              <TabPane key={0} eventKey={0} />
              <TabPane key={1} eventKey={this.state.eventKey} />
            </TabContent>
          </TabContainer>
        );
      }
    }

    const instance = tsp(<Switcher />).render();

    instance.single('[eventKey=1]').single('.active');

    instance.state({ eventKey: 2 });
    instance.none('.active');

    instance.state({ activeKey: 2 });
    instance.single('[eventKey=2]').single('.active');

    // Check that active state lingers after changing event key.
    instance.state({ activeKey: 0 });
    instance.single('[eventKey=2]').single('.active');

    // But once event key changes again, make sure active state switches.
    instance.state({ eventKey: 1 });
    instance.single('[eventKey=0]').single('.active');
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
});
