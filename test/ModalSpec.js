import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Modal from '../src/Modal';
import { render, shouldWarn } from './helpers';

describe('Modal', function () {
  let mountPoint;

  beforeEach(()=>{
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });

  afterEach(function () {
    React.unmountComponentAtNode(mountPoint);
    document.body.removeChild(mountPoint);
  });

  it('Should render the modal content', function() {
    let noOp = function () {};
    let instance = render(
      <Modal show onHide={noOp} animation={false}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance.refs.modal, 'strong'));
  });

  it('Should add modal-open class to the modal container while open', function(done) {

    let Container = React.createClass({
      getInitialState() {
        return { modalOpen: true };
      },
      handleCloseModal() {
        this.setState({ modalOpen: false });
      },
      render() {
        return (
          <div>
            <Modal
              animation={false}
              show={this.state.modalOpen}
              onHide={this.handleCloseModal}
              container={this}
            >
              <strong>Message</strong>
            </Modal>
          </div>
        );
      }
    });

    let instance = render(
          <Container />
        , mountPoint);

    let modal = ReactTestUtils.findRenderedComponentWithType(instance, Modal);

    assert.ok(React.findDOMNode(instance).className.match(/\bmodal-open\b/));

    let backdrop = React.findDOMNode(modal.refs.backdrop);

    ReactTestUtils.Simulate.click(backdrop);

    setTimeout(function(){
      assert.equal(React.findDOMNode(instance).className.length, 0);
      done();
    }, 0);

  });

  it('Should close the modal when the backdrop is clicked', function (done) {
    let doneOp = function () { done(); };
    let instance = render(
      <Modal show onHide={doneOp} animation={false}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let backdrop = React.findDOMNode(instance.refs.backdrop);

    ReactTestUtils.Simulate.click(backdrop);
  });

  it('Should close the modal when the modal dialog is clicked', function (done) {
    let doneOp = function () { done(); };

    let instance = render(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = React.findDOMNode(instance.refs.dialog);

    ReactTestUtils.Simulate.click(dialog);
  });

  it('Should close the modal when the modal close button is clicked', function (done) {
    let doneOp = function () { done(); };

    let instance = render(
      <Modal show onHide={doneOp}>
        <Modal.Header closeButton />
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let button = React.findDOMNode(instance.refs.modal)
        .getElementsByClassName('close')[0];

    ReactTestUtils.Simulate.click(button);
  });

  it('Should use bsClass on the dialog', function () {
    let noOp = function () {};
    let instance = render(
      <Modal show bsClass='mymodal' onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = React.findDOMNode(instance.refs.dialog);
    let backdrop = React.findDOMNode(instance.refs.backdrop);

    assert.ok(dialog.className.match(/\bmymodal\b/));
    assert.ok(dialog.children[0].className.match(/\bmymodal-dialog\b/));
    assert.ok(dialog.children[0].children[0].className.match(/\bmymodal-content\b/));

    assert.ok(backdrop.className.match(/\bmymodal-backdrop\b/));


    shouldWarn("Invalid prop 'bsClass' of value 'mymodal'");
  });

  it('Should pass bsSize to the dialog', function () {
    let noOp = function () {};
    let instance = render(
      <Modal show bsSize='small' onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = React.findDOMNode(instance.refs.modal).getElementsByClassName('modal-dialog')[0];
    assert.ok(dialog.className.match(/\bmodal-sm\b/));
  });

  it('Should find nested Refs', function () {
    let noOp = function () {};
    let headerMsg = 'Header Message';
    let titleMsg = 'Title Message';
    let bodyMsg = 'Body Message';
    let footerMsg = 'Footer Message';
    let Xxx = React.createClass({
      render(){
        return (
          <div>
            <Modal show bsSize='small' onHide={noOp} ref='modal'>
              <Modal.Header ref="header">
                <Modal.Title ref="title">
                  <strong ref='titleMsg'>{titleMsg}</strong>
                </Modal.Title>
                <strong ref='headerMsg'>{headerMsg}</strong>
              </Modal.Header>
              <Modal.Body ref='body'>
                <strong ref='bodyMsg'>{bodyMsg}</strong>
              </Modal.Body>
              <Modal.Footer ref='footer'>
                <strong ref='footerMsg'>{footerMsg}</strong>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
    });
    let instance = render(
      <Xxx/>
    , mountPoint);

    assert.ok(instance.refs.modal.refs.header.refs.headerMsg.props.children.match(headerMsg));
    assert.ok(instance.refs.modal.refs.header.refs.title.refs.titleMsg.props.children.match(titleMsg));
    assert.ok(instance.refs.modal.refs.body.refs.bodyMsg.props.children.match(bodyMsg));
    assert.ok(instance.refs.modal.refs.footer.refs.footerMsg.props.children.match(footerMsg));
  });

  it('Should pass dialogClassName to the dialog', function () {
    let noOp = function () {};
    let instance = render(
      <Modal show dialogClassName="testCss" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.modal, 'modal-dialog');
    assert.match(dialog.props.className, /\btestCss\b/);
  });

  it('Should pass transition callbacks to Transition', function (done) {
    let count = 0;
    let increment = ()=> count++;

    let instance = render(
      <Modal show
        onHide={()=>{}}
        onExit={increment}
        onExiting={increment}
        onExited={()=> {
          increment();
          expect(count).to.equal(6);
          done();
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={()=> {
          increment();
          instance.setProps({ show: false });
        }}
      >
        <strong>Message</strong>
      </Modal>
      , mountPoint);
  });

  describe('Focused state', function () {
    let focusableContainer = null;

    beforeEach(()=>{
      focusableContainer = document.createElement('div');
      focusableContainer.tabIndex = 0;
      document.body.appendChild(focusableContainer);
      focusableContainer.focus();
    });

    afterEach(function () {
      React.unmountComponentAtNode(focusableContainer);
      document.body.removeChild(focusableContainer);
    });

    it('Should focus on the Modal when it is opened', function () {

      document.activeElement.should.equal(focusableContainer);

      let instance = render(
        <Modal show onHide={()=>{}} animation={false}>
          <strong>Message</strong>
        </Modal>
        , focusableContainer);

      document.activeElement.className.should.contain('modal');

      instance.renderWithProps({ show: false });

      document.activeElement.should.equal(focusableContainer);
    });


    it('Should not focus on the Modal when autoFocus is false', function () {
      render(
        <Modal show autoFocus={false} onHide={()=>{}} animation={false}>
          <strong>Message</strong>
        </Modal>
        , focusableContainer);

      document.activeElement.should.equal(focusableContainer);
    });

    it('Should not focus Modal when child has focus', function () {

      document.activeElement.should.equal(focusableContainer);

      render(
        <Modal show onHide={()=>{}} animation={false}>
          <input autoFocus />
        </Modal>
        , focusableContainer);

      let input = document.getElementsByTagName('input')[0];

      document.activeElement.should.equal(input);
    });
  });

});
