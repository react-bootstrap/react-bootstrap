import events from 'dom-helpers/events';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import BaseModal from 'react-overlays/Modal';
import { mount } from 'enzyme';

import Modal from '../src/Modal';
import ModalDialog from '../src/ModalDialog';

describe('<Modal>', () => {
  let mountPoint;
  const render = element => mount(element, { attachTo: mountPoint });

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
    const wrapper = render(
      <Modal show onHide={noOp} animation={false}>
        <strong>Message</strong>
      </Modal>
    );

    assert.ok(wrapper.find('strong').exists());
    wrapper
      .find('strong')
      .getDOMNode()
      .innerText.should.equal('Message');
  });

  it('Should close the modal when the modal dialog is clicked', done => {
    const doneOp = () => {
      done();
    };

    const wrapper = render(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    );

    const dialog = wrapper.find(ModalDialog).getDOMNode();

    ReactTestUtils.Simulate.click(dialog);
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onHideSpy = sinon.spy();
    const wrapper = render(
      <Modal show onHide={onHideSpy} backdrop="static">
        <strong>Message</strong>
      </Modal>
    );

    const dialog = wrapper.find(ModalDialog).getDOMNode();

    ReactTestUtils.Simulate.click(dialog);

    expect(onHideSpy).to.not.have.been.called;
  });

  it('Should close the modal when the modal close button is clicked', done => {
    const doneOp = () => {
      done();
    };

    const wrapper = render(
      <Modal show onHide={doneOp}>
        <Modal.Header closeButton />
        <strong>Message</strong>
      </Modal>
    );

    const button = wrapper
      .find(ModalDialog)
      .getDOMNode()
      .getElementsByClassName('close')[0];

    ReactTestUtils.Simulate.click(button);
  });

  it('Should pass className to the dialog', () => {
    const noOp = () => {};
    const wrapper = render(
      <Modal show className="mymodal" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    const dialog = wrapper.find(ModalDialog).getDOMNode();

    assert.ok(dialog.className.match(/\bmymodal\b/));
  });

  it('Should use bsClass on the dialog', () => {
    const noOp = () => {};
    const wrapper = render(
      <Modal show bsClass="mymodal" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    const modal = wrapper.find(ModalDialog).getDOMNode();

    assert.ok(modal.className.match(/\bmymodal\b/));
    assert.ok(modal.children[0].className.match(/\bmymodal-dialog\b/));
    assert.ok(
      modal.children[0].children[0].className.match(/\bmymodal-content\b/)
    );

    const baseModal = wrapper.find(BaseModal).instance();
    assert.ok(baseModal.backdrop.className.match(/\bmymodal-backdrop\b/));
  });

  it('Should use backdropClassName to add classes to the backdrop', () => {
    const noOp = () => {};
    const wrapper = render(
      <Modal show backdropClassName="my-modal-backdrop" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    const baseModal = wrapper.find(BaseModal).instance();
    assert.ok(
      baseModal.backdrop.className.match(/\bmodal-backdrop my-modal-backdrop\b/)
    );
  });

  it('Should pass bsSize to the dialog', () => {
    const noOp = () => {};
    const wrapper = render(
      <Modal show bsSize="small" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    const dialog = wrapper
      .find(ModalDialog)
      .getDOMNode()
      .getElementsByClassName('modal-dialog')[0];

    assert.ok(dialog.className.match(/\bmodal-sm\b/));
  });

  it('Should pass dialog style to the dialog', () => {
    const noOp = () => {};
    const wrapper = render(
      <Modal show style={{ top: 1000 }} onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    const dialog = wrapper.find(ModalDialog).getDOMNode();

    assert.ok(dialog.style.top === '1000px');
  });

  it('Should pass dialogClassName to the dialog', () => {
    const noOp = () => {};
    const wrapper = render(
      <Modal show dialogClassName="testCss" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    const dialog = wrapper
      .find(ModalDialog)
      .getDOMNode()
      .querySelector('.modal-dialog');

    assert.ok(dialog.className.match(/\btestCss\b/));
  });

  it('Should use dialogComponentClass', () => {
    const noOp = () => {};

    const CustomDialog = React.forwardRef((props, ref) => (
      <div ref={ref} className="custom-dialog" tabIndex="-1" />
    ));

    const wrapper = render(
      <Modal show dialogComponentClass={CustomDialog} onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    assert.equal(
      wrapper.find(CustomDialog).getDOMNode().className,
      'custom-dialog'
    );
  });

  it('Should pass transition callbacks to Transition', done => {
    let count = 0;
    const increment = () => {
      ++count;
    };

    const wrapper = render(
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
          wrapper.setProps({ show: false });
        }}
      >
        <strong>Message</strong>
      </Modal>
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
            show: true
          };
        }

        render() {
          if (!this.state.show) {
            return null;
          }

          return <Modal show>Foo</Modal>;
        }
      }

      const wrapper = render(<Component />);
      wrapper.setState({ show: false });

      expect(offSpy).to.have.been.calledWith(window, 'resize');
    });
  });
});
