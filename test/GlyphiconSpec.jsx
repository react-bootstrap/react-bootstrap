/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Glyphicon      = require('../cjs/Glyphicon');

describe('Glyphicon', function () {
  it('Should have bsClass by default', function () {
    var instance = ReactTestUtils.renderIntoDocument(Glyphicon({}, 'Message'));
    assert.ok(instance.getDOMNode().className.match(/\bglyphicon\b/));
  });

  it('Should have use bsGlyph class', function () {
    var instance = ReactTestUtils.renderIntoDocument(Glyphicon({bsGlyph: 'star'}));
    assert.ok(instance.getDOMNode().className.match(/\bglyphicon-star\b/));
  });
});