/** @jsx React.DOM */
/*global describe, it, assert, afterEach */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var CustomPropTypes = require('../cjs/utils/CustomPropTypes');

describe('CustomPropTypes', function () {
  describe('componentClass', function () {
    function validate(prop) {
      return CustomPropTypes.componentClass({p: prop}, 'p', 'Component');
    }
    function validateRequired(prop) {
      return CustomPropTypes.componentClass.isRequired({p: prop}, 'p', 'Component');
    }
    var nullClass = React.createClass({
      render: function() { return <div />; }
    });

    it('Should return error with non componentClass', function() {
      assert.instanceOf(validateRequired(), Error);
      assert.instanceOf(validate({}), Error);
      assert.instanceOf(validate(nullClass()), Error);
    });
    it('Should return undefined with componentClass', function() {
      assert.isUndefined(validate());
      assert.isUndefined(validate(React.DOM.div));
      assert.isUndefined(validate(nullClass));
    });
  });
  describe('mountable', function () {
    function validate(prop) {
      return CustomPropTypes.mountable({p: prop}, 'p', 'Component');
    }
    function validateRequired(prop) {
      return CustomPropTypes.mountable.isRequired({p: prop}, 'p', 'Component');
    }

    it('Should return error with non mountable values', function() {
      assert.instanceOf(validateRequired(), Error);
      assert.instanceOf(validateRequired(null), Error);
      assert.instanceOf(validate({}), Error);
    });
    it('Should return undefined with mountable values', function() {
      assert.isUndefined(validate());
      assert.isUndefined(validate(null));
      assert.isUndefined(validate(document.createElement('div')));
      assert.isUndefined(validate(document.body));
      assert.isUndefined(validate(ReactTestUtils.renderIntoDocument(<div />)));
    });
  });
});
