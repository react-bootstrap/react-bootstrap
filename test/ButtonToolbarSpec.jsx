/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var ButtonToolbar  = require('../cjs/ButtonToolbar');
var ButtonGroup    = require('../cjs/ButtonGroup');
var Button         = require('../cjs/Button');

describe('ButtonToolbar', function () {
  it('Should output a button toolbar', function () {
    var instance = ButtonToolbar(null, ButtonGroup(null, Button(null, 'Title')));
    ReactTestUtils.renderIntoDocument(instance);
    assert.equal(instance.getDOMNode().nodeName, 'DIV');
    assert.ok(instance.getDOMNode().className.match(/\bbtn-toolbar\b/));
    assert.equal(instance.getDOMNode().getAttribute('role'), 'toolbar');
  });
});