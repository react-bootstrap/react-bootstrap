/** @jsx React.DOM */
/*global describe, it, assert */

var ReactTestUtils = require('react/lib/ReactTestUtils');
var TabPane        = require('../cjs/TabPane');

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