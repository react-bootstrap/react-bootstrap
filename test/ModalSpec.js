import events from 'dom-helpers/events';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Modal from '../src/Modal';

import { render } from './helpers';

describe('Modal', () => {
  let mountPoint;

  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(mountPoint);
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
      ReactTestUtils.findRenderedDOMComponentWithTag(instance._modal, 'strong'));
  });

  it('Should close the modal when the modal dialog is clicked', (done) => {
    let doneOp = () => { done(); };

    let instance = render(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);


    let dialog = ReactDOM.findDOMNode(instance._modal);

    ReactTestUtils.Simulate.click(dialog);
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    let onHideSpy = sinon.spy();
    let instance = render(
      <Modal show onHide={onHideSpy} backdrop="static">
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = ReactDOM.findDOMNode(instance._modal);

    ReactTestUtils.Simulate.click(dialog);

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

    let button = ReactDOM.findDOMNode(instance._modal)
        .getElementsByClassName('close')[0];

    ReactTestUtils.Simulate.click(button);
  });

  it('Should pass className to the dialog', () => {
    let noOp = () => {};
    let instance = render(
      <Modal show className="mymodal" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = ReactDOM.findDOMNode(instance._modal);

    assert.ok(dialog.className.match(/\bmymodal\b/));
  });

  it('Should use bsClass on the dialog', () => {
    let noOp = () => {};
    let instance = render(
      <Modal show bsClass="mymodal" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let modal = ReactDOM.findDOMNode(instance._modal);

    assert.ok(modal.className.match(/\bmymodal\b/));
    assert.ok(modal.children[0].className.match(/\bmymodal-dialog\b/));
    assert.ok(modal.children[0].children[0].className.match(/\bmymodal-content\b/));
    assert.ok(instance._backdrop.className.match(/\bmymodal-backdrop\b/));
  });

  it('Should pass bsSize to the dialog', () => {
    let noOp = () => {};
    let instance = render(
      <Modal show bsSize="small" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = ReactDOM.findDOMNode(instance._modal).getElementsByClassName('modal-dialog')[0];

    assert.ok(dialog.className.match(/\bmodal-sm\b/));

  });

  it('Should pass dialogClassName to the dialog', () => {
    let noOp = () => {};
    let instance = render(
      <Modal show dialogClassName="testCss" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    let dialog = ReactTestUtils.findRenderedDOMComponentWithClass(instance._modal, 'modal-dialog');

    assert.ok(dialog.className.match(/\btestCss\b/));
  });

  it('Should use dialogComponent', () => {
    let noOp = () => {};

    class CustomDialog extends React.Component {
      render() { return <div {...this.props}/>; }
    }

    let instance = render(
      <Modal show dialogComponent={CustomDialog} onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    , mountPoint);

    assert.ok(instance._modal instanceof CustomDialog);
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
          instance.renderWithProps({ show: false });
        }}
      >
        <strong>Message</strong>
      </Modal>
      , mountPoint);
  });

  describe('cleanup', () => {
    let offSpy;

    beforeEach(() => {
      offSpy = sinon.spy(events, 'off');
    });

    afterEach(() => {
      events.off.restore();
    });

    it('should remove resize listener when unmounted', () => {
      class Component extends React.Component {
        constructor(props, context) {
          super(props, context);

          this.state = {
            show: true,
          };
        }

        render() {
          if (!this.state.show) {
            return null;
          }

          return (
            <Modal show>Foo</Modal>
          );
        }
      }

      const instance = render(<Component />, mountPoint);
      instance.setState({ show: false });

      expect(offSpy).to.have.been.calledWith(window, 'resize');
    });
  });
});
