import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Glyphicon from '../src/Glyphicon';

describe('Glyphicon', function () {
  it('Should have correct class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Glyphicon glyph='star' />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bglyphicon\b/));
    assert.ok(React.findDOMNode(instance).className.match(/\bglyphicon-star\b/));
  });

  it('renders without the .form-control-feedback class', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <Glyphicon glyph='star' />
      );

      assert.notOk(React.findDOMNode(instance).className.match(/\bform-control-feedback\b/));
  });

  context('when setting the formControlFeedback prop', function () {
    it('should have the .form-control-feedback class set', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <Glyphicon formControlFeedback glyph='star' />
      );

      assert.ok(React.findDOMNode(instance).className.match(/\bform-control-feedback\b/));
    });
  });
});
