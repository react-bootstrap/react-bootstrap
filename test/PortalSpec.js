import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Portal from '../src/Portal';

describe('Portal', function () {
  let instance;

  let Overlay = React.createClass({
    render() {
      return (
        <div>
          <Portal ref='p' {...this.props}>{this.props.overlay}</Portal>
        </div>
      );
    },
    getOverlayDOMNode(){
      return this.refs.p.getOverlayDOMNode();
    }
  });

  afterEach(function() {
    if (instance && ReactTestUtils.isCompositeComponent(instance) && instance.isMounted()) {
      React.unmountComponentAtNode(React.findDOMNode(instance));
    }
  });

  it('Should render overlay into container (DOMNode)', function() {
    let container = document.createElement('div');

    instance = ReactTestUtils.renderIntoDocument(
      <Overlay container={container} overlay={<div id="test1" />} />
    );

    assert.equal(container.querySelectorAll('#test1').length, 1);
  });

  it('Should render overlay into container (ReactComponent)', function() {
    let Container = React.createClass({
      render() {
        return <Overlay container={this} overlay={<div id="test1" />} />;
      }
    });

    instance = ReactTestUtils.renderIntoDocument(
      <Container />
    );

    assert.equal(React.findDOMNode(instance).querySelectorAll('#test1').length, 1);
  });

  it('Should not render a null overlay', function() {
    let Container = React.createClass({
      render() {
        return <Overlay ref='overlay' container={this} overlay={null} />;
      }
    });

    instance = ReactTestUtils.renderIntoDocument(
      <Container />
    );

    assert.equal(instance.refs.overlay.getOverlayDOMNode(), null);
  });

  it('Should render only an overlay', function() {
    let OnlyOverlay = React.createClass({
      render() {
        return <Portal ref='p' {...this.props}>{this.props.overlay}</Portal>;
      }
    });

    let overlayInstance = ReactTestUtils.renderIntoDocument(
      <OnlyOverlay overlay={<div id="test1" />} />
    );

    assert.equal(overlayInstance.refs.p.getOverlayDOMNode().nodeName, 'DIV');
  });
});
