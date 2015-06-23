import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import TabPane from '../src/TabPane';

describe('TabPane', function () {
  it('Should have class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabPane>Item content</TabPane>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab-pane'));
  });

  it('Should add active class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabPane active={true}>Item content</TabPane>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });

  describe('Web Accessibility', function(){

    it('Should have aria-hidden', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <TabPane active>Item content</TabPane>
      );

      assert.equal(React.findDOMNode(instance).getAttribute('aria-hidden'), 'false');
    });

    it('Should have role', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <TabPane active>Item content</TabPane>
      );

      assert.equal(React.findDOMNode(instance).getAttribute('role'), 'tabpanel');
    });
  });
});
