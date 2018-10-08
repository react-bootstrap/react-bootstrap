import events from 'dom-helpers/events';
import React from 'react';
import { mount } from 'enzyme';

import Modal from '../src/Modal';

describe('<Modal>', () => {
  afterEach(() => {
    // make sure the dangling portal elements get cleaned up
    document.body.innerHTML = '';
  });

  it('Should render the modal content', () => {
    const noOp = () => {};
    mount(
      <Modal show onHide={noOp} animation={false}>
        <strong>Message</strong>
      </Modal>,
    )
      .find('strong')
      .text()
      .should.equal('Message');
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
      .find('div.modal') // the modal-dialog element is pointer-events: none;
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
    ).assertSingle('div.modal.mymodal');
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
    ).find('.modal-dialog.modal-sm');
  });

  it('Should pass dialog style to the dialog', () => {
    const noOp = () => {};
    const dialog = mount(
      <Modal show style={{ color: 'red' }} onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )
      .find('div.modal')
      .getDOMNode();

    assert.ok(dialog.style.color === 'red');
  });

  it('Should pass dialogClassName to the dialog', () => {
    const noOp = () => {};
    mount(
      <Modal show dialogClassName="my-dialog" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    ).assertSingle('.modal-dialog.my-dialog');
  });

  it('Should use dialogAs', () => {
    const noOp = () => {};

    function CustomDialog() {
      return <div className="custom-dialog" tabIndex="-1" />;
    }

    mount(
      <Modal show dialogAs={CustomDialog} onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    ).assertSingle('.custom-dialog');
  });

  it('Should pass transition callbacks to Transition', done => {
    let count = 0;
    const increment = () => {
      ++count;
    };

    const instance = mount(
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
          instance.setProps({ show: false });
        }}
      >
        <strong>Message</strong>
      </Modal>,
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

      const instance = mount(<Component />);
      instance.setState({ show: false });

      expect(offSpy).to.have.been.calledWith(window, 'resize');
    });
  });
});
