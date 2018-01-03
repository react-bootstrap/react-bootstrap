import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Glyphicon from '../src/Glyphicon';

describe('<Glyphicon>', () => {
  it('Should have correct class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Glyphicon glyph="star" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bglyphicon\b/));
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bglyphicon-star\b/)
    );
  });

  it('renders without the .form-control-feedback class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Glyphicon glyph="star" />
    );

    assert.notOk(
      ReactDOM.findDOMNode(instance).className.match(
        /\bform-control-feedback\b/
      )
    );
  });
});
