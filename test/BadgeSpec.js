import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Badge from '../src/Badge';

describe('Badge', () => {
  it('Should output a badge with content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge>
        <strong>Content</strong>
      </Badge>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a badge class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge>
        Content
      </Badge>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbadge\b/));
  });

  it('Should have a badge using a number', () => {
    let count = 42;
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge>
        {count}
      </Badge>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbadge\b/));
  });

  it('Should have a badge using a a mix of content', () => {
    let count = 42;
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge>
        £{count}
      </Badge>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbadge\b/));
  });

  it('Should have a badge class pulled right', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge pullRight>
        Content
      </Badge>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bpull-right\b/));
  });

  it('Should not have a badge class when empty', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge />
    );
    assert.notOk(React.findDOMNode(instance).className.match(/\bbadge\b/));
  });
});
