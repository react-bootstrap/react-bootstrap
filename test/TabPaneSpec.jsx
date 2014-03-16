/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var TabPane        = require('../cjs/TabPane');

describe('TabPane', function () {
  it('Should have class', function () {
    var instance = (
        <TabPane>Item content</TabPane>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab-pane'));
  });

  it('Should add active class', function () {
    var instance = (
        <TabPane active={true}>Item content</TabPane>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });
});