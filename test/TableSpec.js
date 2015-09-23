import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Table from '../src/Table';

describe('Table', () => {
  it('Should be a table', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table />
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'TABLE');
    assert.ok(React.findDOMNode(instance).className.match(/\btable\b/));
  });

  it('Should have correct class when striped', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table striped />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\btable-striped\b/));
  });

  it('Should have correct class when hover', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table hover />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\btable-hover\b/));
  });

  it('Should have correct class when bordered', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table bordered />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\btable-bordered\b/));
  });

  it('Should have correct class when condensed', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table condensed />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\btable-condensed\b/));
  });

  it('Should have responsive wrapper', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table responsive />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\btable-responsive\b/));
    assert.ok(React.findDOMNode(instance).firstChild.className.match(/\btable\b/));
  });
});
