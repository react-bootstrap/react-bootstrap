/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var ReactTestUtils = require('react/lib/ReactTestUtils');
var ProgressBar         = require('../cjs/ProgressBar');

var getProgressBar = function (wrapper) {
  return ReactTestUtils.findRenderedDOMComponentWithClass(wrapper, 'progress-bar');
};

describe('ProgressBar', function () {
  it('Should output a progress bar with wrapper', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 0, max:10, now: 0})
    );
    var bar = getProgressBar(instance);

    assert.equal(instance.getDOMNode().nodeName, 'DIV');
    assert.ok(instance.getDOMNode().className.match(/\bprogress\b/));
    assert.ok(bar.getDOMNode().className.match(/\bprogress-bar\b/));
    assert.equal(bar.getDOMNode().getAttribute('role'), 'progressbar');
  });

  it('Should have the default class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 0, max:10, now: 0, bsStyle: 'default'})
    );
    var bar = getProgressBar(instance);

    assert.ok(bar.getDOMNode().className.match(/\bprogress-bar-default\b/));
  });

  it('Should have the primary class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 0, max:10, now: 0, bsStyle: 'primary'})
    );
    var bar = getProgressBar(instance);

    assert.ok(bar.getDOMNode().className.match(/\bprogress-bar-primary\b/));
  });

  it('Should have the success class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 0, max:10, now: 0, bsStyle: 'success'})
    );
    var bar = getProgressBar(instance);

    assert.ok(bar.getDOMNode().className.match(/\bprogress-bar-success\b/));
  });

  it('Should have the warning class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 0, max:10, now: 0, bsStyle: 'warning'})
    );
    var bar = getProgressBar(instance);

    assert.ok(bar.getDOMNode().className.match(/\bprogress-bar-warning\b/));
  });

  it('Should default to min:0, max:100', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({now: 5})
    );
    var bar = getProgressBar(instance).getDOMNode();

    assert.equal(bar.getAttribute('aria-valuemin'), '0');
    assert.equal(bar.getAttribute('aria-valuemax'), '100');
  });

  it('Should have 0% computed width', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 0, max:10, now: 0})
    );
    var bar = getProgressBar(instance);

    assert.equal(bar.getDOMNode().style.width, '0%');
  });

  it('Should have 10% computed width', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 0, max:10, now: 1})
    );
    var bar = getProgressBar(instance);

    assert.equal(bar.getDOMNode().style.width, '10%');
  });

  it('Should have 100% computed width', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 0, max:10, now: 10})
    );
    var bar = getProgressBar(instance);

    assert.equal(bar.getDOMNode().style.width, '100%');
  });

  it('Should have 50% computed width with non-zero min', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 1, max:11, now: 6})
    );
    var bar = getProgressBar(instance);

    assert.equal(bar.getDOMNode().style.width, '50%');
  });

  it('Should not have label', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({
        min: 0,
        max: 10,
        now: 5,
        bsStyle: 'primary'
      })
    );

    assert.equal(instance.getDOMNode().innerText, '');
  });

  it('Should have label', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({
        min: 0,
        max: 10,
        now: 5,
        bsStyle: 'primary',
        label: 'min:%(min)s, max:%(max)s, now:%(now)s, percent:%(percent)s, bsStyle:%(bsStyle)s'
      })
    );

    assert.equal(instance.getDOMNode().innerText, 'min:0, max:10, now:5, percent:50, bsStyle:primary');
  });

  it('Should have screen reader only label', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({
        min: 0,
        max: 10,
        now: 5,
        bsStyle: 'primary',
        label: 'min:%(min)s, max:%(max)s, now:%(now)s, percent:%(percent)s, bsStyle:%(bsStyle)s',
        srOnly: true
      })
    );
    var srLabel = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'sr-only');

    assert.equal(srLabel.getDOMNode().innerText, 'min:0, max:10, now:5, percent:50, bsStyle:primary');
  });

  it('Should show striped bar', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 1, max:11, now: 6, striped: true})
    );

    assert.ok(instance.getDOMNode().className.match(/\bprogress-striped\b/));
  });

  it('Should show animated striped bar', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({min: 1, max:11, now: 6, active: true})
    );

    assert.ok(instance.getDOMNode().className.match(/\bprogress-striped\b/));
    assert.ok(instance.getDOMNode().className.match(/\bactive\b/));
  });

  it('Should show stacked bars', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      ProgressBar({}, [
        ProgressBar({now: 50, key: 1}),
        ProgressBar({now: 30, key: 2})
      ])
    );
    var wrapper = instance.getDOMNode();
    var bar1 = wrapper.firstChild;
    var bar2 = wrapper.lastChild;

    assert.ok(wrapper.className.match(/\bprogress\b/));
    assert.ok(bar1.className.match(/\bprogress-bar\b/));
    assert.equal(bar1.style.width, '50%');
    assert.ok(bar2.className.match(/\bprogress-bar\b/));
    assert.equal(bar2.style.width, '30%');
  });

});
