import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Position from '../src/Position';

describe('Position', function () {
  it('Should output a child', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Position>
        <span>Text</span>
      </Position>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'SPAN');
  });

  it('Should warn about several children', function () {
    expect(() => {
      ReactTestUtils.renderIntoDocument(
        <Position>
          <span>Text</span>
          <span>Another Text</span>
        </Position>
      );
    }).to.throw(Error, /onlyChild must be passed a children with exactly one child/);
  });

  // ToDo: add remaining tests
});
