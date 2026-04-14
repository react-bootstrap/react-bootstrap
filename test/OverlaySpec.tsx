import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Overlay from '../src/Overlay';
import Popover from '../src/Popover';

describe('<Overlay>', () => {
  it('should forward ref to the overlay', () => {
    const ref = React.createRef<any>();
    render(
      <Overlay ref={ref} show target={ref.current}>
        <Popover id="my-overlay">test</Popover>
      </Overlay>,
    );

    expect(ref.current.id).toEqual('my-overlay');
  });

  it('should use Fade internally if transition=true', () => {
    const ref = React.createRef<any>();
    render(
      <Overlay show transition ref={ref} target={ref.current}>
        <Popover id="my-overlay" data-testid="test">
          test
        </Popover>
      </Overlay>,
    );
    const popoverElem = screen.getByTestId('test');
    expect(popoverElem.classList).toContain('fade');
  });

  it('should not use Fade if transition=false', () => {
    const ref = React.createRef<any>();
    render(
      <Overlay show transition={false} ref={ref} target={ref.current}>
        <Popover id="my-overlay" data-testid="test">
          test
        </Popover>
      </Overlay>,
    );
    const popoverElem = screen.getByTestId('test');
    expect(popoverElem.classList).not.toContain('fade');
  });

  it('should clear cached popper state when an overlay hides', async () => {
    let capturedPopper: any;

    function OverlayExample() {
      const target = React.useRef<HTMLButtonElement>(null);
      const [show, setShow] = React.useState(false);

      return (
        <>
          <button
            ref={target}
            type="button"
            data-testid="target"
            onClick={() => setShow((value) => !value)}
          >
            toggle
          </button>
          <Overlay show={show} transition={false} target={target.current}>
            {(props) => {
              capturedPopper = props.popper;

              return (
                <Popover id="my-overlay" data-testid="test-overlay" {...props}>
                  test
                </Popover>
              );
            }}
          </Overlay>
        </>
      );
    }

    render(<OverlayExample />);

    fireEvent.click(screen.getByTestId('target'));

    await screen.findByTestId('test-overlay');
    await waitFor(() => expect(capturedPopper.state).toBeDefined());
    expect(capturedPopper.scheduleUpdate).toBeDefined();

    fireEvent.click(screen.getByTestId('target'));

    await waitFor(() =>
      expect(screen.queryByTestId('test-overlay')).toBeNull(),
    );
    await waitFor(() => expect(capturedPopper.state).toBeUndefined());
    expect(capturedPopper.scheduleUpdate).toBeUndefined();
  });

  it('should clear cached popper state when an overlay unmounts', async () => {
    let capturedPopper: any;

    function OverlayExample() {
      const target = React.useRef<HTMLButtonElement>(null);

      return (
        <>
          <button ref={target} type="button" data-testid="target">
            toggle
          </button>
          <Overlay show transition={false} target={() => target.current}>
            {(props) => {
              capturedPopper = props.popper;

              return (
                <Popover id="my-overlay" data-testid="test-overlay" {...props}>
                  test
                </Popover>
              );
            }}
          </Overlay>
        </>
      );
    }

    const { unmount } = render(<OverlayExample />);

    await screen.findByTestId('test-overlay');
    await waitFor(() => expect(capturedPopper.state).toBeDefined());
    expect(capturedPopper.scheduleUpdate).toBeDefined();

    unmount();

    expect(capturedPopper.state).toBeUndefined();
    expect(capturedPopper.scheduleUpdate).toBeUndefined();
  });
});
