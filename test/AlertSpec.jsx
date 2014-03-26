/** @jsx React.DOM */
/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Alert          = require('../cjs/Alert');

describe('Alert', function () {
  it('Should output a alert with message', function () {
    var instance = ReactTestUtils.renderIntoDocument(Alert({}, <strong>Message</strong>));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have bsType by default', function () {
    var instance = ReactTestUtils.renderIntoDocument(Alert({}, 'Message'));
    assert.ok(instance.getDOMNode().className.match(/\balert\b/));
  });

  it('Should have dismissable style with onDismiss', function () {
    var instance = ReactTestUtils.renderIntoDocument(Alert({
          onDismiss: function () {}
        }, 'Message'));
    assert.ok(instance.getDOMNode().className.match(/\balert-dismissable\b/));
  });

  it('Should call onDismiss callback on dismiss click', function (done) {
    var instance = ReactTestUtils.renderIntoDocument(Alert({
          onDismiss: function () {
            done();
          }
        }, 'Message'));

    ReactTestUtils.Simulate.click(instance.getDOMNode().children[0]);
  });

  it('Should call onDismiss callback on dismissAfter time', function (done) {
    ReactTestUtils.renderIntoDocument(
      Alert({
        onDismiss: function () {
          done();
        },
        dismissAfter: 1
      }, 'Message')
    );
  });

  it('Should have a default bsStyle class', function () {
    var instance = ReactTestUtils.renderIntoDocument(Alert({}, 'Message'));

    assert.ok(instance.getDOMNode().className.match(/\balert-\w+\b/));
  });

  it('Should have use bsStyle class', function () {
    var instance = ReactTestUtils.renderIntoDocument(Alert({bsStyle: 'danger'}, 'Message'));

    assert.ok(instance.getDOMNode().className.match(/\balert-danger\b/));
  });
});