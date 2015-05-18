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

  describe('#calcOverlayPosition()', function() {
    [
      {
        placement: 'left',
        noOffset: [50, 300, null, '50%'],
        offsetBefore: [-200, 150, null, '0%'],
        offsetAfter: [300, 450, null, '100%']
      },
      {
        placement: 'top',
        noOffset: [200, 150, '50%', null],
        offsetBefore: [50, -100, '0%', null],
        offsetAfter: [350, 400, '100%', null]
      },
      {
        placement: 'bottom',
        noOffset: [200, 450, '50%', null],
        offsetBefore: [50, 200, '0%', null],
        offsetAfter: [350, 700, '100%', null]
      },
      {
        placement: 'right',
        noOffset: [350, 300, null, '50%'],
        offsetBefore: [100, 150, null, '0%'],
        offsetAfter: [600, 450, null, '100%']
      }
    ].forEach(function(testCase) {
      describe(`placement = ${testCase.placement}`, function() {
        let instance;

        beforeEach(function() {
          instance = ReactTestUtils.renderIntoDocument(
            <OverlayTrigger
              placement={testCase.placement}
              containerPadding={50}
              overlay={<div>test</div>}
            >
              <button>button</button>
            </OverlayTrigger>
          );

          instance.getOverlayDOMNode = sinon.stub().returns({
            offsetHeight: 200, offsetWidth: 200
          });
          instance._getContainerDimensions = sinon.stub().returns({
            width: 600, height: 600, scroll: 100
          });
        });

        function checkPosition(expected) {
          const [
            overlayLeft,
            overlayTop,
            arrowOffsetLeft,
            arrowOffsetTop
          ] = expected;

          it('Should calculate the correct position', function() {
            instance.calcOverlayPosition().should.eql(
              {overlayLeft, overlayTop, arrowOffsetLeft, arrowOffsetTop}
            );
          });
        }

        describe('no viewport offset', function() {
          beforeEach(function() {
            instance.getPosition = sinon.stub().returns({
              left: 250, top: 350, width: 100, height: 100
            });
          });

          checkPosition(testCase.noOffset);
        });

        describe('viewport offset before', function() {
          beforeEach(function() {
            instance.getPosition = sinon.stub().returns({
              left: 0, top: 100, width: 100, height: 100
            });
          });

          checkPosition(testCase.offsetBefore);
        });

        describe('viewport offset after', function() {
          beforeEach(function() {
            instance.getPosition = sinon.stub().returns({
              left: 500, top: 600, width: 100, height: 100
            });
          });

          checkPosition(testCase.offsetAfter);
        });
      });
    });
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
