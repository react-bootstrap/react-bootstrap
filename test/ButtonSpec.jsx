/** @jsx React.DOM */
/*global describe, it, assert */

var ReactTestUtils = require('react/lib/ReactTestUtils');
var Button         = require('../cjs/Button');

describe('Button', function () {
  it('Should output a button', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          Button({}, 'Title')
        );
    assert.equal(instance.getDOMNode().nodeName, 'BUTTON');
  });

  it('Should have type=button by default', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          Button({}, 'Title')
        );
    assert.equal(instance.getDOMNode().getAttribute('type'), 'button');
  });

  it('Should show the type if passed one', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          Button({type: 'submit'}, 'Title')
        );
    assert.equal(instance.getDOMNode().getAttribute('type'), 'submit');
  });

  it('Should output an anchor if called with a href', function () {
    var href = '/url';
    var instance = ReactTestUtils.renderIntoDocument(
          Button({href: href}, 'Title')
        );

    assert.equal(instance.getDOMNode().nodeName, 'A');
    assert.equal(instance.getDOMNode().getAttribute('href'), href);
  });

  it('Should call onClick callback', function (done) {
    var instance = ReactTestUtils.renderIntoDocument(
          Button({
            onClick: function () {
              done();
            }
          }, 'Title')
        );

    ReactTestUtils.Simulate.click(instance.getDOMNode());
  });

  it('Should be disabled', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          Button({disabled: true}, 'Title')
        );

    assert.ok(instance.getDOMNode().disabled);
  });

  it('Should be disabled link', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          Button({disabled: true, href:'#'}, 'Title')
        );

    assert.ok(instance.getDOMNode().className.match(/\bdisabled\b/));
  });

  it('Should have block class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          Button({block: true}, 'Title')
        );

    assert.ok(instance.getDOMNode().className.match(/\bbtn-block\b/));
  });

  it('Should apply bsStyle class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          Button({bsStyle: 'danger'}, 'Title')
        );

    assert.ok(instance.getDOMNode().className.match(/\bbtn-danger\b/));
  });

  it('Should default to bsStyle="default"', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          Button({bsStyle: 'default'}, 'Title')
        );

    assert.equal(instance.props.bsStyle, 'default');
  });

  it('Should be active', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          Button({active: true}, 'Title')
        );

    assert.ok(instance.getDOMNode().className.match(/\bactive\b/));
  });
});