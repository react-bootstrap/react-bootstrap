/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Col            = require('../lib/Col');

describe('Col', function () {
  it('Should set Offset of zero', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Col xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0} />
    );

    var instanceClassName = instance.getDOMNode().className;
    assert.ok(instanceClassName.match(/\bcol-xs-offset-0\b/));
    assert.ok(instanceClassName.match(/\bcol-sm-offset-0\b/));
    assert.ok(instanceClassName.match(/\bcol-md-offset-0\b/));
    assert.ok(instanceClassName.match(/\bcol-lg-offset-0\b/));
  });

  it('Should set Pull of zero', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Col xsPull={0} smPull={0} mdPull={0} lgPull={0} />
    );

    var instanceClassName = instance.getDOMNode().className;
    assert.ok(instanceClassName.match(/\bcol-xs-pull-0\b/));
    assert.ok(instanceClassName.match(/\bcol-sm-pull-0\b/));
    assert.ok(instanceClassName.match(/\bcol-md-pull-0\b/));
    assert.ok(instanceClassName.match(/\bcol-lg-pull-0\b/));
  });

  it('Should set Push of zero', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Col xsPush={0} smPush={0} mdPush={0} lgPush={0} />
    );

    var instanceClassName = instance.getDOMNode().className;
    assert.ok(instanceClassName.match(/\bcol-xs-push-0\b/));
    assert.ok(instanceClassName.match(/\bcol-sm-push-0\b/));
    assert.ok(instanceClassName.match(/\bcol-md-push-0\b/));
    assert.ok(instanceClassName.match(/\bcol-lg-push-0\b/));
  });
});
