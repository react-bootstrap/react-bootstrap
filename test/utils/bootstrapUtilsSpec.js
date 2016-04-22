import React from 'react';

import {
  bsStyles, bsSizes, getClassSet, prefix, _curry,
} from '../../src/utils/bootstrapUtils';

import { render, shouldWarn } from '../helpers';

describe('bootstrapUtils', ()=> {

  function validatePropType(propTypes, prop, value, match) {
    let result = propTypes[prop]({ [prop]: value }, prop, 'Component');

    if (match) {
      expect(result.message).to.match(match);
    } else {
      expect(result).to.not.exist;
    }
  }

  it('should prefix with bsClass', ()=> {
    expect(prefix({ bsClass: 'yolo'}, 'pie')).to.equal('yolo-pie');
  });

  it('should return bsClass when there is no suffix', ()=> {
    expect(prefix({ bsClass: 'yolo'})).to.equal('yolo');
    expect(prefix({ bsClass: 'yolo'}, '')).to.equal('yolo');
    expect(prefix({ bsClass: 'yolo'}, null)).to.equal('yolo');
  });

  it('returns a classSet of bsClass', ()=> {
    expect(getClassSet({ bsClass: 'btn' })).to.eql({'btn': true });
  });

  it('returns a classSet of bsClass and style', ()=> {
    expect(
      getClassSet({ bsClass: 'btn', bsStyle: 'primary' })
    )
    .to.eql({'btn': true, 'btn-primary': true });
  });

  it('returns a classSet of bsClass and size', ()=> {
    expect(getClassSet({ bsClass: 'btn', bsSize: 'large' }))
        .to.eql({'btn': true, 'btn-lg': true });

    expect(getClassSet({ bsClass: 'btn', bsSize: 'lg' }))
        .to.eql({'btn': true, 'btn-lg': true });
  });

  it('returns a classSet of bsClass, style and size', ()=> {
    expect(getClassSet({ bsClass: 'btn', bsSize: 'lg', bsStyle: 'primary' }))
        .to.eql({'btn': true, 'btn-lg': true, 'btn-primary': true });
  });

  describe('decorators', ()=> {
    it('should apply immediately if a component is supplied', ()=> {
      let spy = sinon.spy();
      let component = function noop() {};

      _curry(spy)(true, 'hi', component);

      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWith(true, 'hi', component);
    });

    it('should curry the method as a decorator', ()=> {
      let spy = sinon.spy();
      let component = function noop() {};
      let decorator = _curry(spy)(true, 'hi');

      expect(spy).to.have.not.been.calledOnce;

      decorator(component);

      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWith(true, 'hi', component);
    });
  });

  describe('bsStyles', ()=> {

    it('should add style to allowed propTypes', ()=> {
      let Component = {};

      bsStyles(['minimal', 'boss', 'plaid'])(Component);

      expect(Component.propTypes).to.exist;

      validatePropType(Component.propTypes, 'bsStyle', 'plaid');

      validatePropType(Component.propTypes, 'bsStyle', 'not-plaid',
        /expected one of \["minimal","boss","plaid"\]/);
    });

    it('should not override other propTypes', ()=> {
      let Component = { propTypes: {other() {}}};

      bsStyles(['minimal', 'boss', 'plaid'])(Component);

      expect(Component.propTypes).to.exist;
      expect(Component.propTypes.other).to.exist;
    });

    it('should set a default if provided', ()=> {
      let Component = { propTypes: {other() {}}};

      bsStyles(['minimal', 'boss', 'plaid'], 'plaid')(Component);

      expect(Component.defaultProps).to.exist;
      expect(Component.defaultProps.bsStyle).to.equal('plaid');
    });

    it('should work with es6 classes', ()=> {
      shouldWarn('expected one of ["minimal","boss","plaid"]');

      @bsStyles(['minimal', 'boss', 'plaid'], 'plaid')
      class Component extends React.Component {
        render() { return <span/>; }
      }

      let instance = render(<Component />);

      expect(instance.props.bsStyle).to.equal('plaid');

      render(<Component bsStyle="not-plaid"/>);
    });

    it('should work with createClass', ()=> {
      shouldWarn('expected one of ["minimal","boss","plaid"]');

      let Component = bsStyles(['minimal', 'boss', 'plaid'], 'plaid')(
        React.createClass({
          render() { return <span/>; }
        })
      );

      let instance = render(<Component />);

      expect(instance.props.bsStyle).to.equal('plaid');

      render(<Component bsStyle="not-plaid"/>);
    });
  });

  describe('bsSizes', ()=> {

    it('should add size to allowed propTypes', ()=> {
      let Component = {};

      bsSizes(['large', 'small'])(Component);

      expect(Component.propTypes).to.exist;

      validatePropType(Component.propTypes, 'bsSize', 'small');
      validatePropType(Component.propTypes, 'bsSize', 'sm');

      validatePropType(Component.propTypes, 'bsSize', 'superSmall',
        /expected one of \["lg","large","sm","small"\]/);
    });

    it('should not override other propTypes', ()=> {
      let Component = { propTypes: {other() {}}};

      bsSizes(['smallish', 'micro', 'planet'])(Component);

      expect(Component.propTypes).to.exist;
      expect(Component.propTypes.other).to.exist;
    });

    it('should set a default if provided', ()=> {
      let Component = { propTypes: {other() {}}};

      bsSizes(['smallish', 'micro', 'planet'], 'smallish')(Component);

      expect(Component.defaultProps).to.exist;
      expect(Component.defaultProps.bsSize).to.equal('smallish');
    });

    it('should work with es6 classes', ()=> {
      shouldWarn('expected one of ["smallish","micro","planet"]');

      @bsSizes(['smallish', 'micro', 'planet'], 'smallish')
      class Component extends React.Component {
        render() { return <span/>; }
      }

      let instance = render(<Component />);

      expect(instance.props.bsSize).to.equal('smallish');

      render(<Component bsSize="not-smallish"/>);
    });

    it('should work with createClass', ()=> {
      shouldWarn('expected one of ["smallish","micro","planet"]');

      let Component = bsSizes(['smallish', 'micro', 'planet'], 'smallish')(
        React.createClass({
          render() { return <span/>; }
        })
      );

      let instance = render(<Component />);

      expect(instance.props.bsSize).to.equal('smallish');

      render(<Component bsSize="not-smallish"/>);
    });
  });
});
