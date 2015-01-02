/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var FadeMixin = require('../lib/FadeMixin');

var Component;

describe('FadeMixin', function () {
  beforeEach(function() {
    Component = React.createClass({
      mixins: [ FadeMixin ],

      render: function () {
        return (
          <div {...this.props} className='fade'>
            <span className='fade'/>
          </div>
        );
      }
    });
  });

  it('Should add the in class to all elements', function (done) {
    var instance = ReactTestUtils.renderIntoDocument(<Component />);

    var child = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span');

    setTimeout(function(){
      assert.ok(instance.getDOMNode().className.match(/\bin\b/));
      assert.ok(instance.getDOMNode().className.match(/\bfade\b/));
      assert.ok(child.getDOMNode().className.match(/\bin\b/));
      assert.ok(child.getDOMNode().className.match(/\bfade\b/));
      done()
    }, 25)
  });

  it('Should remove the in class for all elements', function (done) {
    var instance = ReactTestUtils.renderIntoDocument(<Component />);

    setTimeout(function(){
      instance.componentWillUnmount()
      var element = instance._fadeOutEl.children[0]
      var child   = element.children[0]

      assert.ok(element.className.match(/\bin\b/));
      assert.ok(child.className.match(/\bin\b/));

      setTimeout(function(){
        assert.ok(!element.className.match(/\bin\b/));
        assert.ok(element.className.match(/\bfade\b/));
        assert.ok(!child.className.match(/\bin\b/));
        assert.ok(child.className.match(/\bfade\b/));
        done()
      }, 25)
    }, 25)
  });
});
