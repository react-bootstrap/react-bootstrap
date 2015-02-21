/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Modal          = require('../lib/Modal');

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

  it('Should add modal-open class to the modal container while open', function(done) {

    var Container = React.createClass({
      getInitialState: function() {
        return {modalOpen: true};
      },
      handleCloseModal: function() {
        this.setState({modalOpen: false});
      },
      render: function() {
        if (this.state.modalOpen) {
          return <Modal onRequestHide={this.handleCloseModal} container={this}>
            <strong>Message</strong>
          </Modal>;
        } else {
          return <span/>;
        }
      }
    });
    var instance = ReactTestUtils.renderIntoDocument(
        <Container />
    );
    assert.ok(instance.getDOMNode().className.match(/\modal-open\b/));

    var backdrop = instance.getDOMNode().getElementsByClassName('modal-backdrop')[0];
    ReactTestUtils.Simulate.click(backdrop);
    setTimeout(function(){
      assert.equal(instance.getDOMNode().className.length, 0);
      done();
    }, 0);

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

  it('Should pass bsStyle to the header', function () {
    var noOp = function () {};
    var instance = ReactTestUtils.renderIntoDocument(
      <Modal bsStyle='danger' title="Title" onRequestHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    var header = instance.getDOMNode().getElementsByClassName('modal-header')[0];
    assert.ok(header.className.match(/\bbg-danger\b/));
    assert.ok(header.className.match(/\btext-danger\b/));
  });

});
