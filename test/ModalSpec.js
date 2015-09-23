import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Modal from '../src/Modal';
import { render, shouldWarn } from './helpers';

describe('Modal', () => {
  let mountPoint;

  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });

  afterEach(() => {
    React.unmountComponentAtNode(mountPoint);
    document.body.removeChild(mountPoint);
  });

  it('Should render the modal content', () => {
    let noOp = () => {};
    let instance = render(
      <Modal show onHide={noOp} animation={false}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance.refs.modal, 'strong'));
  });

  it('Should add modal-open class to the modal container while open', (done) => {

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

    setTimeout(() => {
      assert.equal(React.findDOMNode(instance).className.length, 0);
      done();
    }, 0);

  });

  it('Should close the modal when the backdrop is clicked', (done) => {
    let doneOp = () => { done(); };
    let instance = render(
      <Modal show onHide={doneOp} animation={false}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let backdrop = React.findDOMNode(instance.refs.backdrop);

    ReactTestUtils.Simulate.click(backdrop);
  });

  it('Should close the modal when the modal dialog is clicked', (done) => {
    let doneOp = () => { done(); };

    let instance = render(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = React.findDOMNode(instance.refs.dialog);

    ReactTestUtils.Simulate.click(dialog);
  });

  it('Should not close the modal when the "static" backdrop is clicked', () => {
    let onHideSpy = sinon.spy();
    let instance = render(
      <Modal show onHide={onHideSpy} backdrop='static'>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let backdrop = React.findDOMNode(instance.refs.backdrop);

    ReactTestUtils.Simulate.click(backdrop);

    expect(onHideSpy).to.not.have.been.called;
  });

  it('Should close the modal when the modal close button is clicked', (done) => {
    let doneOp = () => { done(); };

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

  it('Should pass className to the dialog', () => {
    let noOp = () => {};
    let instance = render(
      <Modal show className='mymodal' onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = React.findDOMNode(instance.refs.dialog);

    assert.ok(dialog.className.match(/\bmymodal\b/));
  });

  it('Should use bsClass on the dialog', () => {
    let noOp = () => {};
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

  it('Should pass bsSize to the dialog', () => {
    let noOp = () => {};
    let instance = render(
      <Modal show bsSize='small' onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = React.findDOMNode(instance.refs.modal).getElementsByClassName('modal-dialog')[0];
    assert.ok(dialog.className.match(/\bmodal-sm\b/));
  });

  it('Should pass dialogClassName to the dialog', () => {
    let noOp = () => {};
    let instance = render(
      <Modal show dialogClassName="testCss" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.modal, 'modal-dialog');
    assert.match(dialog.props.className, /\btestCss\b/);
  });

  it('Should assign refs correctly when no backdrop', () => {

    let test = () => render(
      <Modal show backdrop={false} onHide={() => {}}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    expect(test).not.to.throw();
  });

  it('Should use dialogComponent', () => {
    let noOp = () => {};

    class CustomDialog {
      render() { return <div {...this.props}/>; }
    }

    let instance = render(
      <Modal show dialogComponent={CustomDialog} onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    assert.ok(instance.refs.dialog instanceof CustomDialog);
  });

  it('Should pass transition callbacks to Transition', (done) => {
    let count = 0;
    let increment = ()=> count++;

    let instance = render(
      <Modal show
        onHide={() => {}}
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

  it('Should unbind listeners when unmounted', () => {
    render(
        <div>
          <Modal show onHide={() => null} animation={false}>
            <strong>Foo bar</strong>
          </Modal>
        </div>
    , mountPoint);

    assert.include(document.body.className, 'modal-open');

    render(<div />, mountPoint);

    assert.notInclude(document.body.className, 'modal-open');
  });

  describe('Focused state', () => {
    let focusableContainer = null;

    beforeEach(() => {
      focusableContainer = document.createElement('div');
      focusableContainer.tabIndex = 0;
      document.body.appendChild(focusableContainer);
      focusableContainer.focus();
    });

    afterEach(() => {
      React.unmountComponentAtNode(focusableContainer);
      document.body.removeChild(focusableContainer);
    });

    it('Should focus on the Modal when it is opened', () => {

      document.activeElement.should.equal(focusableContainer);

      let instance = render(
        <Modal show onHide={() => {}} animation={false}>
          <strong>Message</strong>
        </Modal>
        , focusableContainer);

      document.activeElement.className.should.contain('modal');

      instance.renderWithProps({ show: false });

      document.activeElement.should.equal(focusableContainer);
    });


    it('Should not focus on the Modal when autoFocus is false', () => {
      render(
        <Modal show autoFocus={false} onHide={() => {}} animation={false}>
          <strong>Message</strong>
        </Modal>
        , focusableContainer);

      document.activeElement.should.equal(focusableContainer);
    });

    it('Should not focus Modal when child has focus', () => {

      document.activeElement.should.equal(focusableContainer);

      render(
        <Modal show onHide={() => {}} animation={false}>
          <input autoFocus />
        </Modal>
        , focusableContainer);

      let input = document.getElementsByTagName('input')[0];

      document.activeElement.should.equal(input);
    });
  });

});
