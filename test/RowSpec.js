import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Row from '../src/Row';

describe('Row', () => {
  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Row />
    );

    assert.equal(React.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "row" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Row>Row content</Row>
    );
    assert.equal(React.findDOMNode(instance).className, 'row');
  });

  it('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Row className="bob"/>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(React.findDOMNode(instance).className.match(/\brow\b/));
  });

  it('allows custom elements instead of "div"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Row componentClass='section' />
    );

    assert.equal(React.findDOMNode(instance).nodeName, 'SECTION');
  });
});
