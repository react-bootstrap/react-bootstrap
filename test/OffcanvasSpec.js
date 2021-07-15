import { mount } from 'enzyme';
import * as React from 'react';
// import simulant from 'simulant';
import ModalManager from 'react-overlays/ModalManager';
import Offcanvas from '../src/Offcanvas';

describe('<Offcanvas>', () => {
  afterEach(() => {
    // make sure the dangling portal elements get cleaned up
    document.body.innerHTML = '';
  });

  it('Should render the modal content', () => {
    const noOp = () => {};
    mount(
      <Offcanvas show onHide={noOp}>
        <strong>Message</strong>
      </Offcanvas>,
    )
      .find('strong')
      .text()
      .should.equal('Message');
  });

  it('Should set `visibility: visible` to `div.offcanvas`', () => {
    const node = mount(
      <Offcanvas show>
        <strong>Message</strong>
      </Offcanvas>,
    )
      .find('div.offcanvas')
      .getDOMNode();

    expect(node.style.visibility).to.equal('visible');
  });

  it('Should close the offcanvas when the modal close button is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    mount(
      <Offcanvas show onHide={doneOp}>
        <Offcanvas.Header closeButton />
        <strong>Message</strong>
      </Offcanvas>,
    )
      .find('.btn-close')
      .simulate('click');
  });

  it('Should pass className to the offcanvas', () => {
    const noOp = () => {};
    mount(
      <Offcanvas show className="myoffcanvas" onHide={noOp}>
        <strong>Message</strong>
      </Offcanvas>,
    ).assertSingle('div.offcanvas.myoffcanvas');
  });

  it('Should pass backdropClassName to the backdrop', () => {
    const noOp = () => {};

    mount(
      <Offcanvas show backdropClassName="custom-backdrop" onHide={noOp}>
        <strong>Message</strong>
      </Offcanvas>,
    ).find('.modal-backdrop.custom-backdrop');
  });

  it('Should pass style to the offcanvas', () => {
    const noOp = () => {};
    const dialog = mount(
      <Offcanvas show style={{ color: 'red' }} onHide={noOp}>
        <strong>Message</strong>
      </Offcanvas>,
    )
      .find('div.offcanvas')
      .getDOMNode();

    assert.ok(dialog.style.color === 'red');
  });

  it('Should pass transition callbacks to Transition', (done) => {
    const increment = sinon.spy();

    const instance = mount(
      <Offcanvas
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
      </Offcanvas>,
    );
  });

  it('Should close when backdrop clicked', () => {
    const onHideSpy = sinon.spy();
    mount(
      <Offcanvas show onHide={onHideSpy}>
        <strong>Message</strong>
      </Offcanvas>,
    )
      .find('div.modal-backdrop')
      .simulate('click');

    expect(onHideSpy).to.have.been.called;
  });

  // TODO: unsure if we need this, since it seems like Offcanvas is still undergoing some
  // changes upstream.
  // it('Should close when anything outside offcanvas clicked and backdrop=false', () => {
  //   const onHideSpy = sinon.spy();
  //   mount(
  //     <>
  //       <Offcanvas show onHide={onHideSpy} backdrop={false}>
  //         <strong>Message</strong>
  //       </Offcanvas>
  //       <button type="button" id="mybutton">
  //         my button
  //       </button>
  //     </>,
  //   );

  //   simulant.fire(document.body, 'click');

  //   expect(onHideSpy).to.have.been.called;
  // });

  it('Should not call onHide if the click target comes from inside the offcanvas', () => {
    const onHideSpy = sinon.spy();
    const wrapper = mount(
      <>
        <Offcanvas show onHide={onHideSpy}>
          <strong>Message</strong>
        </Offcanvas>
        <div id="outside">outside</div>
      </>,
    );

    wrapper.find('div.offcanvas').simulate('click');

    expect(onHideSpy).to.not.have.been.called;
  });

  it('Should set aria-labelledby to the role="dialog" element if aria-labelledby set', () => {
    const noOp = () => {};
    mount(
      <Offcanvas show onHide={noOp} aria-labelledby="offcanvas-title">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvas-title">
            Offcanvas heading
          </Offcanvas.Title>
        </Offcanvas.Header>
      </Offcanvas>,
    ).assertSingle(
      'div.offcanvas.show[role="dialog"][aria-labelledby="offcanvas-title"]',
    );
  });

  it('Should call onEscapeKeyDown when keyboard is true', () => {
    const noOp = () => {};
    const onEscapeKeyDownSpy = sinon.spy();
    mount(
      <Offcanvas
        show
        onHide={noOp}
        keyboard
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Offcanvas>,
    );

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    document.dispatchEvent(event);

    expect(onEscapeKeyDownSpy).to.have.been.called;
  });

  it('Should not call onEscapeKeyDown when keyboard is false', () => {
    const noOp = () => {};
    const onEscapeKeyDownSpy = sinon.spy();
    mount(
      <Offcanvas
        show
        onHide={noOp}
        keyboard={false}
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Offcanvas>,
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
      <Offcanvas show onHide={noOp} manager={managerRef.current}>
        <strong>Message</strong>
      </Offcanvas>,
    );
  });

  it('should not change overflow style when scroll=true', () => {
    const containerRef = React.createRef();
    const noOp = () => {};
    mount(
      <div ref={containerRef} style={{ height: '2000px', overflow: 'scroll' }}>
        <Offcanvas show onHide={noOp} container={containerRef} scroll>
          <strong>Message</strong>
        </Offcanvas>
      </div>,
    );

    expect(containerRef.current.style.overflow).to.equal('scroll');
  });
});
