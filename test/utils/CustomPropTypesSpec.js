import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import CustomPropTypes from '../../src/utils/CustomPropTypes';
import {shouldWarn} from '../helpers';

function isChainableAndUndefinedOK(validatorUnderTest) {
  it('Should validate OK with undefined or null values', () => {
    assert.isUndefined(validatorUnderTest({}, 'p', 'Component'));
    assert.isUndefined(validatorUnderTest({p: null}, 'p', 'Component'));
  });

  it('Should be able to chain', () => {
    let err = validatorUnderTest.isRequired({}, 'p', 'Component');
    assert.instanceOf(err, Error);
    assert.include(err.message, 'Required prop');
    assert.include(err.message, 'was not specified in');
  });
}

describe('CustomPropTypes', () => {

  describe('mountable', () => {
    function validate(prop) {
      return CustomPropTypes.mountable({p: prop}, 'p', 'Component');
    }

    isChainableAndUndefinedOK(CustomPropTypes.mountable);

    it('Should return error with non mountable values', () => {
      let err = validate({});
      assert.instanceOf(err, Error);
      assert.include(err.message, 'expected a DOM element or an object that has a `render` method');
    });

    it('Should return undefined with mountable values', () => {
      assert.isUndefined(validate(document.createElement('div')));
      assert.isUndefined(validate(document.body));
      assert.isUndefined(validate(ReactTestUtils.renderIntoDocument(<div />)));
    });
  });

  describe('elementType', () => {
    function validate(prop) {
      return CustomPropTypes.elementType({p: prop}, 'p', 'TestComponent');
    }

    isChainableAndUndefinedOK(CustomPropTypes.elementType);

    it('Should validate OK with elementType values', () => {
      assert.isUndefined(validate('span'));
      assert.isUndefined(validate(() => {}));
    });

    it('Should return error with not a string or function values', () => {
      let err = validate({});
      assert.instanceOf(err, Error);
      assert.include(err.message, 'Expected an Element `type` such as a tag name or return value of React.createClass(...)');
    });

    it('Should return error with react element', () => {
      let err = validate(React.createElement('span'));
      assert.instanceOf(err, Error);
      assert.include(err.message, 'Expected an Element `type`, not an actual Element');
    });
  });

  describe('keyOf', () => {
    let obj = {'foo': 1};
    function validate(prop) {
      return CustomPropTypes.keyOf(obj)({p: prop}, 'p', 'Component');
    }

    isChainableAndUndefinedOK(CustomPropTypes.keyOf(obj));

    it('Should return error with non-key values', () => {
      let err = validate('bar');
      assert.instanceOf(err, Error);
      assert.include(err.message, 'expected one of ["foo"]');
    });

    it('Should validate OK with key values', () => {
      assert.isUndefined(validate('foo'));
      obj.bar = 2;
      assert.isUndefined(validate('bar'));
    });
  });

  describe('singlePropFrom', () => {
    function validate(testProps) {
      const propList = ['children', 'value'];

      return CustomPropTypes.singlePropFrom(propList)(testProps, 'value', 'Component');
    }

    it('Should validate OK if only one listed prop in used', () => {
      const testProps = {value: 5};

      assert.isUndefined(validate(testProps));
    });

    it('Should return error if multiple of the listed properties have values', () => {
      let err = validate({value: 5, children: 5});
      assert.instanceOf(err, Error);
      assert.include(err.message, 'only one of the following may be provided: value and children');
    });
  });

  describe('all', () => {
    let validators;
    const props = {
      key: 'value'
    };
    const propName = 'key';
    const componentName = 'TestComponent';

    beforeEach(() => {
      validators = [
        sinon.stub(),
        sinon.stub(),
        sinon.stub()
      ];
    });

    it('with no arguments provided', () => {
      expect(() => {
        CustomPropTypes.all();
      }).to.throw(Error, /No validations provided/);
    });

    it('with no validations provided', () => {
      expect(() => {
        CustomPropTypes.all([]);
      }).to.throw(Error, /No validations provided/);
    });

    it('with invalid arguments provided', () => {
      expect(() => {
        CustomPropTypes.all(1);
      }).to.throw(Error, /Invalid argument must be an array/);
    });

    it('validates each validation', () => {
      const all = CustomPropTypes.all(validators);

      let result = all(props, propName, componentName);
      expect(result).to.equal(undefined);

      validators.forEach(x => {
        x.should.have.been.calledOnce
          .and.calledWith(props, propName, componentName);
      });
    });

    it('returns first validation failure', () => {
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

  describe('isRequiredForA11y', () => {
    function validate(prop) {
      return CustomPropTypes.isRequiredForA11y(React.PropTypes.string)({p: prop}, 'p', 'Component');
    }

    it('Should validate OK when property is provided', () => {
      let err = validate('aria-tag');
      assert.notInstanceOf(err, Error);
    });

    it('Should return custom error message when property is not provided', () => {
      let err = validate(null);
      assert.instanceOf(err, Error);
      assert.include(err.message, 'accessible for users using assistive technologies such as screen readers');
    });
  });

  describe('deprecated', () => {
    function validate(prop) {
      return CustomPropTypes.deprecated(React.PropTypes.string, 'Read more at link')({pName: prop}, 'pName', 'ComponentName');
    }

    it('Should warn about deprecation and validate OK', () => {
      let err = validate('value');
      shouldWarn('"pName" property of "ComponentName" has been deprecated.\nRead more at link');
      assert.notInstanceOf(err, Error);
    });

    it('Should warn about deprecation and throw validation error when property value is not OK', () => {
      let err = validate({});
      shouldWarn('"pName" property of "ComponentName" has been deprecated.\nRead more at link');
      assert.instanceOf(err, Error);
      assert.include(err.message, 'Invalid undefined `pName` of type `object` supplied to `ComponentName`');
    });
  });
});
