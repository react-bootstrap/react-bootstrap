import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import OverlayTrigger from '../src/OverlayTrigger';
import Popover from '../src/Popover';
import Tooltip from '../src/Tooltip';

import { render } from './helpers';

describe('<OverlayTrigger>', () => {
  // Swallow extra props.
  const Div = ({ className, children }) => (
    <div className={className}>
      {children}
    </div>
  );

  it('Should create OverlayTrigger element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger overlay={<Div>test</Div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = ReactDOM.findDOMNode(instance);
    assert.equal(overlayTrigger.nodeName, 'BUTTON');
  });

  it('Should pass OverlayTrigger onClick prop to child', () => {
    const callback = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger overlay={<Div>test</Div>} onClick={callback}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = ReactDOM.findDOMNode(instance);
    ReactTestUtils.Simulate.click(overlayTrigger);
    callback.called.should.be.true;
  });

  it('Should show after click trigger', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger trigger="click" overlay={<Div>test</Div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = ReactDOM.findDOMNode(instance);
    ReactTestUtils.Simulate.click(overlayTrigger);

    instance.state.show.should.be.true;
  });

  describe('trigger handlers', () => {
    let mountPoint;

    beforeEach(() => {
      mountPoint = document.createElement('div');
      document.body.appendChild(mountPoint);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(mountPoint);
      document.body.removeChild(mountPoint);
    });

    it('Should keep trigger handlers', (done) => {
      const instance = render(
        <div>
          <OverlayTrigger trigger="focus" overlay={<Div>test</Div>}>
            <button onBlur={() => done()}>button</button>
          </OverlayTrigger>
          <input id="target" />
        </div>
      , mountPoint);

      const overlayTrigger = instance.firstChild;
      ReactTestUtils.Simulate.blur(overlayTrigger);
    });
  });

  it('Should maintain overlay classname', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger trigger="click" overlay={<Div className="test-overlay">test</Div>}>
        <button>button</button>
      </OverlayTrigger>
    );

    const overlayTrigger = ReactDOM.findDOMNode(instance);
    ReactTestUtils.Simulate.click(overlayTrigger);

    expect(document.getElementsByClassName('test-overlay').length).to.equal(1);
  });

  it('Should pass transition callbacks to Transition', (done) => {
    let count = 0;
    const increment = () => count++;

    let overlayTrigger;

    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger
        trigger="click"
        overlay={<Div>test</Div>}
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
          ReactTestUtils.Simulate.click(overlayTrigger);
        }}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    overlayTrigger = ReactDOM.findDOMNode(instance);
    ReactTestUtils.Simulate.click(overlayTrigger);
  });


  it('Should forward requested context', () => {
    const contextTypes = {
      key: React.PropTypes.string,
    };

    const contextSpy = sinon.spy();

    class ContextReader extends React.Component {
      render() {
        contextSpy(this.context.key);
        return <div />;
      }
    }

    ContextReader.contextTypes = contextTypes;

    class ContextHolder extends React.Component {
      getChildContext() {
        return { key: 'value' };
      }

      render() {
        return (
          <OverlayTrigger
            trigger="click"
            overlay={<ContextReader />}
          >
            <button>button</button>
          </OverlayTrigger>
        );
      }
    }
    ContextHolder.childContextTypes = contextTypes;

    const instance = ReactTestUtils.renderIntoDocument(<ContextHolder />);
    const overlayTrigger = ReactDOM.findDOMNode(instance);
    ReactTestUtils.Simulate.click(overlayTrigger);

    contextSpy.calledWith('value').should.be.true;
  });

  describe('overlay types', () => {
    [
      {
        name: 'Popover',
        overlay: (<Popover id="test-popover">test</Popover>)
      },
      {
        name: 'Tooltip',
        overlay: (<Tooltip id="test-tooltip">test</Tooltip>)
      }
    ].forEach(testCase => {
      describe(testCase.name, () => {
        let instance;
        let overlayTrigger;

        beforeEach(() => {
          instance = ReactTestUtils.renderIntoDocument(
            <OverlayTrigger trigger="click" overlay={testCase.overlay}>
              <button>button</button>
            </OverlayTrigger>
          );
          overlayTrigger = ReactDOM.findDOMNode(instance);
        });

        it('Should handle trigger without warnings', () => {
          ReactTestUtils.Simulate.click(overlayTrigger);
        });
      });
    });
  });

  describe('rootClose', () => {
    [
      {
        label: 'true',
        rootClose: true,
        shownAfterClick: false
      },
      {
        label: 'default (false)',
        rootClose: null,
        shownAfterClick: true
      }
    ].forEach(testCase => {
      describe(testCase.label, () => {
        let instance;

        beforeEach(() => {
          instance = ReactTestUtils.renderIntoDocument(
            <OverlayTrigger
              overlay={<Div>test</Div>}
              trigger="click" rootClose={testCase.rootClose}
            >
              <button>button</button>
            </OverlayTrigger>
          );
          const overlayTrigger = ReactDOM.findDOMNode(instance);
          ReactTestUtils.Simulate.click(overlayTrigger);
        });

        it('Should have correct show state', () => {
          document.documentElement.click();

          // Need to click this way for it to propagate to document element.
          instance.state.show.should.equal(testCase.shownAfterClick);
        });
      });
    });

    describe('replaced overlay', () => {
      let instance;

      beforeEach(() => {
        class ReplacedOverlay extends React.Component {
          constructor(props) {
            super(props);

            this.handleClick = this.handleClick.bind(this);
            this.state = { replaced: false };
          }

          handleClick() {
            this.setState({ replaced: true });
          }

          render() {
            if (this.state.replaced) {
              return (
                <div>replaced</div>
              );
            }

            return (
              <div>
                <a id="replace-overlay" onClick={this.handleClick}>
                  original
                </a>
              </div>
            );
          }
        }

        instance = ReactTestUtils.renderIntoDocument(
          <OverlayTrigger
            overlay={<ReplacedOverlay />}
            trigger="click"
            rootClose
          >
            <button>button</button>
          </OverlayTrigger>
        );
        const overlayTrigger = ReactDOM.findDOMNode(instance);
        ReactTestUtils.Simulate.click(overlayTrigger);
      });

      it('Should still be shown', () => {
        // Need to click this way for it to propagate to document element.
        const replaceOverlay = document.getElementById('replace-overlay');
        replaceOverlay.click();

        instance.state.show.should.be.true;
      });
    });
  });
});
