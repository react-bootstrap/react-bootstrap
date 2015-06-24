import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import CustomPropTypes from '../../src/utils/CustomPropTypes';

describe('CustomPropTypes', function() {

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

  describe('elementType', function () {
    function validate(prop) {
      return CustomPropTypes.elementType({p: prop}, 'p', 'TestComponent');
    }

    it('Should validate OK with undifined or null values', function() {
      assert.isUndefined(validate());
      assert.isUndefined(validate(null));
    });

    it('Should validate OK with elementType values', function() {
      assert.isUndefined(validate('span'));
      assert.isUndefined(validate(function(){}));
    });

    it('Should return error with not a string or function values', function() {
      let err = validate({});
      assert.instanceOf(err, Error);
      assert.include(err.message, 'Expected an Element `type` such as a tag name or return value of React.createClass(...)');
    });

    it('Should return error with react element', function() {
      let err = validate(React.createElement('span'));
      assert.instanceOf(err, Error);
      assert.include(err.message, 'Expected an Element `type`, not an actual Element');
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

  describe('all', function() {
    let validators;
    const props = {
      key: 'value'
    };
    const propName = 'key';
    const componentName = 'TestComponent';

    beforeEach(function() {
      validators = [
        sinon.stub(),
        sinon.stub(),
        sinon.stub()
      ];
    });

    it('with no arguments provided', function() {
      expect(() => {
        CustomPropTypes.all();
      }).to.throw(Error, /No validations provided/);
    });

    it('with no validations provided', function() {
      expect(() => {
        CustomPropTypes.all([]);
      }).to.throw(Error, /No validations provided/);
    });

    it('with invalid arguments provided', function() {
      expect(() => {
        CustomPropTypes.all(1);
      }).to.throw(Error, /Invalid argument must be an array/);
    });

    it('validates each validation', function() {
      const all = CustomPropTypes.all(validators);

      let result = all(props, propName, componentName);
      expect(result).to.equal(undefined);

      validators.forEach(x => {
        x.should.have.been.calledOnce
          .and.calledWith(props, propName, componentName);
      });
    });

    it('returns first validation failure', function() {
      let err = new Error('Failure');
      validators[1].returns(err);
      const all = CustomPropTypes.all(validators);

      let result = all(props, propName, componentName);
      expect(result).to.equal(err);

      validators[0].should.have.been.calledOnce
        .and.calledWith(props, propName, componentName);

      validators[1].should.have.been.calledOnce
        .and.calledWith(props, propName, componentName);

      validators[2].should.not.have.been.called;
    });
  });
});
