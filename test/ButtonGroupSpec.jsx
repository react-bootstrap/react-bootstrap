/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var ButtonGroup    = require('../cjs/ButtonGroup');
var Button         = require('../cjs/Button');

describe('ButtonGroup', function () {
  it('Should output a button group', function () {
    var instance = ButtonGroup(null, Button(null, 'Title'));
    ReactTestUtils.renderIntoDocument(instance);
    assert.equal(instance.getDOMNode().nodeName, 'DIV');
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group\b/));
  });

  it('Should add size', function () {
    var instance = ButtonGroup({bsSize: 'large'}, Button(null, 'Title'));
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group-lg\b/));
  });

  it('Should add vertical variation', function () {
    var instance = ButtonGroup({bsVariation: 'vertical'}, Button(null, 'Title'));
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group-vertical\b/));
  });

  it('Should add justified variation', function () {
    var instance = ButtonGroup({bsVariation: 'justified'}, Button(null, 'Title'));
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group-justified\b/));
  });
});