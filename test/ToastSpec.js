import React from 'react';
import { mount } from 'enzyme';

import Toast from '../src/Toast';

describe('Toasts', () => {
  it('will render an entire toast', () => {
    mount(
      <Toast>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    ).assertSingle(
      'div.toast[role="alert"][aria-live="assertive"][aria-atomic="true"]',
    );
  });

  it('should trigger the onClose event after clicking on the close button', () => {
    let onCloseSpy = sinon.spy();
    mount(
      <Toast onClose={onCloseSpy}>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    )
      .find('.toast-header')
      .at(0)
      .find('button')
      .simulate('click');

    expect(onCloseSpy).to.be.calledOnce;
  });

  it('should trigger the onClose event after the autohide delay', () => {
    const clock = sinon.useFakeTimers({
      toFake: ['setTimeout'],
    });
    const onCloseSpy = sinon.spy();
    mount(
      <Toast onClose={onCloseSpy} delay={500} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.tick(500);
    expect(onCloseSpy).to.be.calledOnce;
  });

  it('should clearTimeout after unmount', () => {
    let onCloseSpy = sinon.spy();
    const wrapper = mount(
      <Toast delay={500} onClose={onCloseSpy} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    wrapper.unmount();
    expect(onCloseSpy).to.be.not.called;
  });
});
