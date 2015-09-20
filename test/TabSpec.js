import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Tab from '../src/Tab';

describe('Tab', () => {
  it('Should have class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tab>Item content</Tab>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab-pane'));
  });

  it('Should add active class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tab active={true}>Item content</Tab>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });

  describe('Web Accessibility', () => {

    it('Should have aria-hidden', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Tab active>Item content</Tab>
      );

      assert.equal(React.findDOMNode(instance).getAttribute('aria-hidden'), 'false');
    });

    it('Should have role', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Tab active>Item content</Tab>
      );

      assert.equal(React.findDOMNode(instance).getAttribute('role'), 'tabpanel');
    });
  });
});
