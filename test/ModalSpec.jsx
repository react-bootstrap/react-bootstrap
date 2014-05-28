/** @jsx React.DOM */
/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Modal          = require('../cjs/Modal');

describe('Modal', function () {

  it('Should render the modal content', function() {
    var instance = ReactTestUtils.renderIntoDocument(Modal({
      onRequestHide: function () {}
    }, <strong>Message</strong>));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should close the modal when the backdrop is clicked', function (done) {
    var instance = ReactTestUtils.renderIntoDocument(Modal({
      onRequestHide: function() { done(); }
    }, <strong>Message</strong>));

    var backdrop = instance.getDOMNode().getElementsByClassName('modal-backdrop')[0];
    ReactTestUtils.Simulate.click(backdrop);
  });

  it('Should close the modal when the modal background is clicked', function (done) {
    var instance = ReactTestUtils.renderIntoDocument(Modal({
      onRequestHide: function() { done(); }
    }, <strong>Message</strong>));

    var backdrop = instance.getDOMNode().getElementsByClassName('modal')[0];
    ReactTestUtils.Simulate.click(backdrop);
  });

});
