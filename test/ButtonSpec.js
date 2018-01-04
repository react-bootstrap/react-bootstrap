import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Button from '../src/Button';

describe('<Button>', () => {
  it('Should output a button', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Button>Title</Button>);
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'BUTTON');
  });

  it('Should have type=button by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Button>Title</Button>);
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('type'), 'button');
  });

  it('Should show the type if passed one', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button type="submit">Title</Button>
    );
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('type'), 'submit');
  });

  it('Should output an anchor if called with a href', () => {
    let href = '/url';
    let instance = ReactTestUtils.renderIntoDocument(
      <Button href={href}>Title</Button>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'A');
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('href'), href);
  });

  it('Should call onClick callback', done => {
    let doneOp = () => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Button onClick={doneOp}>Title</Button>
    );
    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });

  it('Should be disabled', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button disabled>Title</Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).disabled);
  });

  it('Should be disabled link', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button disabled href="#">
        Title
      </Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should have block class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button block>Title</Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-block\b/));
  });

  it('Should apply bsStyle class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button bsStyle="danger">Title</Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-danger\b/));
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button className="bob" bsStyle="danger">
        Title
      </Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-danger\b/));
  });

  it('Should default to bsStyle="default"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button bsStyle="default">Title</Button>
    );
    assert.equal(instance.props.bsStyle, 'default');
  });

  it('Should be active', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button active>Title</Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bactive\b/));
  });
});
