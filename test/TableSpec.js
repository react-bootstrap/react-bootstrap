import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Table from '../src/Table';

describe('Table', () => {
  it('Should be a table', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table />
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'TABLE');
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\btable\b/));
  });

  it('Should have correct class when striped', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table striped />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\btable-striped\b/));
  });

  it('Should have correct class when hover', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table hover />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\btable-hover\b/));
  });

  it('Should have correct class when bordered', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table bordered />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\btable-bordered\b/));
  });

  it('Should have correct class when condensed', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table condensed />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\btable-condensed\b/));
  });

  it('Should have responsive wrapper', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Table responsive />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\btable-responsive\b/));
    assert.ok(ReactDOM.findDOMNode(instance).firstChild.className.match(/\btable\b/));
  });

  describe('When column headers are given', () => {
    let instance;
    let headers = ['Col 1', 'Col 2', 'Col 3'];

    beforeEach(() => {
      instance = ReactTestUtils.renderIntoDocument(
        <Table headers={headers}>
          <tr className="test"></tr>
        </Table>
      );
    });


    it('Should have table head', () => {
      const theadNode = ReactDOM.findDOMNode(instance).firstChild;
      assert.equal(theadNode.nodeName, 'THEAD');
    });

    it('Should have row in table head', () => {
      const tr = ReactDOM.findDOMNode(instance).firstChild.firstChild;
      assert.equal(tr.nodeName, 'TR');
    });

    it('Should have column headers in table head row', () => {
      const tds = ReactDOM.findDOMNode(instance).firstChild.firstChild.childNodes;

      assert.equal(tds.length, headers.length);

      for (let i = 0; i < tds.length; i++) {
        assert.equal(tds[i].nodeName, 'TH');
        assert.equal(tds[i].textContent, headers[i]);
      }
    });

    it('Should have table body with contents', () => {
      const tbody = ReactDOM.findDOMNode(instance).childNodes[1];

      assert.equal(tbody.nodeName, 'TBODY');
      assert.equal(tbody.childNodes.length, 1);
      assert.equal(tbody.childNodes[0].nodeName, 'TR');
      assert.equal(tbody.childNodes[0].className, 'test');
    });
  });
});
