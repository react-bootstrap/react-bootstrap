import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Clearfix from '../src/Clearfix';

describe('<Clearfix>', () => {
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

  it('Defaults to no visible block classes', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Clearfix />
    );

    let instanceClassName = ReactDOM.findDOMNode(instance).className;
    assert.ok(!instanceClassName.match(/\bvisible-xs-block\b/));
    assert.ok(!instanceClassName.match(/\bvisible-sm-block\b/));
    assert.ok(!instanceClassName.match(/\bvisible-md-block\b/));
    assert.ok(!instanceClassName.match(/\bvisible-lg-block\b/));
  });

  it('Should apply visible block classes', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Clearfix visibleXsBlock visibleSmBlock visibleMdBlock visibleLgBlock />
    );

    let instanceClassName = ReactDOM.findDOMNode(instance).className;
    assert.ok(instanceClassName.match(/\bvisible-xs-block\b/));
    assert.ok(instanceClassName.match(/\bvisible-sm-block\b/));
    assert.ok(instanceClassName.match(/\bvisible-md-block\b/));
    assert.ok(instanceClassName.match(/\bvisible-lg-block\b/));
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
      <Clearfix componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });
});
