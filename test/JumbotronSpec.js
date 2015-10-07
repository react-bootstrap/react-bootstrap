import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Jumbotron from '../src/Jumbotron';

describe('Jumbotron', () => {
  it('Should output a div with content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Jumbotron>
        <strong>Content</strong>
      </Jumbotron>
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a jumbotron class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Jumbotron>
        Content
      </Jumbotron>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bjumbotron\b/));
  });

  it('Should override node class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Jumbotron componentClass='section'>
        <strong>Content</strong>
      </Jumbotron>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });
});
