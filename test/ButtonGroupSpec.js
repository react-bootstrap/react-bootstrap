import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ButtonGroup from '../src/ButtonGroup';
import Button from '../src/Button';

describe('ButtonGroup', () => {
  it('Should output a button group', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup>
        <Button>Title</Button>
      </ButtonGroup>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-group\b/));
  });

  it('Should add size', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup bsSize="large">
        <Button>Title</Button>
      </ButtonGroup>
    );
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bbtn-group-lg\b/)
    );
  });

  it('Should add vertical variation', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup vertical>
        <Button>Title</Button>
      </ButtonGroup>
    );
    assert.equal(
      ReactDOM.findDOMNode(instance).className.trim(),
      'btn-group-vertical'
    );
  });

  it('Should add toggle variation', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup toggle>
        <Button>Title</Button>
      </ButtonGroup>
    );
    assert.equal(
      ReactDOM.findDOMNode(instance).className.trim(),
      'btn-group btn-group-toggle'
    );
  });
});
