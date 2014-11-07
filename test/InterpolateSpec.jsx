/** @jsx React.DOM */
/* global describe, it, assert */

var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Interpolate = require('../cjs/Interpolate');

describe('Interpolate', function() {
  it('render string label', function() {
    var instance = ReactTestUtils.renderIntoDocument(
      <Interpolate format="now: %(now)s" now={50} />
    );

    assert.equal(instance.getDOMNode().innerText, "now: 50");
  });
});
