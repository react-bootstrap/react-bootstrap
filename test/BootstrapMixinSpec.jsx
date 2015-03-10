/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var BootstrapMixin = require('../lib/BootstrapMixin');

var Component;

describe('BootstrapMixin', function () {
  beforeEach(function() {
    Component = React.createClass({
      mixins: [BootstrapMixin],

      render: function () {
        return React.DOM.button(this.props);
      }
    });
  });

  describe('#getBsClassSet', function () {
    it('should return blank', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {});
    });

    it('should return "col"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='column'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'col': true});
    });

    it('should return "btn"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true});
    });

    it('should return "btn-group"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button-group'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn-group': true});
    });

    it('should return "label"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='label'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'label': true});
    });

    it('should return "alert"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='alert'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'alert': true});
    });

    it('should return "input-group"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='input-group'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'input-group': true});
    });

    it('should return "form"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='form'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'form': true});
    });

    it('should return "panel"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='panel'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'panel': true});
    });

    it('should return "btn btn-default"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button' bsStyle='default'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-default': true});
    });

    it('should return "btn btn-primary"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button' bsStyle='primary'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-primary': true});
    });

    it('should return "btn btn-success"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button' bsStyle='success'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-success': true});
    });

    it('should return "btn btn-info"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button' bsStyle='info'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-info': true});
    });

    it('should return "btn btn-link"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button' bsStyle='link'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-link': true});
    });

    it('should return "btn btn-inline"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button' bsStyle='inline'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-inline': true});
    });

    it('should return "btn btn-lg"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button' bsSize='large'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-lg': true});
    });

    it('should return "btn btn-md"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button' bsSize='medium'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-md': true});
    });

    it('should return "btn btn-sm"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button' bsSize='small'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-sm': true});
    });

    it('should return "btn btn-xs"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button' bsSize='xsmall'>
          content
        </Component>
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-xs': true});
    });

    it('should return  "btn-title"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        <Component bsClass='button'>
          content
        </Component>
      );
      assert.equal(instance.prefixClass('title'), 'btn-title');
    });
  });
});
