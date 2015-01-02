/*global describe, it, assert, afterEach */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var OverlayMixin   = require('../lib/OverlayMixin');

describe('OverlayMixin', function () {
  var instance;

  var Overlay = React.createClass({
    mixins: [OverlayMixin],

    render: function() {
      return <div />;
    },

    renderOverlay: function() {
      return this.props.overlay;
    }
  });

  afterEach(function() {
    if (instance && ReactTestUtils.isCompositeComponent(instance) && instance.isMounted()) {
      React.unmountComponentAtNode(instance.getDOMNode().parent);
    }
  });

  it('Should render overlay into container (DOMNode)', function() {
    var container = document.createElement('div');

    instance = ReactTestUtils.renderIntoDocument(
      <Overlay container={container} overlay={<div id="test1" />} />
    );

    assert.equal(container.querySelectorAll('#test1').length, 1);
  });

  it('Should render overlay into container (ReactComponent)', function() {
    var Container = React.createClass({
      render: function() {
        return <Overlay container={this} overlay={<div id="test1" />} />;
      }
    });

    instance = ReactTestUtils.renderIntoDocument(
      <Container />
    );

    assert.equal(instance.getDOMNode().querySelectorAll('#test1').length, 1);
  });

  it('Should not render a null overlay', function() {
    var Container = React.createClass({
      render: function() {
        return <Overlay ref='overlay' container={this} overlay={null} />;
      }
    });

    instance = ReactTestUtils.renderIntoDocument(
      <Container />
    );

    assert.equal(instance.refs.overlay.getOverlayDOMNode(), null);
  });
});
