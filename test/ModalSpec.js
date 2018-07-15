import events from 'dom-helpers/events';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Modal from '../src/Modal';

import { render } from './helpers';

describe('<Modal>', () => {
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
    const noOp = () => {};
    const instance = mount(
      <Modal show onHide={noOp} animation={false}>
        <strong>Message</strong>
      </Modal>,
    ).instance();

    assert.ok(instance._modal.dialog.querySelector('strong'));
  });

  it('Should close the modal when the modal dialog is clicked', done => {
    const doneOp = () => {
      done();
    };

    mount(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>,
    )
      .find('ModalDialog')
      .simulate('click');
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onHideSpy = sinon.spy();
    mount(
      <Modal show onHide={onHideSpy} backdrop="static">
        <strong>Message</strong>
      </Modal>,
    )
      .find('ModalDialog')
      .simulate('click');

    expect(onHideSpy).to.not.have.been.called;
  });

  it('Should close the modal when the modal close button is clicked', done => {
    const doneOp = () => {
      done();
    };

    mount(
      <Modal show onHide={doneOp}>
        <Modal.Header closeButton />
        <strong>Message</strong>
      </Modal>,
    )
      .find('.close')
      .simulate('click');
  });

  it('Should pass className to the dialog', () => {
    const noOp = () => {};
    mount(
      <Modal show className="mymodal" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    ).assertSingle('ModalDialog.mymodal');
  });

  it('Should use backdropClassName to add classes to the backdrop', () => {
    const noOp = () => {};

    mount(
      <Modal show backdropClassName="my-modal-backdrop" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    ).find('.modal-backdrop.my-modal-backdrop');
  });

  it('Should pass size to the dialog', () => {
    const noOp = () => {};
    mount(
      <Modal show size="sm" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    ).find('.modal-sm');
  });

  it('Should pass dialog style to the dialog', () => {
    const noOp = () => {};
    const dialog = mount(
      <Modal show style={{ color: 'red' }} onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
      { attachTo: mountPoint },
    )
      .find('.modal-dialog')
      .getDOMNode();

    assert.ok(dialog.style.color === 'red');
  });

  it('Should pass dialogClassName to the dialog', () => {
    const noOp = () => {};
    mount(
      <Modal show dialogClassName="my-dialog" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    ).assertSingle('modal-dialog.my-dialog');
  });

  it('Should use dialogComponentClass', () => {
    const noOp = () => {};

    function CustomDialog() {
      return <div className="custom-dialog" tabIndex="-1" />;
    }

    const instance = render(
      <Modal show dialogComponentClass={CustomDialog} onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
      mountPoint,
    );

    assert.equal(instance._modal.dialog.className, 'custom-dialog');
  });

  it('Should pass transition callbacks to Transition', done => {
    let count = 0;
    const increment = () => {
      ++count;
    };

    const instance = render(
      <Modal
        show
        onHide={() => {}}
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
          expect(count).to.equal(6);
          done();
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={() => {
          increment();
          instance.renderWithProps({ show: false });
        }}
      >
        <strong>Message</strong>
      </Modal>,
      mountPoint,
    );
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

          return <Modal show>Foo</Modal>;
        }
      }

      const instance = render(<Component />, mountPoint);
      instance.setState({ show: false });

      expect(offSpy).to.have.been.calledWith(window, 'resize');
    });
  });
});
