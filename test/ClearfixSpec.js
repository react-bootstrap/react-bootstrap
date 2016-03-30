import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Clearfix from '../src/Clearfix';

describe('Clearfix', () => {
  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Clearfix />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "clearfix" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Clearfix>Clearfix content</Clearfix>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'clearfix');
  });

  it('Should set Hidden to true', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Clearfix xsHidden smHidden mdHidden lgHidden />
    );

    let instanceClassName = ReactDOM.findDOMNode(instance).className;
    assert.ok(instanceClassName.match(/\bhidden-xs\b/));
    assert.ok(instanceClassName.match(/\bhidden-sm\b/));
    assert.ok(instanceClassName.match(/\bhidden-md\b/));
    assert.ok(instanceClassName.match(/\bhidden-lg\b/));
  });

  it('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Clearfix className="bob"/>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bclearfix\b/));
  });

  it('allows custom elements instead of "div"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Clearfix componentClass='section' />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });
});
