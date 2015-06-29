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
          const event = document.createEvent('HTMLEvents');
          event.initEvent('click', true, true);
          document.documentElement.dispatchEvent(event);

          instance.state.isOverlayShown.should.equal(testCase.shownAfterClick);
        });
      });
    });
  });
});
