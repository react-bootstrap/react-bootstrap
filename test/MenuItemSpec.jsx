/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var MenuItem        = require('../cjs/MenuItem');


describe('MenuItem', function () {
  it('should output an li', function () {
    var instance = MenuItem({}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);
    assert.equal(instance.getDOMNode().nodeName, 'LI');
    assert.equal(instance.getDOMNode().getAttribute('role'), 'presentation');
  });

  it('should pass through props', function () {
    var instance = MenuItem({
      className: 'test-class'
    }, 'Title');
    ReactTestUtils.renderIntoDocument(instance);
    assert(instance.getDOMNode().className.match(/\btest-class\b/));
  });

  it('should have an anchor', function () {
    var instance = MenuItem({}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    var anchor = instance.refs.anchor.getDOMNode();
    assert.equal(anchor.nodeName, 'A');
    assert.equal(anchor.getAttribute('tabIndex'), '-1');
  });

  it('should fire callback on click of link', function (done) {
    var instance = MenuItem({
      key: 1,
      onSelect: function (key) {
        assert.equal(key, 1);
        done();
      }
    }, 'Title');

    ReactTestUtils.renderIntoDocument(instance);
    ReactTestUtils.Simulate.click(instance.refs.anchor.getDOMNode());
  });

  it('should be a divider with no children', function () {
    var instance = MenuItem({
      divider: true
    }, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert(instance.getDOMNode().className.match(/\bdivider\b/), 'Has no divider class');
    assert.equal(instance.getDOMNode().innerText, '');
  });

  it('should be a header with no anchor', function () {
    var instance = MenuItem({
      header: true
    }, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert(instance.getDOMNode().className.match(/\bdropdown-header\b/), 'Has no header class');
    assert.equal(instance.getDOMNode().innerHTML, 'Title');
  });
});


