import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Glyphicon from '../src/Glyphicon';

describe('Glyphicon', () => {
  it('Should have correct class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Glyphicon glyph='star' />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bglyphicon\b/));
    assert.ok(React.findDOMNode(instance).className.match(/\bglyphicon-star\b/));
  });

  it('renders without the .form-control-feedback class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Glyphicon glyph='star' />
    );

    assert.notOk(React.findDOMNode(instance).className.match(/\bform-control-feedback\b/));
  });

  context('when setting the formControlFeedback prop', () => {
    it('should have the .form-control-feedback class set', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Glyphicon formControlFeedback glyph='star' />
      );

      assert.ok(React.findDOMNode(instance).className.match(/\bform-control-feedback\b/));
    });
  });
});
