import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Badge from '../src/Badge';

describe('Badge', function () {
  it('Should output a badge with content', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge>
        <strong>Content</strong>
      </Badge>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a badge class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge>
        Content
      </Badge>
    );
    assert.ok(instance.getDOMNode().className.match(/\bbadge\b/));
  });

  it('Should have a badge using a number', function () {
    let count = 42;
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge>
        {count}
      </Badge>
    );
    assert.ok(instance.getDOMNode().className.match(/\bbadge\b/));
  });

  it('Should have a badge class pulled right', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge pullRight>
        Content
      </Badge>
    );
    assert.ok(instance.getDOMNode().className.match(/\bpull-right\b/));
  });

  it('Should not have a badge class when empty', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge></Badge>
    );
    assert.notOk(instance.getDOMNode().className.match(/\bbadge\b/));
  });
});
