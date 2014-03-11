/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var BootstrapMixin = require('../cjs/BootstrapMixin');

var Component;

describe('BootstrapMixin', function () {
  beforeEach(function() {
    Component = React.createClass({
      mixins: [BootstrapMixin],

      render: function () {
        return this.transferPropsTo(
          React.DOM.button()
        );
      }
    });
  });

  describe('#getBsClassSet', function () {
    it('should return blank', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {});
    });

    it('should return "col"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'column'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'col': true});
    });

    it('should return "btn"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true});
    });

    it('should return "btn-group"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button-group'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn-group': true});
    });

    it('should return "label"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'label'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'label': true});
    });

    it('should return "alert"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'alert'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'alert': true});
    });

    it('should return "input-group"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'input-group'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'input-group': true});
    });

    it('should return "form"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'form'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'form': true});
    });

    it('should return "panel"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'panel'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'panel': true});
    });

    it('should return "btn btn-default"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsStyle: 'default'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-default': true});
    });

    it('should return "btn btn-default"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsStyle: 'default'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-default': true});
    });

    it('should return "btn btn-primary"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsStyle: 'primary'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-primary': true});
    });

    it('should return "btn btn-success"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsStyle: 'success'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-success': true});
    });

    it('should return "btn btn-info"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsStyle: 'info'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-info': true});
    });

    it('should return "btn btn-link"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsStyle: 'link'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-link': true});
    });

    it('should return "btn btn-inline"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsStyle: 'inline'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-inline': true});
    });

    it('should return "btn btn-lg"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsSize: 'large'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-lg': true});
    });

    it('should return "btn btn-md"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsSize: 'medium'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-md': true});
    });

    it('should return "btn btn-sm"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsSize: 'small'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-sm': true});
    });

    it('should return "btn btn-xs"', function () {
      var instance = ReactTestUtils.renderIntoDocument(
        Component({bsClass: 'button', bsSize: 'xsmall'}, 'content')
      );
      assert.deepEqual(instance.getBsClassSet(), {'btn': true, 'btn-xs': true});
    });
  });
});