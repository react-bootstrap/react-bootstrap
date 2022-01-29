import PropTypes from 'prop-types';
import * as React from 'react';

import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';
import { expect } from 'chai';
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

  it('Should show after mouseover trigger', (done) => {
    const clock = sinon.useFakeTimers();

    const { getByTestId, queryByTestId } = render(
      <OverlayTrigger overlay={<TemplateDiv />}>
        <span data-testid="test-hover">hover me</span>
      </OverlayTrigger>,
    );
    let overlayElem = queryByTestId('test-overlay');
    const hoverElem = getByTestId('test-hover');

    expect(overlayElem).to.be.null;

    fireEvent.mouseOver(hoverElem);

    overlayElem = queryByTestId('test-overlay');
    expect(overlayElem).to.not.be.null;

    fireEvent.mouseOut(hoverElem);

    clock.tick(50);

    overlayElem = queryByTestId('test-overlay');
    expect(overlayElem).to.be.null;

    clock.restore();
    done();
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

  it('Should set aria-describedby for tooltips if the state is show', (done) => {
    const { getByTestId } = render(
      <OverlayTrigger trigger="click" overlay={<TemplateDiv />}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );
    let buttonElem = getByTestId('test-button');

    fireEvent.click(buttonElem);
    buttonElem = getByTestId('test-button');

    // aria-describedby gets assigned after a slight delay
    setTimeout(() => {
      buttonElem.getAttribute('aria-describedby')!.should.equal('test-tooltip');
      done();
    });
  });

  describe('trigger handlers', () => {
    it('Should keep trigger handlers', (done) => {
      const { getByTestId } = render(
        <div>
          <OverlayTrigger
            trigger="click"
            overlay={<TemplateDiv>test</TemplateDiv>}
          >
            <button
              type="button"
              data-testid="test-button"
              onClick={() => done()}
            >
              button
            </button>
          </OverlayTrigger>
          <input id="target" />
        </div>,
      );
      const buttonElem = getByTestId('test-button');
      fireEvent.click(buttonElem);
    });
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

  it('Should pass transition callbacks to Transition', (done) => {
    const increment = sinon.spy();

    const { getByTestId } = render(
      <OverlayTrigger
        trigger="click"
        overlay={<TemplateDiv>test</TemplateDiv>}
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
          increment.callCount.should.equal(6);
          done();
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={() => {
          increment();
          const buttonElem = getByTestId('test-button');
          fireEvent.click(buttonElem);
        }}
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>,
    );

    const buttonElem = getByTestId('test-button');
    fireEvent.click(buttonElem);
  });

  it('Should forward requested context', () => {
    const contextTypes = {
      key: PropTypes.string,
    };

    const contextSpy = sinon.spy();

    class ContextReader extends React.Component {
      static contextTypes = contextTypes;

      render() {
        contextSpy(this.context.key);
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

  describe('overlay types', () => {
    [
      {
        name: 'Popover',
        overlay: <Popover id="test-popover">test</Popover>,
      },
      {
        name: 'Tooltip',
        overlay: <Tooltip id="test-tooltip">test</Tooltip>,
      },
    ].forEach((testCase) => {
      describe(testCase.name, () => {
        it('Should handle trigger without warnings', (done) => {
          const { getByTestId } = render(
            <OverlayTrigger trigger="click" overlay={testCase.overlay}>
              <button type="button" data-testid="test-button">
                button
              </button>
            </OverlayTrigger>,
          );
          const buttonElem = getByTestId('test-button');
          fireEvent.click(buttonElem);

          // The use of Popper means that errors above will show up
          //  asynchronously.
          setTimeout(done, 10);
        });
      });
    });
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
          document.documentElement.click();

          overlayElem.classList
            .contains('show')
            .should.equal(testCase.shownAfterClick);
        });
      });
    });

    describe('clicking on trigger to hide', () => {
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
    });

    describe('replaced overlay', () => {
      it('Should still be shown', () => {
        const ReplacedOverlay = React.forwardRef(
          ({ className = '' }: any, ref: any) => {
            const [state, setState] = React.useState(false);
            const handleClick = () => {
              setState(true);
            };

            if (state) {
              return (
                <div
                  data-testid="test-replaced"
                  className={className}
                  ref={ref}
                >
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
          <OverlayTrigger
            overlay={<ReplacedOverlay />}
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

        const toBeReplacedElem = getByTestId('test-not-replaced');
        fireEvent.click(toBeReplacedElem);

        const replacedElem = getByTestId('test-replaced');
        replacedElem.classList.contains('show').should.be.true;
      });
    });
  });
});
