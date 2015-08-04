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

  it('Should merge className', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabPane className="my-tab-pane">Item content</TabPane>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab-pane'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-tab-pane'));
  });

  it('Should pass id', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabPane id="my-tab-id">Item content</TabPane>
    );
    assert.equal(React.findDOMNode(instance).getAttribute('id'), 'my-tab-id');
  });

  it('Should pass style', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabPane style={{opacity: 0.9}}>Item content</TabPane>
    );
    const tabpane = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab-pane');
    assert.deepEqual(tabpane.props.style, {opacity: 0.9});
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
