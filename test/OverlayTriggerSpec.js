import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

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

  it('Should not set aria-describedby if the state is not show', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger trigger="click" overlay={<Div>test</Div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = ReactDOM.findDOMNode(instance);

    assert.equal(overlayTrigger.getAttribute('aria-describedby'), null);
  });

  it('Should set aria-describedby if the state is show', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger trigger="click" overlay={<Div id="overlayid">test</Div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = ReactDOM.findDOMNode(instance);
    ReactTestUtils.Simulate.click(overlayTrigger);

    overlayTrigger.getAttribute('aria-describedby').should.be;
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
      key: PropTypes.string,
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
          // Need to click this way for it to propagate to document element.
          document.documentElement.click();

          expect(instance.state.show).to.equal(testCase.shownAfterClick);
        });
      });
    });

    describe('clicking on trigger to hide', () => {
      let mountNode;

      beforeEach(() => {
        mountNode = document.createElement('div');
        document.body.appendChild(mountNode);
      });

      afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        document.body.removeChild(mountNode);
      });

      it('should hide after clicking on trigger', () => {
        const instance = ReactDOM.render(
          <OverlayTrigger
            overlay={<Div>test</Div>}
            trigger="click"
            rootClose
          >
            <button>button</button>
          </OverlayTrigger>,
          mountNode
        );

        const node = ReactDOM.findDOMNode(instance);
        expect(instance.state.show).to.be.false;

        node.click();
        expect(instance.state.show).to.be.true;

        // Need to click this way for it to propagate to document element.
        node.click();
        expect(instance.state.show).to.be.false;
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
