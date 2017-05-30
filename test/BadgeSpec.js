import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Badge from '../src/Badge';

describe('<Badge>', () => {
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
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbadge\b/));
  });

  it('Should have a badge using a number', () => {
    let count = 42;
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge>
        {count}
      </Badge>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbadge\b/));
  });

  it('Should have a badge using a a mix of content', () => {
    let count = 42;
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge>
        £{count}
      </Badge>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbadge\b/));
  });

  it('Should have a badge class pulled right', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Badge pullRight>
        Content
      </Badge>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bpull-right\b/));
  });

  describe('Hides when empty', () => {
    it('should hide with no children', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Badge />
      );
      assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bhidden\b/));
    });

    it('should hide with empty string', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Badge>{''}</Badge>
      );
      assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bhidden\b/));
    });

    it('should not hide 0', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Badge>{0}</Badge>
      );
      assert.notOk(ReactDOM.findDOMNode(instance).className.match(/\bhidden\b/));
    });
  });
});
