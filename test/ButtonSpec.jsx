/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Button         = require('../cjs/Button');

describe('Button', function () {
  it('Should output a button', function () {
    var instance = Button({}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);
    assert.equal(instance.getDOMNode().nodeName, 'BUTTON');
  });

  it('Should have type=button by default', function () {
    var instance = Button({}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);
    assert.equal(instance.getDOMNode().getAttribute('type'), 'button');
  });

  it('Should show the type if passed one', function () {
    var instance = Button({type: 'submit'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);
    assert.equal(instance.getDOMNode().getAttribute('type'), 'submit');
  });

  it('Should output an anchor if called with a href', function () {
    var href = '/url';
    var instance = Button({href: href}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.equal(instance.getDOMNode().nodeName, 'A');
    assert.equal(instance.getDOMNode().getAttribute('href'), href);
  });

  it('Should call onClick callback', function (done) {
    var instance = Button({
      onClick: function () {
        done();
      }
    }, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    ReactTestUtils.Simulate.click(instance.getDOMNode());
  });

  it('Should be disabled', function () {
    var instance = Button({isDisabled: true}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bdisabled\b/));
    assert.ok(instance.getDOMNode().disabled);
  });

  it('Should have the default class', function () {
    var instance = Button({bsStyle: 'default'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-default\b/));
  });

  it('Should have the primary class', function () {
    var instance = Button({bsStyle: 'primary'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-primary\b/));
  });

  it('Should have the success class', function () {
    var instance = Button({bsStyle: 'success'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-success\b/));
  });

  it('Should have the info class', function () {
    var instance = Button({bsStyle: 'info'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-info\b/));
  });

  it('Should have the warning class', function () {
    var instance = Button({bsStyle: 'warning'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-warning\b/));
  });

  it('Should have the danger class', function () {
    var instance = Button({bsStyle: 'danger'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-danger\b/));
  });

  it('Should have the link class', function () {
    var instance = Button({bsStyle: 'link'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-link\b/));
  });

  it('Should have the inline class', function () {
    var instance = Button({bsStyle: 'inline'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-inline\b/));
  });

  it('Should be active', function () {
    var instance = Button({isActive: true}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bactive\b/));
  });

  it('Should be in loading state with default text', function () {
    var instance = Button({isLoading: true}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bdisabled\b/));
    assert.ok(instance.getDOMNode().disabled);
    assert.equal(instance.getDOMNode().innerText, 'Loading...');
  });

  it('Should have custom loading text', function () {
    var instance = Button({isLoading: true, loadingChildren: 'Loading, yo'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.equal(instance.getDOMNode().innerText, 'Loading, yo');
  });
});