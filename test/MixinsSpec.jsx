/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React            = require('react');
var ReactTestUtils   = require('react/lib/ReactTestUtils');
var createObjectFrom = require('react/lib/createObjectFrom');
var BootstrapMixin   = require('../cjs/BootstrapMixin');

var LargeMixin   = require('../cjs/LargeMixin');
var MediumMixin  = require('../cjs/MediumMixin');
var SmallMixin   = require('../cjs/SmallMixin');
var XSmallMixin  = require('../cjs/XSmallMixin');

var DefaultMixin = require('../cjs/DefaultMixin');
var PrimaryMixin = require('../cjs/PrimaryMixin');
var SuccessMixin = require('../cjs/SuccessMixin');
var InfoMixin    = require('../cjs/InfoMixin');
var WarningMixin = require('../cjs/WarningMixin');
var DangerMixin  = require('../cjs/DangerMixin');
var LinkMixin    = require('../cjs/LinkMixin');
var InlineMixin  = require('../cjs/InlineMixin');

describe('Mixins', function () {
  var testMixins = function (TestMixins, expectedClassName) {
    var expectedClasses = createObjectFrom(expectedClassName.split(' '));
    var Component = React.createClass({
      mixins: [BootstrapMixin].concat(TestMixins),

      render: function () {
        return React.DOM.button();
      }
    });
    var instance = Component({bsClass: 'button'}, 'content');
    ReactTestUtils.renderIntoDocument(instance);

    assert.deepEqual(instance.getBsClassSet(), expectedClasses);
  };

  describe('LargeMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([LargeMixin], 'btn btn-lg');
    });
  });

  describe('MediumMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([MediumMixin], 'btn btn-md');
    });
  });

  describe('SmallMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([SmallMixin], 'btn btn-sm');
    });
  });

  describe('XSmallMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([XSmallMixin], 'btn btn-xs');
    });
  });

  describe('DefaultMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([DefaultMixin], 'btn btn-default');
    });
  });

  describe('PrimaryMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([PrimaryMixin], 'btn btn-primary');
    });
  });

  describe('SuccessMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([SuccessMixin], 'btn btn-success');
    });
  });

  describe('InfoMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([InfoMixin], 'btn btn-info');
    });
  });

  describe('WarningMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([WarningMixin], 'btn btn-warning');
    });
  });

  describe('DangerMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([DangerMixin], 'btn btn-danger');
    });
  });

  describe('LinkMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([LinkMixin], 'btn btn-link');
    });
  });

  describe('InlineMixin#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([InlineMixin], 'btn btn-inline');
    });
  });

  describe('Size and style together#extendClassName', function () {
    it('should have correct className', function () {
      testMixins([DefaultMixin, LargeMixin], 'btn btn-lg btn-default');
    });
  });


});