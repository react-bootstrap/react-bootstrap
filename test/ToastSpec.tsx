import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';

import Toast from '../src/Toast';

const getToast = ({
  delay = 500,
  onCloseSpy,
  autohide = true,
  show = true,
}) => (
  <Toast delay={delay} onClose={onCloseSpy} show={show} autohide={autohide}>
    <Toast.Header>header-content</Toast.Header>
    <Toast.Body>body-content</Toast.Body>
  </Toast>
);

describe('<Toast>', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should apply bg prop', () => {
    const { container } = render(<Toast bg="primary">Card</Toast>);
    container.firstElementChild!.classList.contains('bg-primary').should.be
      .true;
    container.firstElementChild!.classList.contains('toast').should.be.true;
  });

  it('should render an entire toast', () => {
    const { container } = render(
      <Toast>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );
    ['fade', 'toast', 'show'].map(
      (className) =>
        container.firstElementChild!.classList.contains(className).should.be
          .true,
    );
    (
      [
        ['role', 'alert'],
        ['aria-live', 'assertive'],
        ['aria-atomic', true],
      ] as const
    ).map(
      ([attrName, attrVal]) =>
        (
          container.firstElementChild!.attributes.getNamedItem(attrName)!
            .textContent === `${attrVal}`
        ).should.be.true,
    );
  });

  it('should render without transition if animation is false', () => {
    const { container } = render(
      <Toast animation={false}>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );

    ['toast', 'show'].map(
      (className) =>
        container.firstElementChild!.classList.contains(className).should.be
          .true,
    );
  });

  it('should trigger the onClose event after clicking on the close button', () => {
    const onCloseSpy = sinon.spy();

    const { container } = render(
      <Toast onClose={onCloseSpy}>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    fireEvent.click(
      container.firstElementChild!.getElementsByTagName('button')[0],
    );
    onCloseSpy.should.have.been.calledOnce;
  });

  it('should trigger the onClose event after the autohide delay', () => {
    const onCloseSpy = sinon.spy();
    render(
      <Toast onClose={onCloseSpy} delay={500} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.tick(1000);
    onCloseSpy.should.have.been.calledOnce;
  });

  it('should not trigger the onClose event if autohide is not set', () => {
    const onCloseSpy = sinon.spy();
    render(
      <Toast onClose={onCloseSpy}>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.tick(3000);
    onCloseSpy.should.not.to.have.been.called;
  });

  it('should clearTimeout after unmount', () => {
    const onCloseSpy = sinon.spy();
    const { unmount } = render(
      <Toast delay={500} onClose={onCloseSpy} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    unmount();
    clock.tick(1000);
    onCloseSpy.should.not.to.have.been.called;
  });

  it('should not reset autohide timer when element re-renders with same props', () => {
    const onCloseSpy = sinon.spy();
    const toast = getToast({ onCloseSpy });
    const { rerender } = render(toast);

    clock.tick(250);

    // Trigger render with no props changes.
    rerender(toast);

    clock.tick(300);
    onCloseSpy.should.have.been.calledOnce;
  });

  it('should not reset autohide timer when delay is changed', () => {
    const onCloseSpy = sinon.spy();
    const { rerender } = render(getToast({ delay: 500, onCloseSpy }));

    clock.tick(250);

    rerender(getToast({ delay: 10000, onCloseSpy }));

    clock.tick(300);
    onCloseSpy.should.have.been.calledOnce;
  });

  it('should not reset autohide timer when onClosed is changed', () => {
    const onCloseSpy = sinon.spy();
    const onCloseSpy2 = sinon.spy();

    const { rerender } = render(getToast({ onCloseSpy }));

    clock.tick(250);

    rerender(getToast({ onCloseSpy: onCloseSpy2 }));

    clock.tick(300);
    onCloseSpy.should.not.to.have.been.called;
    onCloseSpy2.should.have.been.calledOnce;
  });

  it('should not call onClose if autohide is changed from true to false', () => {
    const onCloseSpy = sinon.spy();
    const { rerender } = render(getToast({ onCloseSpy, autohide: true }));

    clock.tick(250);

    rerender(getToast({ onCloseSpy, autohide: false }));

    clock.tick(300);
    onCloseSpy.should.not.to.have.been.called;
  });

  it('should not call onClose if show is changed from true to false', () => {
    const onCloseSpy = sinon.spy();
    const { rerender } = render(getToast({ show: true, onCloseSpy }));
    clock.tick(100);

    rerender(getToast({ show: false, onCloseSpy }));

    clock.tick(300);
    onCloseSpy.should.not.to.have.been.called;
  });

  it('should render with bsPrefix', () => {
    const { container } = render(
      <Toast bsPrefix="my-toast">
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );
    container.firstElementChild!.tagName.toLowerCase().should.equal('div');
    container.firstElementChild!.classList.contains('my-toast');
  });
});
