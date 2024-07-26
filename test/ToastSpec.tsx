import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';
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
  let clock: ReturnType<typeof vi.useFakeTimers>;

  beforeEach(() => {
    clock = vi.useFakeTimers();
  });

  afterEach(() => {
    clock.useRealTimers();
  });

  it('should apply bg prop', () => {
    const { container } = render(<Toast bg="primary">Card</Toast>);
    expect(container.firstElementChild!.classList).toContain('bg-primary');
    expect(container.firstElementChild!.classList).toContain('toast');
  });

  it('should render an entire toast', () => {
    const { container } = render(
      <Toast>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );

    ['fade', 'toast', 'show'].map((className) =>
      expect(container.firstElementChild!.classList).toContain(className),
    );

    (
      [
        ['role', 'alert'],
        ['aria-live', 'assertive'],
        ['aria-atomic', 'true'],
      ] as const
    ).map(([attrName, attrVal]) =>
      expect(
        container.firstElementChild!.attributes.getNamedItem(attrName)!
          .textContent,
      ).toEqual(attrVal),
    );
  });

  it('should render without transition if animation is false', () => {
    const { container } = render(
      <Toast animation={false}>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );

    ['toast', 'show'].map((className) =>
      expect(container.firstElementChild!.classList).toContain(className),
    );
  });

  it('should trigger the onClose event after clicking on the close button', () => {
    const onCloseSpy = vi.fn();

    const { container } = render(
      <Toast onClose={onCloseSpy}>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    fireEvent.click(
      container.firstElementChild!.getElementsByTagName('button')[0],
    );
    expect(onCloseSpy).toHaveBeenCalledOnce();
  });

  it('should trigger the onClose event after the autohide delay', () => {
    const onCloseSpy = vi.fn();
    render(
      <Toast onClose={onCloseSpy} delay={500} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.advanceTimersByTime(1000);
    expect(onCloseSpy).toHaveBeenCalledOnce();
  });

  it('should not trigger the onClose event if autohide is not set', () => {
    const onCloseSpy = vi.fn();
    render(
      <Toast onClose={onCloseSpy}>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.advanceTimersByTime(3000);
    expect(onCloseSpy).not.toHaveBeenCalled();
  });

  it('should clearTimeout after unmount', () => {
    const onCloseSpy = vi.fn();
    const { unmount } = render(
      <Toast delay={500} onClose={onCloseSpy} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    unmount();
    clock.advanceTimersByTime(1000);
    expect(onCloseSpy).not.toHaveBeenCalled();
  });

  it('should not reset autohide timer when element re-renders with same props', () => {
    const onCloseSpy = vi.fn();
    const toast = getToast({ onCloseSpy });
    const { rerender } = render(toast);

    clock.advanceTimersByTime(250);

    // Trigger render with no props changes.
    rerender(toast);

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).toHaveBeenCalledOnce();
  });

  it('should not reset autohide timer when delay is changed', () => {
    const onCloseSpy = vi.fn();
    const { rerender } = render(getToast({ delay: 500, onCloseSpy }));

    clock.advanceTimersByTime(250);

    rerender(getToast({ delay: 10000, onCloseSpy }));

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).toHaveBeenCalledOnce();
  });

  it('should not reset autohide timer when onClosed is changed', () => {
    const onCloseSpy = vi.fn();
    const onCloseSpy2 = vi.fn();

    const { rerender } = render(getToast({ onCloseSpy }));

    clock.advanceTimersByTime(250);

    rerender(getToast({ onCloseSpy: onCloseSpy2 }));

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).not.toHaveBeenCalled();
    expect(onCloseSpy2).toHaveBeenCalledOnce();
  });

  it('should not call onClose if autohide is changed from true to false', () => {
    const onCloseSpy = vi.fn();
    const { rerender } = render(getToast({ onCloseSpy, autohide: true }));

    clock.advanceTimersByTime(250);

    rerender(getToast({ onCloseSpy, autohide: false }));

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).not.toHaveBeenCalled();
  });

  it('should not call onClose if show is changed from true to false', () => {
    const onCloseSpy = vi.fn();
    const { rerender } = render(getToast({ show: true, onCloseSpy }));

    act(() => {
      clock.advanceTimersByTime(100);
    });

    rerender(getToast({ show: false, onCloseSpy }));

    act(() => {
      clock.advanceTimersByTime(300);
    });

    expect(onCloseSpy).not.toHaveBeenCalled();
  });

  it('should render with bsPrefix', () => {
    const { container } = render(
      <Toast bsPrefix="my-toast">
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );
    expect(container.firstElementChild!.tagName).toEqual('DIV');
    expect(container.firstElementChild!.classList).toContain('my-toast');
  });

  it('Should pass transition callbacks to Transition', () => {
    const increment = vi.fn();

    const Elem = () => {
      const [show, setShow] = React.useState(false);
      React.useEffect(() => {
        setShow(true);
      }, []);

      return (
        <Toast
          show={show}
          onEnter={increment}
          onEntering={increment}
          onEntered={() => {
            increment();
            setShow(false);
          }}
          onExit={increment}
          onExiting={increment}
          onExited={increment}
        >
          <Toast.Header />
          <Toast.Body>Body</Toast.Body>
        </Toast>
      );
    };

    render(<Elem />);

    act(() => {
      clock.advanceTimersByTime(250);
    });

    // Trigger onExit.
    act(() => {
      clock.advanceTimersByTime(250);
    });

    expect(increment).toHaveBeenCalledTimes(6);
  });
});
