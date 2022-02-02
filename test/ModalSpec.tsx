import * as React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import ModalManager from '@restart/ui/ModalManager';
import Modal, { ModalProps } from '../src/Modal';

describe('<Modal>', () => {
  afterEach(cleanup);

  it('Should forward ref to BaseModal', () => {
    const noOp = () => {};
    const ref = React.createRef<ModalProps>();
    render(
      <Modal show onHide={noOp} animation={false} ref={ref}>
        <strong>Message</strong>
      </Modal>,
    );
    ref.current.dialog.should.exist;
  });

  it('Should render the modal content', () => {
    const noOp = () => {};
    const { getByTestId } = render(
      <Modal show onHide={noOp} animation={false} data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    )
    
    expect(getByTestId('modal').querySelector('strong').textContent).to.equal('Message')
  });

  it('Should sets `display: block` to `div.modal` when animation is false', () => {
    const ref = React.createRef<ModalProps>();
    render(
      <Modal show animation={false} ref={ref}>
        <strong>Message</strong>
      </Modal>,
    )

    expect(ref.current.dialog.style.display).to.equal('block');
  });

  it('Should close the modal when the modal dialog is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    const { getByRole } = render(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>,
    )

    // the modal-dialog element is pointer-events: none;
    fireEvent.click(getByRole('dialog'));
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onHideSpy = sinon.spy();
    const { getByTestId } = render(
      <Modal show onHide={onHideSpy} backdrop="static" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    )

    fireEvent.click(getByTestId('modal'));
    expect(onHideSpy).to.not.have.been.called;
  });

  it('Should show "static" dialog animation when backdrop is clicked', () => {
    const noOp = () => {};
    const { getByRole } = render(
      <Modal show onHide={noOp} backdrop="static">
        <strong>Message</strong>
      </Modal>,
    );

    const modalDialog = getByRole('dialog');
    fireEvent.click(modalDialog);
    getByRole('dialog').classList.contains('modal-static').should.be.true;
  });

  it('Should show "static" dialog animation when esc pressed and keyboard is false', () => {
    const noOp = () => {};
    const { getByRole } = render(
      <Modal show onHide={noOp} backdrop="static" keyboard={false}>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27
    });
    getByRole('dialog').classList.contains('modal-static').should.be.true;
  });

  it('Should not show "static" dialog animation when esc pressed and keyboard is true', () => {
    const noOp = () => {};
    const { getByRole } = render(
      <Modal show onHide={noOp} backdrop="static" keyboard>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27
    });
    getByRole('dialog').classList.contains('modal-static').should.be.false;
  });

  it('Should not show "static" dialog animation modal backdrop is not "static"', () => {
    const noOp = () => {};
    const { getByTestId, getByRole } = render(
      <Modal show onHide={noOp} backdrop data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.click(getByTestId('modal'));
    getByRole('dialog').classList.contains('modal-static').should.be.false;
  });

  it('Should close the modal when the modal close button is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    const { getByTestId } = render(
      <Modal show onHide={doneOp}>
        <Modal.Header closeButton data-testid="close-btn"/>
        <strong>Message</strong>
      </Modal>,
    )

    fireEvent.click(getByTestId('close-btn').querySelector('button'));
  });

  it('Should pass className to the dialog', () => {
    const noOp = () => {};
    const { getByRole } = render(
      <Modal show className="mymodal" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    );

    getByRole('dialog').classList.contains('mymodal').should.be.true;
  });

  it('Should use backdropClassName to add classes to the backdrop', () => {
    const noOp = () => {};

    render(
      <Modal show backdropClassName="my-modal-backdrop" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    );

    document.querySelector('.modal-backdrop').classList.contains('my-modal-backdrop').should.be.true;
  });

  it('Should pass size to the dialog', () => {
    const noOp = () => {};
    const { getByTestId } = render(
      <Modal show size="sm" onHide={noOp} data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    getByTestId('modal').classList.contains('modal-sm').should.be.true;
  });

  it('Should pass fullscreen as bool to the dialog', () => {
    const { getByTestId } = render(
      <Modal show fullscreen data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    )

    getByTestId('modal').classList.contains('modal-fullscreen').should.be.true;
  });

  it('Should pass fullscreen as string to the dialog', () => {
    const { getByTestId } = render(
      <Modal show fullscreen="sm-down" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    )

    getByTestId('modal').classList.contains('modal-fullscreen-sm-down').should.be.true;
  });

  it('Should pass centered to the dialog', () => {
    const noOp = () => {};
    const { getByTestId } = render(
      <Modal show centered onHide={noOp} data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    )

    getByTestId('modal').classList.contains('modal-dialog-centered').should.be.true;
  });

  it('Should pass scrollable to the dialog', () => {
    const noOp = () => {};
    const { getByTestId } = render(
      <Modal show scrollable onHide={noOp} data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    )

    getByTestId('modal').classList.contains('modal-dialog-scrollable').should.be.true;
  });

  it('Should pass dialog style to the dialog', () => {
    const noOp = () => {};
    const { getByRole } = render(
      <Modal show style={{ color: 'red' }} onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )

    assert.ok(getByRole('dialog').style.color === 'red');
  });

  it('Should pass dialogClassName to the dialog', () => {
    const noOp = () => {};
    const { getByTestId } = render(
      <Modal show dialogClassName="my-dialog" onHide={noOp} data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    )

    getByTestId('modal').classList.contains('my-dialog').should.be.true;
  });

  it('Should pass contentClassName to .modal-content', () => {
    const noOp = () => {};
    const { getByTestId } = render(
      <Modal show contentClassName="my-content" onHide={noOp} data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    const modalContent = getByTestId('modal').querySelector('.modal-content');
    modalContent.classList.contains('my-content').should.be.true;
  });

  it('Should use dialogAs', () => {
    const noOp = () => {};

    function CustomDialog() {
      return <div className="custom-dialog" tabIndex="-1" />;
    }

    render(
      <Modal show dialogAs={CustomDialog} onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    );

    document.querySelector('.custom-dialog').should.exist;
  });

  it('Should pass transition callbacks to Transition', (done) => {
    const increment = sinon.spy();
    const Elem = () => {
      const [show, setShow] = React.useState(true);
      return (
        <Modal
          show={show}
          onHide={() => {}}
          onEnter={increment}
          onEntering={increment}
          onEntered={() => {
            increment();
            setShow(false);
          }}
          onExit={increment}
          onExiting={increment}
          onExited={() => {
            increment();
            expect(increment.callCount).to.equal(6);
            done();
          }}
        >
          <strong>Message</strong>
        </Modal>
      );
    };

    render(<Elem />);
  });

  it('should call `transitionend` before `exited`', (done) => {
    const increment = sinon.spy();
    let modal;

    const { getByTestId, getByRole, rerender } = render(
      <Modal
        show
        data-testid="modal"
        style={{ transition: 'opacity 1s linear' }}
      >
        <strong>Message</strong>
      </Modal>,
    );
    modal = getByRole('dialog');
    modal.addEventListener('transitionend', increment);
    rerender(
      <Modal
        show={false}
        onExited={() => {
          expect(increment.callCount).to.equal(1);
          modal.removeEventListener('transitionend', increment);
          done();
        }}
      >Foo</Modal>
    );
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

      const { rerender } = render(<Component />);
      rerender(<Modal show={false}>Foo</Modal>)

      expect(offSpy).to.have.been.calledWith('resize');
    });
  });

  it('Should close once it was clicked outside of the Modal', () => {
    const onHideSpy = sinon.spy();
    const { getByRole } = render(
      <Modal show onHide={onHideSpy}>
        <strong>Message</strong>
      </Modal>,
    )
    
    fireEvent.click(getByRole('dialog'));
    expect(onHideSpy).to.have.been.called;
  });

  it('Should not call onHide if the click target comes from inside the dialog', () => {
    const onHideSpy = sinon.spy();
    const { getByTestId, getByRole } = render(
      <Modal show onHide={onHideSpy} data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.mouseDown(getByTestId('modal'));
    fireEvent.mouseUp(getByRole('dialog'));
    fireEvent.click(getByRole('dialog'));

    expect(onHideSpy).to.not.have.been.called;
  });

  it('Should set aria-labelledby to the role="dialog" element if aria-labelledby set', () => {
    const noOp = () => {};
    const { getByRole } = render(
      <Modal show onHide={noOp} aria-labelledby="modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>,
    );

    expect(getByRole('dialog').getAttribute('aria-labelledby')).to.equal('modal-title');
  });

  it('Should call onEscapeKeyDown when keyboard is true', () => {
    const noOp = () => {};
    const onEscapeKeyDownSpy = sinon.spy();
    const { getByRole } = render(
      <Modal show onHide={noOp} keyboard onEscapeKeyDown={onEscapeKeyDownSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27
    });

    expect(onEscapeKeyDownSpy).to.have.been.called;
  });

  it('Should not call onEscapeKeyDown when keyboard is false', () => {
    const noOp = () => {};
    const onEscapeKeyDownSpy = sinon.spy();
    const { getByRole } = render(
      <Modal
        show
        onHide={noOp}
        keyboard={false}
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27
    });

    expect(onEscapeKeyDownSpy).to.not.have.been.called;
  });

  it('Should use custom props manager if specified', (done) => {
    const noOp = () => {};

    class MyModalManager extends ModalManager {
      add() {
        done();
      }
    }

    const managerRef = React.createRef<ModalProps>();
    managerRef.current = new MyModalManager();

    render(
      <Modal show onHide={noOp} manager={managerRef.current}>
        <strong>Message</strong>
      </Modal>,
    );
  });
});
