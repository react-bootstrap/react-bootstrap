/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React = require('react/addons');
var BootstrapMixin = require('../lib/BootstrapMixin');

var ReactTestUtils;
var Component;

describe('Button', function () {
  beforeEach(function() {
    ReactTestUtils = React.addons.ReactTestUtils;

    Component = React.createClass({
      mixins: [BootstrapMixin],

      render: function () {
        return this.transferPropsTo(
          React.DOM.button
        );
      }
    });
  });

  describe('#extendClassName', function () {
    it('should return blank', function () {
      var instance = Component({}, 'content');
      assert.equal(instance.extendClassName(), '');
    });

    it('should return props.className', function () {
      var className = 'css-class css-class2';
      var instance = Component({className: className}, 'content');
      assert.equal(instance.extendClassName(), className);
    });

    it('should return "col"', function () {
      var instance = Component({bsClass: 'column'}, 'content');
      assert.equal(instance.extendClassName(), 'col');
    });

    it('should return "btn"', function () {
      var instance = Component({bsClass: 'button'}, 'content');
      assert.equal(instance.extendClassName(), 'btn');
    });

    it('should return "btn-group"', function () {
      var instance = Component({bsClass: 'button-group'}, 'content');
      assert.equal(instance.extendClassName(), 'btn-group');
    });

    it('should return "label"', function () {
      var instance = Component({bsClass: 'label'}, 'content');
      assert.equal(instance.extendClassName(), 'label');
    });

    it('should return "alert"', function () {
      var instance = Component({bsClass: 'alert'}, 'content');
      assert.equal(instance.extendClassName(), 'alert');
    });

    it('should return "input-group"', function () {
      var instance = Component({bsClass: 'input-group'}, 'content');
      assert.equal(instance.extendClassName(), 'input-group');
    });

    it('should return "form"', function () {
      var instance = Component({bsClass: 'form'}, 'content');
      assert.equal(instance.extendClassName(), 'form');
    });

    it('should return "panel"', function () {
      var instance = Component({bsClass: 'panel'}, 'content');
      assert.equal(instance.extendClassName(), 'panel');
    });

    it('should return "btn btn-default"', function () {
      var instance = Component({bsClass: 'button', bsStyle: 'default'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-default');
    });

    it('should return "btn btn-default"', function () {
      var instance = Component({bsClass: 'button', bsStyle: 'default'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-default');
    });

    it('should return "btn btn-primary"', function () {
      var instance = Component({bsClass: 'button', bsStyle: 'primary'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-primary');
    });

    it('should return "btn btn-success"', function () {
      var instance = Component({bsClass: 'button', bsStyle: 'success'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-success');
    });

    it('should return "btn btn-info"', function () {
      var instance = Component({bsClass: 'button', bsStyle: 'info'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-info');
    });

    it('should return "btn btn-link"', function () {
      var instance = Component({bsClass: 'button', bsStyle: 'link'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-link');
    });

    it('should return "btn btn-inline"', function () {
      var instance = Component({bsClass: 'button', bsStyle: 'inline'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-inline');
    });

    it('should return "btn btn-lg"', function () {
      var instance = Component({bsClass: 'button', bsSize: 'large'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-lg');
    });

    it('should return "btn btn-md"', function () {
      var instance = Component({bsClass: 'button', bsSize: 'medium'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-md');
    });

    it('should return "btn btn-sm"', function () {
      var instance = Component({bsClass: 'button', bsSize: 'small'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-sm');
    });

    it('should return "btn btn-xs"', function () {
      var instance = Component({bsClass: 'button', bsSize: 'xsmall'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-xs');
    });

    it('should return "btn btn-variation"', function () {
      var instance = Component({bsClass: 'button', bsVariation: 'variation'}, 'content');
      assert.equal(instance.extendClassName(), 'btn btn-variation');
    });
  });
});