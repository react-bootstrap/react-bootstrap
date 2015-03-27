import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Jumbotron from '../src/Jumbotron';

describe('Jumbotron', function () {
  it('Should output a div with content', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Jumbotron>
        <strong>Content</strong>
      </Jumbotron>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a jumbotron class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Jumbotron>
        Content
      </Jumbotron>
    );
    assert.ok(instance.getDOMNode().className.match(/\bjumbotron\b/));
  });
});
