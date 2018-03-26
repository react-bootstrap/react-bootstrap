import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Figure from '../src/Figure';

describe('<Figure.Caption>', () => {
  it('uses "figcaption" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Figure.Caption />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'FIGCAPTION');
  });

  it('has "figure-caption" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Figure.Caption>FigureCaption content</Figure.Caption>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'figure-caption');
  });

  it('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Figure.Caption className="bob" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bfigure-caption\b/)
    );
  });

  it('allows custom elements instead of "figcaption"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Figure.Caption componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });
});
