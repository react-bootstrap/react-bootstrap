import * as React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { fireEvent, render } from '@testing-library/react';
import ModalManager from '@restart/ui/ModalManager';
import Modal, { ModalProps } from '../src/Modal';

describe('<Modal>', () => {
  it('Should forward ref to BaseModal', () => {
    const ref = React.createRef<ModalProps>();
    render(
      <Modal show animation={false} ref={ref}>
        <strong>Message</strong>
      </Modal>,
    );
    ref.current!.dialog.should.exist;
  });

  it('Should render the modal content', () => {
    const { getByTestId } = render(
      <Modal show animation={false} data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    expect(getByTestId('modal').querySelector('strong')!.textContent).to.equal(
      'Message',
    );
  });

  it('Should sets `display: block` to `div.modal` when animation is false', () => {
    const ref = React.createRef<ModalProps>();
    render(
      <Modal show animation={false} ref={ref}>
        <strong>Message</strong>
      </Modal>,
    );

    expect(ref.current!.dialog.style.display).to.equal('block');
  });

  it('Should close the modal when the modal dialog is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    const { getByRole } = render(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>,
    );

    // the modal-dialog element is pointer-events: none;
    fireEvent.click(getByRole('dialog'));
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onHideSpy = sinon.spy();
    const { getByTestId } = render(
      <Modal show onHide={onHideSpy} backdrop="static" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.click(getByTestId('modal'));
    onHideSpy.should.not.have.been.called;
  });

  it('Should show "static" dialog animation when backdrop is clicked', () => {
    const { getByRole } = render(
      <Modal show backdrop="static">
        <strong>Message</strong>
      </Modal>,
    );

    const modalDialog = getByRole('dialog');
    fireEvent.click(modalDialog);
    getByRole('dialog').classList.contains('modal-static').should.be.true;
  });

  it('Should show "static" dialog animation when esc pressed and keyboard is false', () => {
    const { getByRole } = render(
      <Modal show backdrop="static" keyboard={false}>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27,
    });
    getByRole('dialog').classList.contains('modal-static').should.be.true;
  });

  it('Should not show "static" dialog animation when esc pressed and keyboard is true', () => {
    const { getByRole } = render(
      <Modal show backdrop="static" keyboard>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27,
    });
    getByRole('dialog').classList.contains('modal-static').should.be.false;
  });

  it('Should not show "static" dialog animation modal backdrop is not "static"', () => {
    const { getByTestId, getByRole } = render(
      <Modal show backdrop data-testid="modal">
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
        <Modal.Header closeButton data-testid="close-btn" />
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.click(getByTestId('close-btn').querySelector('button')!);
  });

  it('Should pass className to the dialog', () => {
    const { getByRole } = render(
      <Modal show className="mymodal">
        <strong>Message</strong>
      </Modal>,
    );

    getByRole('dialog').classList.contains('mymodal').should.be.true;
  });

  it('Should use backdropClassName to add classes to the backdrop', () => {
    render(
      <Modal show backdropClassName="my-modal-backdrop">
        <strong>Message</strong>
      </Modal>,
    );

    document
      .querySelector('.modal-backdrop')!
      .classList.contains('my-modal-backdrop').should.be.true;
  });

  it('Should pass size to the dialog', () => {
    const { getByTestId } = render(
      <Modal show size="sm" data-testid="modal">
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
    );

    getByTestId('modal').classList.contains('modal-fullscreen').should.be.true;
  });

  it('Should pass fullscreen as string to the dialog', () => {
    const { getByTestId } = render(
      <Modal show fullscreen="sm-down" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    getByTestId('modal').classList.contains('modal-fullscreen-sm-down').should
      .be.true;
  });

  it('Should allow custom breakpoints for fullscreen', () => {
    const { getByTestId } = render(
      <Modal show fullscreen="custom-down" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    getByTestId('modal').classList.contains('modal-fullscreen-custom-down')
      .should.be.true;
  });

  it('Should pass centered to the dialog', () => {
    const { getByTestId } = render(
      <Modal show centered data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    getByTestId('modal').classList.contains('modal-dialog-centered').should.be
      .true;
  });

  it('Should pass scrollable to the dialog', () => {
    const { getByTestId } = render(
      <Modal show scrollable data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    getByTestId('modal').classList.contains('modal-dialog-scrollable').should.be
      .true;
  });

  it('Should pass dialog style to the dialog', () => {
    const { getByRole } = render(
      <Modal show style={{ color: 'red' }}>
        <strong>Message</strong>
      </Modal>,
    );

    getByRole('dialog').style.color.should.equal('red');
  });

  it('Should pass dialogClassName to the dialog', () => {
    const { getByTestId } = render(
      <Modal show dialogClassName="my-dialog" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    getByTestId('modal').classList.contains('my-dialog').should.be.true;
  });

  it('Should pass contentClassName to .modal-content', () => {
    const { getByTestId } = render(
      <Modal show contentClassName="my-content" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    const modalContent = getByTestId('modal').querySelector('.modal-content')!;
    modalContent.classList.contains('my-content').should.be.true;
  });

  it('Should use dialogAs', () => {
    function CustomDialog() {
      return <div className="custom-dialog" tabIndex={-1} />;
    }

    render(
      // eslint-disable-next-line react/jsx-no-bind
      <Modal show dialogAs={CustomDialog}>
        <strong>Message</strong>
      </Modal>,
    );

    document.querySelector('.custom-dialog')!.should.exist;
  });

  it('Should pass transition callbacks to Transition', (done) => {
    const increment = sinon.spy();
    const Elem = () => {
      const [show, setShow] = React.useState(true);
      return (
        <Modal
          show={show}
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

    const { getByRole, rerender } = render(
      <Modal
        show
        data-testid="modal"
        style={{ transition: 'opacity 1s linear' }}
      >
        <strong>Message</strong>
      </Modal>,
    );
    const modal = getByRole('dialog');
    modal.addEventListener('transitionend', increment);
    rerender(
      <Modal
        show={false}
        onExited={() => {
          expect(increment.callCount).to.equal(1);
          modal.removeEventListener('transitionend', increment);
          done();
        }}
      >
        Foo
      </Modal>,
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
      rerender(<Modal show={false}>Foo</Modal>);

      offSpy.should.have.been.calledWith('resize');
    });
  });

  it('Should close once it was clicked outside of the Modal', () => {
    const onHideSpy = sinon.spy();
    const { getByRole } = render(
      <Modal show onHide={onHideSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.click(getByRole('dialog'));
    onHideSpy.should.have.been.called;
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

    onHideSpy.should.not.have.been.called;
  });

  it('Should set aria-labelledby to the role="dialog" element if aria-labelledby set', () => {
    const { getByRole } = render(
      <Modal show aria-labelledby="modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>,
    );

    expect(getByRole('dialog').getAttribute('aria-labelledby')).to.equal(
      'modal-title',
    );
  });

  it('Should set aria-describedby to the role="dialog" element if aria-describedby set', () => {
    const { getByRole } = render(
      <Modal show aria-describedby="modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>,
    );

    expect(getByRole('dialog').getAttribute('aria-describedby')).to.equal(
      'modal-title',
    );
  });

  it('Should set aria-label to the role="dialog" element if aria-label set', () => {
    const labelValue = 'modal-label';
    const { getByRole } = render(
      <Modal show aria-label={labelValue}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>,
    );

    expect(getByRole('dialog').getAttribute('aria-label')).to.equal(labelValue);
  });

  it('Should call onEscapeKeyDown when keyboard is true', () => {
    const onEscapeKeyDownSpy = sinon.spy();
    const { getByRole } = render(
      <Modal show keyboard onEscapeKeyDown={onEscapeKeyDownSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27,
    });

    onEscapeKeyDownSpy.should.have.been.called;
  });

  it('Should not call onEscapeKeyDown when keyboard is false', () => {
    const onEscapeKeyDownSpy = sinon.spy();
    const { getByRole } = render(
      <Modal show keyboard={false} onEscapeKeyDown={onEscapeKeyDownSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27,
    });

    onEscapeKeyDownSpy.should.not.have.been.called;
  });

  it('Should use custom props manager if specified', (done) => {
    class MyModalManager extends ModalManager {
      // @ts-ignore
      add() {
        done();
      }
    }

    const managerRef = React.createRef<ModalManager | null>();
    // @ts-ignore
    managerRef.current = new MyModalManager();

    render(
      <Modal show manager={managerRef.current as any}>
        <strong>Message</strong>
      </Modal>,
    );
  });
});
