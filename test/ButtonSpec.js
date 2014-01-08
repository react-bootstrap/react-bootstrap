/*global describe, beforeEach, afterEach, it, assert */

var React = require('react/addons');
var Button = require('../lib/Button');

var ReactTestUtils;

describe('Button', function () {
  beforeEach(function() {
    ReactTestUtils = React.addons.ReactTestUtils;
  });

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
    var instance = Button({disabled: true}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.equal(instance.getDOMNode().getAttribute('disabled'), 'true');
  });

  it('Should have the default class', function () {
    var instance = Button({'default': true}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-default\b/));
  });

  it('Should have the primary class', function () {
    var instance = Button({'primary': true}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-primary\b/));
  });

  it('Should have the default class', function () {
    var instance = Button({'primary': true}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-primary\b/));
  });
});