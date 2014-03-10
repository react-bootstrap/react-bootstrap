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
    var instance = Button({disabled: true}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().disabled);
  });

  it('Should be disabled link', function () {
    var instance = Button({disabled: true, href:'#'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bdisabled\b/));
  });

  it('Should have block class', function () {
    var instance = Button({block: true}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-block\b/));
  });

  it('Should apply bsStyle class', function () {
    var instance = Button({bsStyle: 'danger'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbtn-danger\b/));
  });

  it('Should default to bsStyle="default"', function () {
    var instance = Button({bsStyle: 'default'}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.equal(instance.props.bsStyle, 'default');
  });

  it('Should be active', function () {
    var instance = Button({active: true}, 'Title');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bactive\b/));
  });
});