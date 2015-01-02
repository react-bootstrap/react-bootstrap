/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var ProgressBar    = require('../lib/ProgressBar');

var getProgressBar = function (wrapper) {
  return ReactTestUtils.findRenderedDOMComponentWithClass(wrapper, 'progress-bar');
};

describe('ProgressBar', function () {
  it('Should output a progress bar with wrapper', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} />
    );
    var bar = getProgressBar(instance);

    assert.equal(instance.getDOMNode().nodeName, 'DIV');
    assert.ok(instance.getDOMNode().className.match(/\bprogress\b/));
    assert.ok(bar.getDOMNode().className.match(/\bprogress-bar\b/));
    assert.equal(bar.getDOMNode().getAttribute('role'), 'progressbar');
  });

  it('Should have the default class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} bsStyle='default' />
    );
    var bar = getProgressBar(instance);

    assert.ok(bar.getDOMNode().className.match(/\bprogress-bar-default\b/));
  });

  it('Should have the primary class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} bsStyle='primary' />
    );
    var bar = getProgressBar(instance);

    assert.ok(bar.getDOMNode().className.match(/\bprogress-bar-primary\b/));
  });

  it('Should have the success class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} bsStyle='success' />
    );
    var bar = getProgressBar(instance);

    assert.ok(bar.getDOMNode().className.match(/\bprogress-bar-success\b/));
  });

  it('Should have the warning class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} bsStyle='warning' />
    );
    var bar = getProgressBar(instance);

    assert.ok(bar.getDOMNode().className.match(/\bprogress-bar-warning\b/));
  });

  it('Should default to min:0, max:100', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar now={5} />
    );
    var bar = getProgressBar(instance).getDOMNode();

    assert.equal(bar.getAttribute('aria-valuemin'), '0');
    assert.equal(bar.getAttribute('aria-valuemax'), '100');
  });

  it('Should have 0% computed width', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={0} />
    );
    var bar = getProgressBar(instance);

    assert.equal(bar.getDOMNode().style.width, '0%');
  });

  it('Should have 10% computed width', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={1} />
    );
    var bar = getProgressBar(instance);

    assert.equal(bar.getDOMNode().style.width, '10%');
  });

  it('Should have 100% computed width', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={10} />
    );
    var bar = getProgressBar(instance);

    assert.equal(bar.getDOMNode().style.width, '100%');
  });

  it('Should have 50% computed width with non-zero min', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={1} max={11} now={6} />
    );
    var bar = getProgressBar(instance);

    assert.equal(bar.getDOMNode().style.width, '50%');
  });

  it('Should not have label', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={5} bsStyle='primary' />
    );

    assert.equal(instance.getDOMNode().innerText, '');
  });

  it('Should have label', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={5} bsStyle='primary'
        label='min:%(min)s, max:%(max)s, now:%(now)s, percent:%(percent)s, bsStyle:%(bsStyle)s' />
    );

    assert.equal(instance.getDOMNode().innerText, 'min:0, max:10, now:5, percent:50, bsStyle:primary');
  });

  it('Should have screen reader only label', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={5} bsStyle='primary' srOnly
        label='min:%(min)s, max:%(max)s, now:%(now)s, percent:%(percent)s, bsStyle:%(bsStyle)s' />
    );
    var srLabel = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'sr-only');

    assert.equal(srLabel.getDOMNode().innerText, 'min:0, max:10, now:5, percent:50, bsStyle:primary');
  });

  it('Should have a label that is a React component', function () {
    var customLabel = (
      <strong className="special-label">My label</strong>
    );

    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={5} bsStyle='primary' label={customLabel} />
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'special-label'));
  });

  it('Should have screen reader only label that wraps a React component', function () {
    var customLabel = (
      <strong className="special-label">My label</strong>
    );

    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={0} max={10} now={5} bsStyle='primary' label={customLabel} srOnly />
    );

    var srLabel = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'sr-only');
    var component = ReactTestUtils.findRenderedDOMComponentWithClass(srLabel, 'special-label');

    assert.ok(component);
  });

  it('Should show striped bar', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={1} max={11} now={6} striped />
    );

    assert.ok(instance.getDOMNode().className.match(/\bprogress-striped\b/));
  });

  it('Should show animated striped bar', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar min={1} max={11} now={6} active />
    );

    assert.ok(instance.getDOMNode().className.match(/\bprogress-striped\b/));
    assert.ok(instance.getDOMNode().className.match(/\bactive\b/));
  });

  it('Should show stacked bars', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ProgressBar>
        <ProgressBar key={1} now={50} />
        <ProgressBar key={2} now={30} />
      </ProgressBar>
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
