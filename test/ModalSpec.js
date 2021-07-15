import { mount } from 'enzyme';
import * as React from 'react';
import ModalManager from 'react-overlays/ModalManager';
import Modal from '../src/Modal';

describe('<Modal>', () => {
  afterEach(() => {
    // make sure the dangling portal elements get cleaned up
    document.body.innerHTML = '';
  });

  it('Should forward ref to BaseModal', () => {
    const noOp = () => {};
    const ref = React.createRef();
    mount(
      <Modal show onHide={noOp} animation={false} ref={ref}>
        <strong>Message</strong>
      </Modal>,
    );
    ref.current.dialog.should.exist;
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

  it('Should sets `display: block` to `div.modal` when animation is false', () => {
    const node = mount(
      <Modal show animation={false}>
        <strong>Message</strong>
      </Modal>,
    )
      .find('div.modal')
      .getDOMNode();

    expect(node.style.display).to.equal('block');
  });

  it('Should close the modal when the modal dialog is clicked', (done) => {
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

  it('Should show "static" dialog animation when backdrop is clicked', () => {
    const noOp = () => {};
    const wrapper = mount(
      <Modal show onHide={noOp} backdrop="static">
        <strong>Message</strong>
      </Modal>,
    );

    const modal = wrapper.find('.modal');
    modal.simulate('click');

    expect(wrapper.find('.modal-static').length).to.equal(1);
  });

  it('Should show "static" dialog animation when esc pressed and keyboard is false', () => {
    const noOp = () => {};
    const wrapper = mount(
      <Modal show onHide={noOp} backdrop="static" keyboard={false}>
        <strong>Message</strong>
      </Modal>,
    );

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    document.dispatchEvent(event);
    wrapper.update();

    expect(wrapper.find('.modal-static').length).to.equal(1);
  });

  it('Should not show "static" dialog animation when esc pressed and keyboard is true', () => {
    const noOp = () => {};
    const wrapper = mount(
      <Modal show onHide={noOp} backdrop="static" keyboard>
        <strong>Message</strong>
      </Modal>,
    );

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    document.dispatchEvent(event);
    wrapper.update();

    expect(wrapper.find('.modal-static').length).to.equal(0);
  });

  it('Should not show "static" dialog animation modal backdrop is not "static"', () => {
    const noOp = () => {};
    const wrapper = mount(
      <Modal show onHide={noOp} backdrop>
        <strong>Message</strong>
      </Modal>,
    );

    const modal = wrapper.find('.modal');
    modal.simulate('click');

    expect(wrapper.find('.modal-static').length).to.equal(0);
  });

  it('Should close the modal when the modal close button is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    mount(
      <Modal show onHide={doneOp}>
        <Modal.Header closeButton />
        <strong>Message</strong>
      </Modal>,
    )
      .find('.btn-close')
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

  it('Should pass fullscreen as bool to the dialog', () => {
    mount(
      <Modal show fullscreen>
        <strong>Message</strong>
      </Modal>,
    ).assertSingle('.modal-dialog.modal-fullscreen');
  });

  it('Should pass fullscreen as string to the dialog', () => {
    mount(
      <Modal show fullscreen="sm-down">
        <strong>Message</strong>
      </Modal>,
    ).assertSingle('.modal-dialog.modal-fullscreen-sm-down');
  });

  it('Should pass centered to the dialog', () => {
    const noOp = () => {};
    mount(
      <Modal show centered onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    ).find('.modal-dialog.modal-dialog-centered');
  });

  it('Should pass scrollable to the dialog', () => {
    const noOp = () => {};
    mount(
      <Modal show scrollable onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    ).find('.modal-dialog.modal-dialog-scrollable');
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

  it('Should pass contentClassName to .modal-content', () => {
    const noOp = () => {};
    mount(
      <Modal show contentClassName="my-content" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    ).assertSingle('.modal-content.my-content');
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

  it('Should pass transition callbacks to Transition', (done) => {
    const increment = sinon.spy();

    const instance = mount(
      <Modal
        show
        onHide={() => {}}
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
          expect(increment.callCount).to.equal(6);
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

  it('should call `transitionend` before `exited`', (done) => {
    const increment = sinon.spy();
    let modal;

    const instance = mount(
      <Modal
        show
        style={{ transition: 'opacity 1s linear' }}
        onExited={() => {
          expect(increment.callCount).to.equal(1);
          modal.removeEventListener('transitionend', increment);
          done();
        }}
      >
        <strong>Message</strong>
      </Modal>,
    );
    modal = instance.find('.modal').getDOMNode();
    modal.addEventListener('transitionend', increment);
    instance.setProps({ show: false });
  });

  describe('cleanup', () => {
    let offSpy;

    beforeEach(() => {
      offSpy = sinon.spy(window, 'removeEventListener');
    });

    afterEach(() => {
      offSpy.restore();
    });

    it('should remove resize listener when unmounted', () => {
      class Component extends React.Component {
        state = {
          show: true,
        };

        render() {
          if (!this.state.show) {
            return null;
          }

          return <Modal show>Foo</Modal>;
        }
      }

      const instance = mount(<Component />);
      instance.setState({ show: false });

      expect(offSpy).to.have.been.calledWith('resize');
    });
  });

  it('Should close once it was clicked outside of the Modal', () => {
    const onHideSpy = sinon.spy();
    mount(
      <Modal show onHide={onHideSpy}>
        <strong>Message</strong>
      </Modal>,
    )
      .find('div.modal.show')
      .simulate('click');

    expect(onHideSpy).to.have.been.called;
  });

  it('Should not call onHide if the click target comes from inside the dialog', () => {
    const onHideSpy = sinon.spy();
    const wrapper = mount(
      <Modal show onHide={onHideSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    wrapper.find('div.modal-dialog').simulate('mouseDown');
    wrapper.find('div.modal.show').simulate('mouseUp');
    wrapper.find('div.modal.show').simulate('click');

    expect(onHideSpy).to.not.have.been.called;
  });

  it('Should set aria-labelledby to the role="dialog" element if aria-labelledby set', () => {
    const noOp = () => {};
    const wrapper = mount(
      <Modal show onHide={noOp} aria-labelledby="modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>,
    );
    wrapper.assertSingle(
      'div.modal.show[role="dialog"][aria-labelledby="modal-title"]',
    );
  });

  it('Should call onEscapeKeyDown when keyboard is true', () => {
    const noOp = () => {};
    const onEscapeKeyDownSpy = sinon.spy();
    mount(
      <Modal show onHide={noOp} keyboard onEscapeKeyDown={onEscapeKeyDownSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    document.dispatchEvent(event);

    expect(onEscapeKeyDownSpy).to.have.been.called;
  });

  it('Should not call onEscapeKeyDown when keyboard is false', () => {
    const noOp = () => {};
    const onEscapeKeyDownSpy = sinon.spy();
    mount(
      <Modal
        show
        onHide={noOp}
        keyboard={false}
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Modal>,
    );

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    document.dispatchEvent(event);

    expect(onEscapeKeyDownSpy).to.not.have.been.called;
  });

  it('Should use custom props manager if specified', (done) => {
    const noOp = () => {};

    class MyModalManager extends ModalManager {
      add() {
        done();
      }
    }

    const managerRef = React.createRef();
    managerRef.current = new MyModalManager();

    mount(
      <Modal show onHide={noOp} manager={managerRef.current}>
        <strong>Message</strong>
      </Modal>,
    );
  });
});
