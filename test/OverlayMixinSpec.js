import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import OverlayMixin from '../src/OverlayMixin';

describe('OverlayMixin', function () {
  let instance;

  let Overlay = React.createClass({
    mixins: [OverlayMixin],

    render() {
      return <div />;
    },

    renderOverlay() {
      return this.props.overlay;
    }
  });

  afterEach(function() {
    if (instance && ReactTestUtils.isCompositeComponent(instance) && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode());
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

    assert.equal(instance.getDOMNode().querySelectorAll('#test1').length, 1);
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
      mixins: [OverlayMixin],

      render() {
        return null;
      },

      renderOverlay() {
        return this.props.overlay;
      }
    });

    let overlayInstance = ReactTestUtils.renderIntoDocument(
      <OnlyOverlay overlay={<div id="test1" />} />
    );

    assert.equal(overlayInstance.getOverlayDOMNode().nodeName, 'DIV');
  });
});
