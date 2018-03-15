import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import FigureCaption from '../src/FigureCaption';

describe('<FigureCaption>', () => {
  it('uses "figcaption" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(<FigureCaption />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'FIGCAPTION');
  });

  it('has "figure-caption" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FigureCaption>FigureCaption content</FigureCaption>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'figure-caption');
  });

  it('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FigureCaption className="bob" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bfigure-caption\b/)
    );
  });

  it('allows custom elements instead of "figcaption"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FigureCaption componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });
});
