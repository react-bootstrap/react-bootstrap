import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import DropdownToggle from '../src/DropdownToggle';

describe('DropdownToggle', function() {
  const simpleToggle = <DropdownToggle open={false} title='herpa derpa' />;

  it('renders toggle button', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleToggle);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    buttonNode.className.should.match(/\bbtn[ $]/);
    buttonNode.className.should.match(/\bbtn-default\b/);
    buttonNode.className.should.match(/\bdropdown-toggle\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');
  });

  it('renders title prop', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleToggle);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    buttonNode.innerText.should.match(/herpa derpa/);
  });

  it('renders title children', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle open={false}>
        <h3>herpa derpa</h3>
      </DropdownToggle>
    );
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON');
    const h3Node = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(button, 'H3'));

    h3Node.innerText.should.match(/herpa derpa/);
  });

  it('renders dropdown toggle button caret', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleToggle);
    const caretNode = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'caret').getDOMNode();

    caretNode.tagName.should.equal('SPAN');
  });

  it('does not render toggle button caret', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle open={false} title='no caret' noCaret />
    );
    const caretNode = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'caret');

    caretNode.length.should.equal(0);
  });

  it('forwards onClick handler', function(done) {
    const handleClick = (event) => {
      event.should.be.ok;
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle open={false} title='click forwards' onClick={handleClick} />
    );
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON');

    ReactTestUtils.Simulate.click(button);
  });

  it('forwards id', function() {
    const id = 'testid';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle id={id} open={false} title='id forwards' />
    );
    const button = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    button.getAttribute('id').should.equal(id);
  });

  it('forwards bsStyle', function() {
    const style = 'success';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle bsStyle={style} open={false} title='bsStyle forwards' />
    );
    const button = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    button.className.should.match(/\bbtn-success\b/);
  });

  it('forwards bsSize', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle bsSize='small' open={false} title='bsSize forwards' />
    );
    const button = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    button.className.should.match(/\bbtn-sm\b/);
  });
});
