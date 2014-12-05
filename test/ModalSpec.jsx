/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Modal          = require('../cjs/Modal');

describe('Modal', function () {

  it('Should render the modal content', function() {
    var noOp = function () {};
    var instance = ReactTestUtils.renderIntoDocument(
      <Modal onRequestHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should close the modal when the backdrop is clicked', function (done) {
    var doneOp = function () { done(); };
    var instance = ReactTestUtils.renderIntoDocument(
      <Modal onRequestHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    );

    var backdrop = instance.getDOMNode().getElementsByClassName('modal-backdrop')[0];
    ReactTestUtils.Simulate.click(backdrop);
  });

  it('Should close the modal when the modal background is clicked', function (done) {
    var doneOp = function () { done(); };
    var instance = ReactTestUtils.renderIntoDocument(
      <Modal onRequestHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    );

    var backdrop = instance.getDOMNode().getElementsByClassName('modal')[0];
    ReactTestUtils.Simulate.click(backdrop);
  });

  it('Should pass bsSize to the dialog', function () {
    var noOp = function () {};
    var instance = ReactTestUtils.renderIntoDocument(
      <Modal bsSize='small' onRequestHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    var dialog = instance.getDOMNode().getElementsByClassName('modal-dialog')[0];
    assert.ok(dialog.className.match(/\bmodal-sm\b/));
  });

});
