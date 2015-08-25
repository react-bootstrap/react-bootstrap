import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Tab from '../src/Tab';

describe('Tab', function () {
  it('Should have class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tab>Item content</Tab>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab-pane'));
  });

  it('Should add active class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tab active={true}>Item content</Tab>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });

  describe('Web Accessibility', function(){

    it('Should have aria-hidden', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <Tab active>Item content</Tab>
      );

      assert.equal(React.findDOMNode(instance).getAttribute('aria-hidden'), 'false');
    });

    it('Should have role', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <Tab active>Item content</Tab>
      );

      assert.equal(React.findDOMNode(instance).getAttribute('role'), 'tabpanel');
    });
  });
});
