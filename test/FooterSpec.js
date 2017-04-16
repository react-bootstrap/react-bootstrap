import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Footer from '../src/Footer';

describe('Footer', function () {
  it('Should output a footer element with content', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Footer>
        <strong>Content</strong>
      </Footer>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a footer class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Footer>
        Content
      </Footer>
    );
    assert.ok(instance.getDOMNode().className.match(/\bfooter\b/));
  });

});
