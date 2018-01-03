import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import {
  bsStyles,
  bsSizes,
  getClassSet,
  prefix,
  _curry
} from '../../src/utils/bootstrapUtils';

import { render, shouldWarn } from '../helpers';

describe('bootstrapUtils', () => {
  it('should prefix with bsClass', () => {
    expect(prefix({ bsClass: 'yolo' }, 'pie')).to.equal('yolo-pie');
  });

  it('should return bsClass when there is no suffix', () => {
    expect(prefix({ bsClass: 'yolo' })).to.equal('yolo');
    expect(prefix({ bsClass: 'yolo' }, '')).to.equal('yolo');
    expect(prefix({ bsClass: 'yolo' }, null)).to.equal('yolo');
  });

  it('returns a classSet of bsClass', () => {
    expect(getClassSet({ bsClass: 'btn' })).to.eql({ btn: true });
  });

  it('returns a classSet of bsClass and style', () => {
    expect(getClassSet({ bsClass: 'btn', bsStyle: 'primary' })).to.eql({
      btn: true,
      'btn-primary': true
    });
  });

  it('returns a classSet of bsClass and size', () => {
    expect(getClassSet({ bsClass: 'btn', bsSize: 'large' })).to.eql({
      btn: true,
      'btn-lg': true
    });

    expect(getClassSet({ bsClass: 'btn', bsSize: 'lg' })).to.eql({
      btn: true,
      'btn-lg': true
    });
  });

  it('returns a classSet of bsClass, style and size', () => {
    expect(
      getClassSet({ bsClass: 'btn', bsSize: 'lg', bsStyle: 'primary' })
    ).to.eql({ btn: true, 'btn-lg': true, 'btn-primary': true });
  });

  describe('decorators', () => {
    it('should apply immediately if a component is supplied', () => {
      const spy = sinon.spy();
      const component = function noop() {};

      _curry(spy)(true, 'hi', component);

      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWith(true, 'hi', component);
    });

    it('should curry the method as a decorator', () => {
      const spy = sinon.spy();
      const component = function noop() {};
      const decorator = _curry(spy)(true, 'hi');

      expect(spy).to.have.not.been.calledOnce;

      decorator(component);

      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWith(true, 'hi', component);
    });
  });

  describe('bsStyles', () => {
    it('should add style to allowed propTypes', () => {
      const Component = () => null;
      bsStyles(['minimal', 'boss', 'plaid'])(Component);

      expect(Component.propTypes).to.exist;

      React.createElement(Component, { bsStyle: 'plaid' });

      shouldWarn('expected one of ["minimal","boss","plaid"]');
      React.createElement(Component, { bsStyle: 'not-plaid' });
    });

    it('should not override other propTypes', () => {
      const propTypes = { other: PropTypes.string };
      const Component = () => null;
      Component.propTypes = propTypes;
      bsStyles(['minimal', 'boss', 'plaid'])(Component);

      expect(Component.propTypes).to.exist;
      expect(Component.propTypes.other).to.exist;
    });

    it('should set a default if provided', () => {
      const propTypes = { other: PropTypes.string };
      const Component = () => null;
      Component.propTypes = propTypes;
      bsStyles(['minimal', 'boss', 'plaid'], 'plaid')(Component);

      expect(Component.defaultProps).to.exist;
      expect(Component.defaultProps.bsStyle).to.equal('plaid');
    });

    it('should work with ES classes', () => {
      shouldWarn('expected one of ["minimal","tweed","plaid"]');

      class Component extends React.Component {
        render() {
          return <span />;
        }
      }

      const WrappedComponent = bsStyles(['minimal', 'tweed', 'plaid'], 'plaid')(
        Component
      );

      const instance = render(<WrappedComponent />);

      expect(instance.props.bsStyle).to.equal('plaid');

      render(<WrappedComponent bsStyle="not-plaid" />);
    });

    it('should work with createClass', () => {
      shouldWarn('expected one of ["minimal","boss","plaid","tweed"]');

      const Component = bsStyles(
        ['minimal', 'boss', 'plaid', 'tweed'],
        'plaid'
      )(
        createReactClass({ // eslint-disable-line
          render() {
            return <span />;
          }
        })
      );

      const instance = render(<Component />);

      expect(instance.props.bsStyle).to.equal('plaid');

      render(<Component bsStyle="not-plaid" />);
    });

    it('should work with functional components', () => {
      shouldWarn('expected one of ["minimal","boss","tartan"]');

      const Component = bsStyles(['minimal', 'boss', 'tartan'], 'tartan')(
        () => <span />
      );

      render(<Component bsStyle="not-plaid" />);
    });
  });

  describe('bsSizes', () => {
    it('should add size to allowed propTypes', () => {
      const Component = () => null;
      bsSizes(['large', 'small'])(Component);

      expect(Component.propTypes).to.exist;

      React.createElement(Component, { bsSize: 'small' });
      React.createElement(Component, { bsSize: 'sm' });

      shouldWarn('expected one of ["lg","large","sm","small"]');
      React.createElement(Component, { bsSize: 'superSmall' });
    });

    it('should not override other propTypes', () => {
      const Component = { propTypes: { other: PropTypes.string } };

      bsSizes(['smallish', 'micro', 'planet'])(Component);

      expect(Component.propTypes).to.exist;
      expect(Component.propTypes.other).to.exist;
    });

    it('should set a default if provided', () => {
      const Component = { propTypes: { other: PropTypes.string } };

      bsSizes(['smallish', 'micro', 'planet'], 'smallish')(Component);

      expect(Component.defaultProps).to.exist;
      expect(Component.defaultProps.bsSize).to.equal('smallish');
    });

    it('should work with es6 classes', () => {
      shouldWarn('expected one of ["smallish","micro","planet"]');

      class Component extends React.Component {
        render() {
          return <span />;
        }
      }

      const WrappedComponent = bsSizes(
        ['smallish', 'micro', 'planet'],
        'smallish'
      )(Component);

      const instance = render(<WrappedComponent />);

      expect(instance.props.bsSize).to.equal('smallish');

      render(<WrappedComponent bsSize="not-smallish" />);
    });

    it('should work with createClass', () => {
      shouldWarn('expected one of ["smallish","micro","planet","big"]');

      const Component = bsSizes(
        ['smallish', 'micro', 'planet', 'big'],
        'smallish'
      )(
        class extends React.Component {
          render() {
            return <span />;
          }
        }
      );

      const instance = render(<Component />);

      expect(instance.props.bsSize).to.equal('smallish');

      render(<Component bsSize="not-smallish" />);
    });
  });
});
