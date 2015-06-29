import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ModalTrigger from '../src/ModalTrigger';
import { shouldWarn } from './helpers';


describe('ModalTrigger', function() {

  afterEach(()=> {
    if ( console.warn.called ) {
      shouldWarn('The `ModalTrigger` component is deprecated');
    }
  });

  it('Should warn about deprecated Component', function() {
    ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>}>
        <button>button</button>
      </ModalTrigger>
    );

    shouldWarn('The `ModalTrigger` component is deprecated');
  });

  it('Should create ModalTrigger element', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>}>
        <button>button</button>
      </ModalTrigger>
    );
    const modalTrigger = React.findDOMNode(instance);
    assert.equal(modalTrigger.nodeName, 'BUTTON');
  });

  it('Should pass ModalTrigger onMouseOver prop to child', function() {
    const callback = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>} onMouseOver={callback}>
        <button>button</button>
      </ModalTrigger>
    );
    const modalTrigger = React.findDOMNode(instance);
    ReactTestUtils.Simulate.mouseOver(modalTrigger);
    callback.called.should.be.true;
  });

  it('Should pass ModalTrigger onMouseOut prop to child', function() {
    const callback = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>} onMouseOut={callback}>
        <button>button</button>
      </ModalTrigger>
    );
    const modalTrigger = React.findDOMNode(instance);
    ReactTestUtils.Simulate.mouseOut(modalTrigger);
    callback.called.should.be.true;
  });

  it('Should pass ModalTrigger onFocus prop to child', function() {
    const callback = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>} onFocus={callback}>
        <button>button</button>
      </ModalTrigger>
    );
    const modalTrigger = React.findDOMNode(instance);
    ReactTestUtils.Simulate.focus(modalTrigger);
    callback.called.should.be.true;
  });

  it('Should pass ModalTrigger onBlur prop to child', function() {
    const callback = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>} onBlur={callback}>
        <button>button</button>
      </ModalTrigger>
    );
    const modalTrigger = React.findDOMNode(instance);
    ReactTestUtils.Simulate.blur(modalTrigger);
    callback.called.should.be.true;
  });

  // This is just a copy of the test case for OverlayTrigger.
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

    const TriggerWithContext = ModalTrigger.withContext(contextTypes);
    class ContextHolder extends React.Component {
      getChildContext() {
        return {key: 'value'};
      }

      render() {
        return (
          <TriggerWithContext
            trigger="click"
            modal={<ContextReader />}
          >
            <button>button</button>
          </TriggerWithContext>
        );
      }
    }
    ContextHolder.childContextTypes = contextTypes;

    const instance = ReactTestUtils.renderIntoDocument(<ContextHolder />);
    const modalTrigger = React.findDOMNode(instance);
    ReactTestUtils.Simulate.click(modalTrigger);

    contextSpy.calledWith('value').should.be.true;
  });
});
