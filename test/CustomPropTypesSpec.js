import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import CustomPropTypes from '../src/utils/CustomPropTypes';

describe('CustomPropTypes', function () {

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

  describe('keyOf', function () {
    let obj = {'foo': 1};
    function validate(prop) {
      return CustomPropTypes.keyOf(obj)({p: prop}, 'p', 'Component');
    }
    function validateRequired(prop) {
      return CustomPropTypes.keyOf(obj).isRequired({p: prop}, 'p', 'Component');
    }

    it('Should return error with non-key values', function() {
      assert.instanceOf(validateRequired(), Error);
      assert.instanceOf(validateRequired(null), Error);
      assert.instanceOf(validate('bar'), Error);
    });
    it('Should return undefined with key values', function() {
      assert.isUndefined(validate());
      assert.isUndefined(validate('foo'));
      obj.bar = 2;
      assert.isUndefined(validate('bar'));
    });
  });

  describe('singlePropFrom', function () {
    function validate(testProps) {
      const propList = ['children', 'value'];

      return CustomPropTypes.singlePropFrom(propList)(testProps, 'value', 'Component');
    }

    it('Should return undefined if only one listed prop in used', function () {
      const testProps = {value: 5};

      assert.isUndefined(validate(testProps));
    });

    it('Should return error if multiple of the listed properties have values', function () {
      const testProps = {value: 5, children: 5};

      validate(testProps).should.be.instanceOf(Error);
    });
  });
});
