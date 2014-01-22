/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React = require('react/addons');
var Alert = require('../lib/Alert');

var ReactTestUtils;

describe('Alert', function () {
  beforeEach(function() {
    ReactTestUtils = React.addons.ReactTestUtils;
  });

  it('Should output a alert with message', function () {
    var instance = Alert({}, <strong>Message</strong>);
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have bsType by default', function () {
    var instance = Alert({}, 'Message');
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\balert\b/));
  });

  it('Should have dismissable style with onDismiss', function () {
    var instance = Alert({
      onDismiss: function () {}
    }, 'Message');
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\balert-dismissable\b/));
  });

  it('Should call onDismiss callback on dismiss click', function (done) {
    var instance = Alert({
      onDismiss: function () {
        done();
      }
    }, 'Message');
    ReactTestUtils.renderIntoDocument(instance);

    ReactTestUtils.Simulate.click(instance.getDOMNode().children[0]);
  });

  it('Should call onDismiss callback on dismissAfter time', function (done) {
    var instance = Alert({
      onDismiss: function () {
        done();
      },
      dismissAfter: 1
    }, 'Message');
    ReactTestUtils.renderIntoDocument(instance);
  });

  it('Should have a default bsStyle class', function () {
    var instance = Alert({}, 'Message');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\balert-\w+\b/));
  });

  it('Should have use bsStyle class', function () {
    var instance = Alert({bsStyle: 'danger'}, 'Message');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\balert-danger\b/));
  });
});