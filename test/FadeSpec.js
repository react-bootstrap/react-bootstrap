import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Fade from '../src/Fade';

describe('Fade', () => {

  let Component, instance;

  beforeEach(() => {

    Component = React.createClass({
      render() {
        let { children, ...props } = this.props;

        return (
          <Fade ref={r => this.fade = r}
            {...props}
          >
            <div>
              {children}
            </div>
          </Fade>
        );
      }
    });
  });

  it('Should default to hidden', () => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component>Panel content</Component>
    );

    assert.ok(
      instance.fade.props.in === false);
  });

  it('Should always have the "fade" class', () => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component>Panel content</Component>
    );

    assert.ok(
      instance.fade.props.in === false);

    assert.equal(
      React.findDOMNode(instance).className, 'fade');

  });

  it('Should add "in" class when entering', done => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component>Panel content</Component>
    );

    function onEntering() {
      assert.equal(React.findDOMNode(instance).className, 'fade in');
      done();
    }

    assert.ok(
      instance.fade.props.in === false);

    instance.setProps({ in: true, onEntering });
  });

  it('Should remove "in" class when exiting', done => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component in>Panel content</Component>
    );

    function onExiting() {
      assert.equal(React.findDOMNode(instance).className, 'fade');
      done();
    }

    assert.equal(
      React.findDOMNode(instance).className, 'fade in');

    instance.setProps({ in: false, onExiting });
  });
});
