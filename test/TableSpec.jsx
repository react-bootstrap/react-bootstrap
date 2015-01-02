/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Table          = require('../lib/Table');

describe('Table', function () {
  it('Should be a table', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Table />
    );
    assert.equal(instance.getDOMNode().nodeName, 'TABLE');
    assert.ok(instance.getDOMNode().className.match(/\btable\b/));
  });

  it('Should have correct class when striped', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Table striped />
    );
    assert.ok(instance.getDOMNode().className.match(/\btable-striped\b/));
  });

  it('Should have correct class when hover', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Table hover />
    );
    assert.ok(instance.getDOMNode().className.match(/\btable-hover\b/));
  });

  it('Should have correct class when bordered', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Table bordered />
    );
    assert.ok(instance.getDOMNode().className.match(/\btable-bordered\b/));
  });

  it('Should have correct class when condensed', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Table condensed />
    );
    assert.ok(instance.getDOMNode().className.match(/\btable-condensed\b/));
  });

  it('Should have responsive wrapper', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Table responsive />
    );
    assert.ok(instance.getDOMNode().className.match(/\btable-responsive\b/));
    assert.ok(instance.getDOMNode().firstChild.className.match(/\btable\b/));
  });
});
