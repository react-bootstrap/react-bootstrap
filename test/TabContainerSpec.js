import React from 'react';
import tsp from 'teaspoon';

import Nav from '../src/Nav';
import NavItem from '../src/NavItem';
import TabPane from '../src/TabPane';
import TabContent from '../src/TabContent';
import TabContainer from '../src/TabContainer';

let s = tsp.selector;

describe('TabContainer', () => {

  it('should not propagate context past TabPanes', () => {
    let instance = tsp(
      <TabContainer id="custom-id">
        <div>
          <Nav>
            <NavItem eventKey='1'>One</NavItem>
          </Nav>
          <TabContent>
            <TabPane eventKey='1'>
              <Nav>
                <NavItem eventKey='2'>One</NavItem>
              </Nav>
            </TabPane>
          </TabContent>
        </div>
      </TabContainer>
    ).render();

    let top = instance
      .find(s`div > ${Nav}`)
      .context('$bs_tabcontainer');

    let nested = instance
      .find(s`${TabPane} ${Nav}`)
      .context('$bs_tabcontainer');

    expect(top).to.exist;
    expect(nested).to.not.exist;
  });

  it('should default Nav role to tablist', () => {
    let instance = tsp(
      <TabContainer id="custom-id">
        <div>
          <Nav bsStyle='pills'>
            <NavItem eventKey='1'>One</NavItem>
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
          <Nav role='navigation' bsStyle='pills'>
            <NavItem href='#foo' eventKey='1'>One</NavItem>
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
