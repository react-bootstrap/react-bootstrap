/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var ProgressBar         = require('../cjs/ProgressBar');

describe('ProgressBar', function () {
  it('Should output a progress bar', function () {
    var instance = ProgressBar({min: 0, max:10, now: 0}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);
    assert.equal(instance.getDOMNode().nodeName, 'DIV');
  });

  it('Should have progress-bar class', function () {
    var instance = ProgressBar({min: 0, max:10, now: 0}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\bprogress-bar\b/));
  });

  it('Should have role=progressbar', function () {
    var instance = ProgressBar({min: 0, max:10, now: 0}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);
    assert.equal(instance.getDOMNode().getAttribute('role'), 'progressbar');
  });

  it('Should have the default class', function () {
    var instance = ProgressBar({min: 0, max:10, now: 0, bsStyle: 'default'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bprogress-bar-default\b/));
  });

  it('Should have the primary class', function () {
    var instance = ProgressBar({min: 0, max:10, now: 0, bsStyle: 'primary'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bprogress-bar-primary\b/));
  });

  it('Should have the success class', function () {
    var instance = ProgressBar({min: 0, max:10, now: 0, bsStyle: 'success'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bprogress-bar-success\b/));
  });

  it('Should have the warning class', function () {
    var instance = ProgressBar({min: 0, max:10, now: 0, bsStyle: 'warning'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bprogress-bar-warning\b/));
  });

  it('Should have 0% computed width', function () {
    var instance = ProgressBar({min: 0, max:10, now: 0, bsStyle: 'warning'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.equal(instance.getDOMNode().style.width, "0%");
  });


  it('Should have 10% computed width', function () {
    var instance = ProgressBar({min: 0, max:10, now: 1, bsStyle: 'warning'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.equal(instance.getDOMNode().style.width, "10%");
  });

  it('Should have 100% computed width', function () {
    var instance = ProgressBar({min: 0, max:10, now: 10, bsStyle: 'warning'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.equal(instance.getDOMNode().style.width, "100%");
  });

});
