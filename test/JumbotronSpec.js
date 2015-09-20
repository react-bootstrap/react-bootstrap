import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Jumbotron from '../src/Jumbotron';

describe('Jumbotron', () => {
  it('Should output a div with content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Jumbotron>
        <strong>Content</strong>
      </Jumbotron>
    );

    assert.equal(React.findDOMNode(instance).nodeName, 'DIV');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a jumbotron class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Jumbotron>
        Content
      </Jumbotron>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bjumbotron\b/));
  });

  it('Should override node class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Jumbotron componentClass='section'>
        <strong>Content</strong>
      </Jumbotron>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'SECTION');
  });
});
