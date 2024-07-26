import * as React from 'react';
import PropTypes from 'prop-types';
import { describe, expect, it, vi } from 'vitest';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import OverlayTrigger from '../src/OverlayTrigger';
import Popover from '../src/Popover';
import Tooltip from '../src/Tooltip';

describe('<OverlayTrigger>', () => {
  // Swallow extra props.
  const TemplateDiv = React.forwardRef(
    ({ className = '', children }: any, ref: any) => (
      <div
        ref={ref}
        className={className}
        role="tooltip"
        id="test-tooltip"
        data-testid="test-overlay"
      >
        {children}
      </div>
    ),
  );

  it('should not throw an error with StrictMode', () => {
    render(
      <React.StrictMode>
        <OverlayTrigger overlay={<TemplateDiv>test</TemplateDiv>}>
          <button type="button" data-testid="test-button">
            button
          </button>
        </OverlayTrigger>
      </React.StrictMode>,
    );
    const buttonElem = screen.getByTestId('test-button');
    fireEvent.click(buttonElem);
  });

  it('Should render OverlayTrigger element', () => {
    render(
      <OverlayTrigger overlay={<TemplateDiv>test</TemplateDiv>}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    const buttonElem = screen.getByTestId('test-button');
    expect(buttonElem).toBeDefined();
  });

  it('Should show after click trigger', () => {
    render(
      <OverlayTrigger trigger="click" overlay={<TemplateDiv />}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    let overlayElem = screen.queryByTestId('test-overlay');
    const buttonElem = screen.getByTestId('test-button');

    expect(overlayElem).toBeNull();
    fireEvent.click(buttonElem);

    overlayElem = screen.queryByTestId('test-overlay');
    expect(overlayElem).not.toBeNull();
  });

  it('Should accept a function as an overlay render prop', () => {
    const overlay = () => <TemplateDiv />;
    render(
      <OverlayTrigger trigger="click" overlay={overlay}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    let overlayElem = screen.queryByTestId('test-overlay');
    const buttonElem = screen.getByTestId('test-button');

    expect(overlayElem).toBeNull();

    fireEvent.click(buttonElem);

    overlayElem = screen.queryByTestId('test-overlay');
    expect(overlayElem).not.toBeNull();
  });

  it('Should show the tooltip when transitions are disabled', () => {
    const overlay = ({ className }: any) => (
      <TemplateDiv className={`${className} test`} />
    );
    render(
      <OverlayTrigger
        transition={false}
        trigger={['hover', 'focus']}
        overlay={overlay}
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    let overlayElem = screen.queryByTestId('test-overlay');
    const buttonElem = screen.getByTestId('test-button');

    expect(overlayElem).toBeNull();

    fireEvent.focus(buttonElem);

    overlayElem = screen.queryByTestId('test-overlay');
    expect(overlayElem).not.toBeNull();

    expect(overlayElem!.classList).toContain('show');
  });

  it('Should call OverlayTrigger onClick prop to child', () => {
    const callback = vi.fn();

    render(
      <OverlayTrigger overlay={<TemplateDiv>test</TemplateDiv>} trigger="click">
        <button type="button" onClick={callback} data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    const buttonElem = screen.getByTestId('test-button');
    fireEvent.click(buttonElem);

    expect(callback).toHaveBeenCalled();
  });

  it('Should be controllable', () => {
    const callback = vi.fn();

    render(
      <OverlayTrigger
        show
        trigger="click"
        onToggle={callback}
        overlay={<TemplateDiv className="test" />}
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    const overlayElem = screen.getByTestId('test-overlay');
    const buttonElem = screen.getByTestId('test-button');

    expect(overlayElem.classList).toContain('show');
    fireEvent.click(buttonElem);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith(false);
  });

  it('Should show after mouseover trigger', async () => {
    render(
      <OverlayTrigger overlay={<TemplateDiv />}>
        <span data-testid="test-hover">hover me</span>
      </OverlayTrigger>,
    );
    const overlayElem = screen.queryByTestId('test-overlay');
    const hoverElem = screen.getByTestId('test-hover');

    expect(overlayElem).toBeNull();

    fireEvent.mouseOver(hoverElem);

    await waitFor(() =>
      expect(screen.queryByTestId('test-overlay')).not.toBeNull(),
    );

    fireEvent.mouseOut(hoverElem);

    await waitFor(() =>
      expect(screen.queryByTestId('test-overlay')).toBeNull(),
    );
  });

  it('Should not set aria-describedby if the state is not show', () => {
    render(
      <OverlayTrigger trigger="click" overlay={<TemplateDiv />}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    const buttonElem = screen.getByTestId('test-button');

    expect(buttonElem.getAttribute('aria-describedby')).toBeNull();
  });

  it('Should set aria-describedby for tooltips if the state is show', async () => {
    render(
      <OverlayTrigger trigger="click" overlay={<TemplateDiv />}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    const buttonElem = screen.getByTestId('test-button');

    fireEvent.click(buttonElem);

    // aria-describedby gets assigned after a slight delay
    await waitFor(() =>
      expect(buttonElem.getAttribute('aria-describedby')).toBeDefined(),
    );

    expect(buttonElem.getAttribute('aria-describedby')).toEqual('test-tooltip');
  });

  it('Should keep trigger handlers', () => {
    const onClickSpy = vi.fn();
    render(
      <div>
        <OverlayTrigger
          trigger="click"
          overlay={<TemplateDiv>test</TemplateDiv>}
        >
          <button type="button" data-testid="test-button" onClick={onClickSpy}>
            button
          </button>
        </OverlayTrigger>
        <input id="target" />
      </div>,
    );

    fireEvent.click(screen.getByTestId('test-button'));

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('Should maintain overlay classname', () => {
    render(
      <OverlayTrigger
        trigger="click"
        overlay={<TemplateDiv className="test-overlay">test</TemplateDiv>}
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    const buttonElem = screen.getByTestId('test-button');
    fireEvent.click(buttonElem);

    const overlayElem = screen.queryByTestId('test-overlay');
    expect(overlayElem).not.toBeNull();
    expect(overlayElem!.classList).toContain('test-overlay');
  });

  it('Should pass transition callbacks to Transition', async () => {
    const increment = vi.fn();
    const onEnteredSpy = vi.fn();
    const onExitedSpy = vi.fn();

    render(
      <OverlayTrigger
        trigger="click"
        overlay={<TemplateDiv>test</TemplateDiv>}
        onExit={increment}
        onExiting={increment}
        onExited={onExitedSpy}
        onEnter={increment}
        onEntering={increment}
        onEntered={onEnteredSpy}
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );

    fireEvent.click(screen.getByTestId('test-button'));

    await screen.findByTestId('test-overlay');

    await waitFor(() => expect(onEnteredSpy).toHaveBeenCalledOnce());

    fireEvent.click(screen.getByTestId('test-button'));

    await waitForElementToBeRemoved(() => screen.getByTestId('test-overlay'));

    await waitFor(() => expect(onExitedSpy).toHaveBeenCalledOnce());
    expect(increment).toHaveBeenCalledTimes(4);
  });

  it('Should forward requested context', () => {
    const contextTypes = {
      key: PropTypes.string,
    };

    const contextSpy = vi.fn();

    class ContextReader extends React.Component {
      static contextTypes = contextTypes;

      render() {
        contextSpy((this.context as any).key);
        return <div />;
      }
    }

    class ContextHolder extends React.Component {
      static childContextTypes = contextTypes;

      getChildContext() {
        return { key: 'value' };
      }

      render() {
        return (
          <OverlayTrigger trigger="click" overlay={<ContextReader />}>
            <button type="button" data-testid="test-button">
              button
            </button>
          </OverlayTrigger>
        );
      }
    }

    render(<ContextHolder />);
    const buttonElem = screen.getByTestId('test-button');
    fireEvent.click(buttonElem);

    expect(contextSpy).toHaveBeenCalledWith('value');
  });

  it('Should handle popover trigger without warnings', async () => {
    render(
      <OverlayTrigger
        trigger="click"
        overlay={
          <Popover id="test-popover" data-testid="test-overlay">
            test
          </Popover>
        }
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );

    const buttonElem = screen.getByTestId('test-button');
    fireEvent.click(buttonElem);

    const overlay = await screen.findByTestId('test-overlay');
    expect(overlay).toBeDefined();
  });

  it('Should handle tooltip trigger without warnings', async () => {
    render(
      <OverlayTrigger
        trigger="click"
        overlay={
          <Tooltip id="test-tooltip" data-testid="test-overlay">
            test
          </Tooltip>
        }
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );

    const buttonElem = screen.getByTestId('test-button');
    fireEvent.click(buttonElem);

    const overlay = await screen.findByTestId('test-overlay');
    expect(overlay).toBeDefined();
  });

  describe('rootClose', () => {
    [
      {
        label: 'true',
        rootClose: true,
        shownAfterClick: false,
      },
      {
        label: 'default (false)',
        rootClose: undefined,
        shownAfterClick: true,
      },
    ].forEach((testCase) => {
      describe(testCase.label, () => {
        it('Should have correct show state', () => {
          render(
            <OverlayTrigger
              overlay={<TemplateDiv>test</TemplateDiv>}
              trigger="click"
              rootClose={testCase.rootClose}
            >
              <button type="button" data-testid="test-button">
                button
              </button>
            </OverlayTrigger>,
          );
          const buttonElem = screen.getByTestId('test-button');
          fireEvent.click(buttonElem);
          const overlayElem = screen.getByTestId('test-overlay');
          expect(overlayElem.classList).toContain('show');

          // Need to click this way for it to propagate to document element.
          act(() => {
            document.documentElement.click();
          });

          expect(overlayElem.classList.contains('show')).toEqual(
            testCase.shownAfterClick,
          );
        });
      });
    });

    it('should hide after clicking on trigger', () => {
      render(
        <OverlayTrigger
          overlay={<TemplateDiv>test</TemplateDiv>}
          trigger="click"
          rootClose
        >
          <button type="button" data-testid="test-button">
            button
          </button>
        </OverlayTrigger>,
      );
      const buttonElem = screen.getByTestId('test-button');
      fireEvent.click(buttonElem);

      let overlayElem = screen.getByTestId('test-overlay');
      expect(overlayElem.classList).toContain('show');

      // Need to click this way for it to propagate to document element.
      fireEvent.click(buttonElem);
      overlayElem = screen.getByTestId('test-overlay');
      expect(overlayElem.classList).not.toContain('show');
    });

    it('Should still be show a replaced overlay', () => {
      const ReplacedOverlay = React.forwardRef(
        ({ className = '' }: any, ref: any) => {
          const [state, setState] = React.useState(false);
          const handleClick = () => {
            setState(true);
          };

          if (state) {
            return (
              <div data-testid="test-replaced" className={className} ref={ref}>
                replaced
              </div>
            );
          }

          return (
            <div>
              <a
                id="replace-overlay"
                onClick={handleClick}
                data-testid="test-not-replaced"
                className={className}
                ref={ref}
              >
                original
              </a>
            </div>
          );
        },
      );

      render(
        <OverlayTrigger overlay={<ReplacedOverlay />} trigger="click" rootClose>
          <button type="button" data-testid="test-button">
            button
          </button>
        </OverlayTrigger>,
      );
      const buttonElem = screen.getByTestId('test-button');
      fireEvent.click(buttonElem);

      const toBeReplacedElem = screen.getByTestId('test-not-replaced');
      fireEvent.click(toBeReplacedElem);

      const replacedElem = screen.getByTestId('test-replaced');
      expect(replacedElem.classList).toContain('show');
    });
  });
});
