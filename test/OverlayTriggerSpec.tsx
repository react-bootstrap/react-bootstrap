import PropTypes from 'prop-types';
import * as React from 'react';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import sinon from 'sinon';
import { expect } from 'chai';
import OverlayTrigger from '../src/OverlayTrigger';
// import Popover from '../src/Popover';
// import Tooltip from '../src/Tooltip';

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
    const { getByTestId } = render(
      <React.StrictMode>
        <OverlayTrigger overlay={<TemplateDiv>test</TemplateDiv>}>
          <button type="button" data-testid="test-button">
            button
          </button>
        </OverlayTrigger>
      </React.StrictMode>,
    );
    const buttonElem = getByTestId('test-button');
    fireEvent.click(buttonElem);
  });

  it('Should render OverlayTrigger element', () => {
    const { getByTestId } = render(
      <OverlayTrigger overlay={<TemplateDiv>test</TemplateDiv>}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    const buttonElem = getByTestId('test-button');
    buttonElem.should.exist;
  });

  it('Should show after click trigger', () => {
    const { queryByTestId, getByTestId } = render(
      <OverlayTrigger trigger="click" overlay={<TemplateDiv />}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    let overlayElem = queryByTestId('test-overlay');
    const buttonElem = getByTestId('test-button');

    expect(overlayElem).to.be.null;
    fireEvent.click(buttonElem);

    overlayElem = queryByTestId('test-overlay');
    expect(overlayElem).to.not.be.null;
  });

  it('Should accept a function as an overlay render prop', () => {
    const overlay = () => <TemplateDiv />;
    const { queryByTestId, getByTestId } = render(
      <OverlayTrigger trigger="click" overlay={overlay}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    let overlayElem = queryByTestId('test-overlay');
    const buttonElem = getByTestId('test-button');

    expect(overlayElem).to.be.null;

    fireEvent.click(buttonElem);

    overlayElem = queryByTestId('test-overlay');
    expect(overlayElem).to.not.be.null;
  });

  it('Should show the tooltip when transitions are disabled', () => {
    const overlay = ({ className }: any) => (
      <TemplateDiv className={`${className} test`} />
    );
    const { getByTestId, queryByTestId } = render(
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
    let overlayElem = queryByTestId('test-overlay');
    const buttonElem = getByTestId('test-button');

    expect(overlayElem).to.be.null;

    fireEvent.focus(buttonElem);

    overlayElem = queryByTestId('test-overlay');
    expect(overlayElem).to.not.be.null;

    overlayElem!.classList.contains('show').should.be.true;
  });

  it('Should call OverlayTrigger onClick prop to child', () => {
    const callback = sinon.spy();

    const { getByTestId } = render(
      <OverlayTrigger overlay={<TemplateDiv>test</TemplateDiv>} trigger="click">
        <button type="button" onClick={callback} data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    const buttonElem = getByTestId('test-button');
    fireEvent.click(buttonElem);

    callback.should.have.been.called;
  });

  it('Should be controllable', () => {
    const callback = sinon.spy();

    const { getByTestId } = render(
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
    const overlayElem = getByTestId('test-overlay');
    const buttonElem = getByTestId('test-button');

    overlayElem.classList.contains('show').should.be.true;
    fireEvent.click(buttonElem);

    callback.should.have.been.calledOnce.and.calledWith(false);
  });

  it('Should show after mouseover trigger', async () => {
    render(
      <OverlayTrigger overlay={<TemplateDiv />}>
        <span data-testid="test-hover">hover me</span>
      </OverlayTrigger>,
    );
    const overlayElem = screen.queryByTestId('test-overlay');
    const hoverElem = screen.getByTestId('test-hover');

    expect(overlayElem).to.be.null;

    fireEvent.mouseOver(hoverElem);

    await waitFor(
      () => expect(screen.queryByTestId('test-overlay')).to.not.be.null,
    );

    fireEvent.mouseOut(hoverElem);

    await waitFor(
      () => expect(screen.queryByTestId('test-overlay')).to.be.null,
    );
  });

  it('Should not set aria-describedby if the state is not show', () => {
    const { getByTestId } = render(
      <OverlayTrigger trigger="click" overlay={<TemplateDiv />}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    const buttonElem = getByTestId('test-button');

    expect(buttonElem.getAttribute('aria-describedby')).to.be.null;
  });

  // TODO: This test will block others from running
  // it('Should set aria-describedby for tooltips if the state is show', async () => {
  //   const { getByTestId } = render(
  //     <OverlayTrigger trigger="click" overlay={<TemplateDiv />}>
  //       <button type="button" data-testid="test-button">
  //         button
  //       </button>
  //     </OverlayTrigger>,
  //   );
  //   const buttonElem = getByTestId('test-button');

  //   fireEvent.click(buttonElem);

  //   // aria-describedby gets assigned after a slight delay
  //   await waitFor(
  //     () => buttonElem.getAttribute('aria-describedby')!.should.exist,
  //   );

  //   buttonElem.getAttribute('aria-describedby')!.should.equal('test-tooltip');
  // });

  it('Should keep trigger handlers', () => {
    const onClickSpy = sinon.spy();
    const { getByTestId } = render(
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

    fireEvent.click(getByTestId('test-button'));

    onClickSpy.should.be.called;
  });

  it('Should maintain overlay classname', () => {
    const { getByTestId, queryByTestId } = render(
      <OverlayTrigger
        trigger="click"
        overlay={<TemplateDiv className="test-overlay">test</TemplateDiv>}
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    const buttonElem = getByTestId('test-button');
    fireEvent.click(buttonElem);

    const overlayElem = queryByTestId('test-overlay');
    overlayElem!.should.not.be.null;
    overlayElem!.classList.contains('test-overlay').should.be.true;
  });

  it('Should pass transition callbacks to Transition', async () => {
    const increment = sinon.spy();
    const onEnteredSpy = sinon.spy();
    const onExitedSpy = sinon.spy();

    const { getByTestId } = render(
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

    fireEvent.click(getByTestId('test-button'));

    await screen.findByTestId('test-overlay');

    await waitFor(() => onEnteredSpy.callCount.should.equal(1));

    fireEvent.click(getByTestId('test-button'));

    await waitForElementToBeRemoved(() => getByTestId('test-overlay'));

    await waitFor(() => onExitedSpy.callCount.should.equal(1));
    increment.callCount.should.equal(4);
  });

  it('Should forward requested context', () => {
    const contextTypes = {
      key: PropTypes.string,
    };

    const contextSpy = sinon.spy();

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

    const { getByTestId } = render(<ContextHolder />);
    const buttonElem = getByTestId('test-button');
    fireEvent.click(buttonElem);

    contextSpy.calledWith('value').should.be.true;
  });

  // TODO: This test will block others from running
  // it('Should handle popover trigger without warnings', async () => {
  //   const { getByTestId } = render(
  //     <OverlayTrigger
  //       trigger="click"
  //       overlay={
  //         <Popover id="test-popover" data-testid="test-overlay">
  //           test
  //         </Popover>
  //       }
  //     >
  //       <button type="button" data-testid="test-button">
  //         button
  //       </button>
  //     </OverlayTrigger>,
  //   );

  //   const buttonElem = getByTestId('test-button');
  //   fireEvent.click(buttonElem);

  //   const overlay = await screen.findByTestId('test-overlay');
  //   overlay.should.exist;
  // });

  // TODO: This test will block others from running
  // it('Should handle tooltip trigger without warnings', async () => {
  //   const { getByTestId } = render(
  //     <OverlayTrigger
  //       trigger="click"
  //       overlay={
  //         <Tooltip id="test-tooltip" data-testid="test-overlay">
  //           test
  //         </Tooltip>
  //       }
  //     >
  //       <button type="button" data-testid="test-button">
  //         button
  //       </button>
  //     </OverlayTrigger>,
  //   );

  //   const buttonElem = getByTestId('test-button');
  //   fireEvent.click(buttonElem);

  //   const overlay = await screen.findByTestId('test-overlay');
  //   overlay.should.exist;
  // });

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
          const { getByTestId } = render(
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
          const buttonElem = getByTestId('test-button');
          fireEvent.click(buttonElem);
          const overlayElem = getByTestId('test-overlay');
          overlayElem.classList.contains('show').should.be.true;

          // Need to click this way for it to propagate to document element.
          act(() => {
            document.documentElement.click();
          });

          overlayElem.classList
            .contains('show')
            .should.equal(testCase.shownAfterClick);
        });
      });
    });

    it('should hide after clicking on trigger', () => {
      const { getByTestId } = render(
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
      const buttonElem = getByTestId('test-button');
      fireEvent.click(buttonElem);

      let overlayElem = getByTestId('test-overlay');
      overlayElem.classList.contains('show').should.be.true;

      // Need to click this way for it to propagate to document element.
      fireEvent.click(buttonElem);
      overlayElem = getByTestId('test-overlay');
      overlayElem.classList.contains('show').should.be.false;
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

      const { getByTestId } = render(
        <OverlayTrigger overlay={<ReplacedOverlay />} trigger="click" rootClose>
          <button type="button" data-testid="test-button">
            button
          </button>
        </OverlayTrigger>,
      );
      const buttonElem = getByTestId('test-button');
      fireEvent.click(buttonElem);

      const toBeReplacedElem = getByTestId('test-not-replaced');
      fireEvent.click(toBeReplacedElem);

      const replacedElem = getByTestId('test-replaced');
      replacedElem.classList.contains('show').should.be.true;
    });
  });
});
