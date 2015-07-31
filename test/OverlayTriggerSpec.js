import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import OverlayTrigger from '../src/OverlayTrigger';
import Popover from '../src/Popover';
import Tooltip from '../src/Tooltip';

describe('OverlayTrigger', function() {
  it('Should create OverlayTrigger element', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger overlay={<div>test</div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = React.findDOMNode(instance);
    assert.equal(overlayTrigger.nodeName, 'BUTTON');
  });

  it('Should pass OverlayTrigger onClick prop to child', function() {
    const callback = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger overlay={<div>test</div>} onClick={callback}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = React.findDOMNode(instance);
    ReactTestUtils.Simulate.click(overlayTrigger);
    callback.called.should.be.true;
  });

  it('Should show after click trigger', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger trigger='click' overlay={<div>test</div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = React.findDOMNode(instance);
    ReactTestUtils.Simulate.click(overlayTrigger);

    instance.state.isOverlayShown.should.be.true;
  });

  it('Should maintain overlay classname', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger trigger='click' overlay={<div className='test-overlay'>test</div>}>
        <button>button</button>
      </OverlayTrigger>
    );

    const overlayTrigger = React.findDOMNode(instance);
    ReactTestUtils.Simulate.click(overlayTrigger);

    expect(document.getElementsByClassName('test-overlay').length).to.equal(1);
  });

  it('Should pass transition callbacks to Transition', function (done) {
    let count = 0;
    let increment = ()=> count++;

    let overlayTrigger;

    let instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger
        trigger='click'
        overlay={<div>test</div>}
        onHide={()=>{}}
        onExit={increment}
        onExiting={increment}
        onExited={()=> {
          increment();
          expect(count).to.equal(6);
          done();
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={()=> {
          increment();
          ReactTestUtils.Simulate.click(overlayTrigger);
        }}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    overlayTrigger = React.findDOMNode(instance);

    ReactTestUtils.Simulate.click(overlayTrigger);
  });


  it('Should forward requested context', function() {
    const contextTypes = {
      key: React.PropTypes.string
    };

    const contextSpy = sinon.spy();
    class ContextReader extends React.Component {
      render() {
        contextSpy(this.context.key);
        return <div />;
      }
    }
    ContextReader.contextTypes = contextTypes;

    const TriggerWithContext = OverlayTrigger.withContext(contextTypes);
    class ContextHolder extends React.Component {
      getChildContext() {
        return {key: 'value'};
      }

      render() {
        return (
          <TriggerWithContext
            trigger="click"
            overlay={<ContextReader />}
          >
            <button>button</button>
          </TriggerWithContext>
        );
      }
    }
    ContextHolder.childContextTypes = contextTypes;

    const instance = ReactTestUtils.renderIntoDocument(<ContextHolder />);
    const overlayTrigger = React.findDOMNode(instance);
    ReactTestUtils.Simulate.click(overlayTrigger);

    contextSpy.calledWith('value').should.be.true;
  });

  describe('overlay types', function() {
    [
      {
        name: 'Popover',
        overlay: (<Popover>test</Popover>)
      },
      {
        name: 'Tooltip',
        overlay: (<Tooltip>test</Tooltip>)
      }
    ].forEach(function(testCase) {
      describe(testCase.name, function() {
        let instance, overlayTrigger;

        beforeEach(function() {
          instance = ReactTestUtils.renderIntoDocument(
            <OverlayTrigger trigger="click" overlay={testCase.overlay}>
              <button>button</button>
            </OverlayTrigger>
          );
          overlayTrigger = React.findDOMNode(instance);
        });

        it('Should handle trigger without warnings', function() {
          ReactTestUtils.Simulate.click(overlayTrigger);
        });
      });
    });
  });

  describe('rootClose', function() {
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
    ].forEach(function(testCase) {
      describe(testCase.label, function() {
        let instance;

        beforeEach(function () {
          instance = ReactTestUtils.renderIntoDocument(
            <OverlayTrigger
              overlay={<div>test</div>}
              trigger='click' rootClose={testCase.rootClose}
            >
            <button>button</button>
            </OverlayTrigger>
          );
          const overlayTrigger = React.findDOMNode(instance);
          ReactTestUtils.Simulate.click(overlayTrigger);
        });

        it('Should have correct isOverlayShown state', function () {
          document.documentElement.click();

          // Need to click this way for it to propagate to document element.
          instance.state.isOverlayShown.should.equal(testCase.shownAfterClick);
        });
      });
    });

    describe('replaced overlay', function () {
      let instance;

      beforeEach(function () {
        class ReplacedOverlay extends React.Component {
          constructor(props) {
            super(props);

            this.handleClick = this.handleClick.bind(this);
            this.state = {replaced: false};
          }

          handleClick() {
            this.setState({replaced: true});
          }

          render() {
            if (this.state.replaced) {
              return (
                <div>replaced</div>
              );
            } else {
              return (
                <div>
                  <a id="replace-overlay" onClick={this.handleClick}>
                    original
                  </a>
                </div>
              );
            }
          }
        }

        instance = ReactTestUtils.renderIntoDocument(
          <OverlayTrigger
            overlay={<ReplacedOverlay />}
            trigger='click' rootClose={true}
          >
            <button>button</button>
          </OverlayTrigger>
        );
        const overlayTrigger = React.findDOMNode(instance);
        ReactTestUtils.Simulate.click(overlayTrigger);
      });

      it('Should still be shown', function () {
        // Need to click this way for it to propagate to document element.
        const replaceOverlay = document.getElementById('replace-overlay');
        replaceOverlay.click();

        instance.state.isOverlayShown.should.be.true;
      });
    });
  });
});
