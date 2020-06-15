import React from 'react';
import { mount } from 'enzyme';

import Toast from '../src/Toast';

describe('<Toast>', () => {
  it('should render an entire toast', () => {
    mount(
      <Toast>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    ).assertSingle(
      'div.toast[className="fade toast show"][role="alert"][aria-live="assertive"][aria-atomic="true"]',
    );
  });

  it('should render without transition if animation is false', () => {
    mount(
      <Toast animation={false}>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    ).assertSingle(
      'div.toast[className="toast show"][role="alert"][aria-live="assertive"][aria-atomic="true"]',
    );
  });

  it('should trigger the onClose event after clicking on the close button', () => {
    const onCloseSpy = sinon.spy();

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

    expect(onCloseSpy).to.have.been.calledOnce;
  });

  it('should trigger the onClose event after the autohide delay', () => {
    const clock = sinon.useFakeTimers();

    try {
      const onCloseSpy = sinon.spy();
      mount(
        <Toast onClose={onCloseSpy} delay={500} show autohide>
          <Toast.Header>header-content</Toast.Header>
          <Toast.Body>body-content</Toast.Body>
        </Toast>,
      );
      clock.tick(1000);
      expect(onCloseSpy).to.have.been.calledOnce;
    } finally {
      clock.restore();
    }
  });

  it('should not trigger the onClose event if autohide is not set', () => {
    const clock = sinon.useFakeTimers();

    try {
      const onCloseSpy = sinon.spy();
      mount(
        <Toast onClose={onCloseSpy}>
          <Toast.Header>header-content</Toast.Header>
          <Toast.Body>body-content</Toast.Body>
        </Toast>,
      );
      clock.tick(3000);
      expect(onCloseSpy).not.to.have.been.called;
    } finally {
      clock.restore();
    }
  });

  it('should clearTimeout after unmount', () => {
    const clock = sinon.useFakeTimers();

    try {
      const onCloseSpy = sinon.spy();
      const wrapper = mount(
        <Toast delay={500} onClose={onCloseSpy} show autohide>
          <Toast.Header>header-content</Toast.Header>
          <Toast.Body>body-content</Toast.Body>
        </Toast>,
      );
      wrapper.unmount();
      clock.tick(1000);
      expect(onCloseSpy).not.to.have.been.called;
    } finally {
      clock.restore();
    }
  });

  it('should render with bsPrefix', () => {
    mount(
      <Toast bsPrefix="my-toast">
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    ).assertSingle('div.my-toast');
  });
});
