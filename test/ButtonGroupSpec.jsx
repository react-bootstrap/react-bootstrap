/** @jsx React.DOM */
/*global describe, it, assert */

var ReactTestUtils = require('react/lib/ReactTestUtils');
var ButtonGroup    = require('../cjs/ButtonGroup');
var Button         = require('../cjs/Button');

describe('ButtonGroup', function () {
  it('Should output a button group', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          ButtonGroup(null, Button(null, 'Title'))
        );
    assert.equal(instance.getDOMNode().nodeName, 'DIV');
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group\b/));
  });

  it('Should add size', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          ButtonGroup({bsSize: 'large'}, Button(null, 'Title'))
        );
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group-lg\b/));
  });

  it('Should add vertical variation', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          ButtonGroup({vertical: true}, Button(null, 'Title'))
        );
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group-vertical\b/));
  });

  it('Should add justified variation', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          ButtonGroup({justified: true}, Button(null, 'Title'))
        );
    assert.ok(instance.getDOMNode().className.match(/\bbtn-group-justified\b/));
  });
});