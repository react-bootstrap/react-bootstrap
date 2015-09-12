import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import FadeMixin from '../src/FadeMixin';

let Component;

describe('FadeMixin', function () {
  beforeEach(function() {
    Component = React.createClass({
      mixins: [ FadeMixin ],

      render() {
        return (
          <div {...this.props} className='fade'>
            <span className='fade'/>
          </div>
        );
      }
    });
  });

  afterEach(()=> {
    if (console.error.calledWithMatch('FadeMixin is deprecated')) {
      console.error.reset();
    }
  });


  it('Should add the in class to all elements', function (done) {
    let instance = ReactTestUtils.renderIntoDocument(<Component />);

    let child = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span');

    setTimeout(function() {
      assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bin\b/));
      assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bfade\b/));
      assert.ok(child.className.match(/\bin\b/));
      assert.ok(child.className.match(/\bfade\b/));
      done();
    }, 25);
  });

  it('Should remove the in class for all elements', function (done) {
    let instance = ReactTestUtils.renderIntoDocument(<Component />);

    setTimeout(function() {

      instance.componentWillUnmount();
      let element = instance._fadeOutEl.children[0];
      let child = element.children[0];

      assert.ok(element.className.match(/\bin\b/));
      assert.ok(child.className.match(/\bin\b/));

      setTimeout(function() {
        assert.ok(!element.className.match(/\bin\b/));
        assert.ok(element.className.match(/\bfade\b/));
        assert.ok(!child.className.match(/\bin\b/));
        assert.ok(child.className.match(/\bfade\b/));
        done();
      }, 25);
    }, 25);
  });
});
