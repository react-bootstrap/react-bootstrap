import { mount } from 'enzyme';
import * as React from 'react';
import ModalManager from '@restart/ui/ModalManager';
import { fireEvent, render } from '@testing-library/react';
import Offcanvas from '../src/Offcanvas';
import sinon from 'sinon';

describe('<Offcanvas>', () => {
  afterEach(() => {
    // make sure the dangling portal elements get cleaned up
    // document.body.innerHTML = '';
  });

  it('Should render the modal content', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    const { getByTestId } = render(
      <Offcanvas show onHide={noop}>
        <strong data-testid="test">Message</strong>
      </Offcanvas>,
    );
    const strongElem = getByTestId('test');
    strongElem.tagName.toLowerCase().should.equal('strong');
    strongElem.textContent!.should.equal('Message');
  });

  it('Should set `visibility: visible` to `offcanvas`', () => {
    const { getByTestId } = render(
      <Offcanvas data-testid="test" show>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = getByTestId('test');

    offcanvasElem.tagName.toLowerCase().should.equal('div');
    offcanvasElem.classList.contains('offcanvas').should.be.true;
    offcanvasElem.style.visibility!.should.equal('visible');
  });

  it('Should close the offcanvas when the modal close button is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    render(
      <Offcanvas show onHide={doneOp}>
        <Offcanvas.Header closeButton />
        <strong>Message</strong>
      </Offcanvas>,
    );
    const buttonElem = document.getElementsByClassName('btn-close')[0];

    buttonElem.classList.contains('btn-close').should.be.true;

    fireEvent.click(buttonElem);
  });

  it('Should pass className to the offcanvas', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    const { getByTestId } = render(
      <Offcanvas show className="myoffcanvas" onHide={noop} data-testid="test">
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = getByTestId('test');
    offcanvasElem.classList.contains('myoffcanvas').should.be.true;
  });

  it('Should pass backdropClassName to the backdrop', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};

    render(
      <Offcanvas show backdropClassName="custom-backdrop" onHide={noop}>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const backdropElem =
      document.getElementsByClassName('offcanvas-backdrop')[0];
    backdropElem.classList.contains('custom-backdrop').should.be.true;
  });

  it('Should pass style to the offcanvas', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    const { getByTestId } = render(
      <Offcanvas show style={{ color: 'red' }} onHide={noop} data-testid="test">
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = getByTestId('test');
    offcanvasElem.style.color.should.equal('red');
  });

  it('Should pass transition callbacks to Transition', (done) => {
    const increment = sinon.spy();
    const Elem = () => {
      const [show, setShow] = React.useState(true);
      return (
        <Offcanvas
          show={show}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onHide={() => {}}
          onExit={increment}
          onExiting={increment}
          onExited={() => {
            increment();
            increment.callCount.should.equal(6);
            done();
          }}
          onEnter={increment}
          onEntering={increment}
          onEntered={() => {
            increment();
            setShow(false);
          }}
        >
          <strong>Message</strong>
        </Offcanvas>
      );
    };

    render(<Elem />);
  });

  it('Should close when backdrop clicked', () => {
    const onHideSpy = sinon.spy();
    render(
      <Offcanvas show onHide={onHideSpy}>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const backdropElem =
      document.getElementsByClassName('offcanvas-backdrop')[0];

    fireEvent.click(backdropElem);

    onHideSpy.should.have.been.called;
  });

  // TODO: unsure if we need this, since it seems like Offcanvas is still undergoing some
  // changes upstream.
  // it('Should close when anything outside offcanvas clicked and backdrop=false', () => {
  //   const onHideSpy = sinon.spy();
  //   render(
  //     <>
  //       <Offcanvas show onHide={onHideSpy} backdrop={false}>
  //         <strong>Message</strong>
  //       </Offcanvas>
  //       <button type="button" id="mybutton">
  //         my button
  //       </button>
  //     </>,
  //   );

  //   fireEvent.click(document.body);

  //   onHideSpy.should.have.been.called;
  // });

  it('Should not call onHide if the click target comes from inside the offcanvas', () => {
    const onHideSpy = sinon.spy();
    const { getByTestId } = render(
      <>
        <Offcanvas show onHide={onHideSpy} data-testid="test">
          <strong>Message</strong>
        </Offcanvas>
        <div id="outside">outside</div>
      </>,
    );
    const offcanvasElem = getByTestId('test');
    fireEvent.click(offcanvasElem);

    onHideSpy.should.not.have.been.called;
  });

  it('Should set aria-labelledby to the role="dialog" element if aria-labelledby set', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    const { getByTestId } = render(
      <Offcanvas
        show
        onHide={noop}
        aria-labelledby="offcanvas-title"
        data-testid="test"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvas-title">
            Offcanvas heading
          </Offcanvas.Title>
        </Offcanvas.Header>
      </Offcanvas>,
    );
    const offcanvasElem = getByTestId('test');
    offcanvasElem.classList.contains('show').should.be.true;
    offcanvasElem.getAttribute('role')!.should.equal('dialog');
    offcanvasElem
      .getAttribute('aria-labelledby')!
      .should.equal('offcanvas-title');
  });

  it('Should call onEscapeKeyDown when keyboard is true', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    const onEscapeKeyDownSpy = sinon.spy();
    render(
      <Offcanvas
        show
        onHide={noop}
        keyboard
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Offcanvas>,
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });
    onEscapeKeyDownSpy.should.have.been.called;
  });

  it('Should not call onEscapeKeyDown when keyboard is false', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    const onEscapeKeyDownSpy = sinon.spy();
    render(
      <Offcanvas
        show
        onHide={noop}
        keyboard={false}
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Offcanvas>,
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });
    onEscapeKeyDownSpy.should.not.have.been.called;
  });

  it('Should use custom props manager if specified', (done) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};

    class MyModalManager extends ModalManager {
      add() {
        done();
        return 0;
      }
    }

    const managerRef = React.createRef<any>();
    (managerRef as any).current = new MyModalManager();

    render(
      <Offcanvas show onHide={noop} manager={managerRef.current}>
        <strong>Message</strong>
      </Offcanvas>,
    );
  });

  it('should not change overflow style when scroll=true', () => {
    const containerRef = React.createRef<any>();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    render(
      <div ref={containerRef} style={{ height: '2000px', overflow: 'scroll' }}>
        <Offcanvas show onHide={noop} container={containerRef} scroll>
          <strong>Message</strong>
        </Offcanvas>
      </div>,
    );

    containerRef.current.style.overflow.should.equal('scroll');
  });
});
