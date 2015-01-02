/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var TabPane        = require('../lib/TabPane');

describe('TabPane', function () {
  it('Should have class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <TabPane>Item content</TabPane>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab-pane'));
  });

  it('Should add active class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <TabPane active={true}>Item content</TabPane>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });
});
