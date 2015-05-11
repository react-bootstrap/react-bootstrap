import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import OverlayTrigger from '../src/OverlayTrigger';

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
});
