import { mount } from 'enzyme';

import Toast from '../src/Toast';

describe('<Toast>', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should apply bg prop', () => {
    mount(<Toast bg="primary">Card</Toast>).assertSingle('.toast.bg-primary');
  });

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
    const onCloseSpy = sinon.spy();
    mount(
      <Toast onClose={onCloseSpy} delay={500} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.tick(1000);
    expect(onCloseSpy).to.have.been.calledOnce;
  });

  it('should not trigger the onClose event if autohide is not set', () => {
    const onCloseSpy = sinon.spy();
    mount(
      <Toast onClose={onCloseSpy}>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.tick(3000);
    expect(onCloseSpy).not.to.have.been.called;
  });

  it('should clearTimeout after unmount', () => {
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
  });

  it('should not reset autohide timer when element re-renders with same props', () => {
    const onCloseSpy = sinon.spy();
    const wrapper = mount(
      <Toast delay={500} onClose={onCloseSpy} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );

    clock.tick(250);

    // Trigger render with no props changes.
    wrapper.setProps({});

    clock.tick(300);
    expect(onCloseSpy).to.have.been.calledOnce;
  });

  it('should not reset autohide timer when delay is changed', () => {
    const onCloseSpy = sinon.spy();
    const wrapper = mount(
      <Toast delay={500} onClose={onCloseSpy} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );

    clock.tick(250);

    wrapper.setProps({ delay: 10000 });

    clock.tick(300);
    expect(onCloseSpy).to.have.been.calledOnce;
  });

  it('should not reset autohide timer when onClosed is changed', () => {
    const onCloseSpy = sinon.spy();
    const onCloseSpy2 = sinon.spy();
    const wrapper = mount(
      <Toast delay={500} onClose={onCloseSpy} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );

    clock.tick(250);

    wrapper.setProps({ onClose: onCloseSpy2 });

    clock.tick(300);
    expect(onCloseSpy).not.to.have.been.called;
    expect(onCloseSpy2).to.have.been.calledOnce;
  });

  it('should not call onClose if autohide is changed from true to false', () => {
    const onCloseSpy = sinon.spy();
    const wrapper = mount(
      <Toast delay={500} onClose={onCloseSpy} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );

    clock.tick(250);

    wrapper.setProps({ autohide: false });

    clock.tick(300);
    expect(onCloseSpy).not.to.have.been.called;
  });

  it('should not call onClose if show is changed from true to false', () => {
    const onCloseSpy = sinon.spy();
    const wrapper = mount(
      <Toast delay={500} onClose={onCloseSpy} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );

    clock.tick(250);

    wrapper.setProps({ show: false });

    clock.tick(300);
    expect(onCloseSpy).not.to.have.been.called;
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
