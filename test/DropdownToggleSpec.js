import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import DropdownToggle from '../src/DropdownToggle';

import { getOne } from './helpers';

describe('<DropdownToggle>', () => {
  const simpleToggle = <DropdownToggle open={false} title="herpa derpa" />;

  it('renders toggle button', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleToggle);
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    buttonNode.className.should.match(/\bbtn[ $]/);
    buttonNode.className.should.match(/\bbtn-default\b/);
    buttonNode.className.should.match(/\bdropdown-toggle\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');
  });

  it('renders title prop', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleToggle);
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    buttonNode.textContent.should.match(/herpa derpa/);
  });

  it('renders title children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle title="toggle" open={false}>
        <h3>herpa derpa</h3>
      </DropdownToggle>
    );
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );
    const h3Node = getOne(button.getElementsByTagName('h3'));

    h3Node.textContent.should.match(/herpa derpa/);
  });

  it('renders dropdown toggle button caret', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleToggle);
    const caretNode = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'caret'
    );

    caretNode.tagName.should.equal('SPAN');
  });

  it('does not render toggle button caret', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle open={false} title="no caret" noCaret />
    );
    const caretNode = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      instance,
      'caret'
    );

    caretNode.length.should.equal(0);
  });

  it('forwards onClick handler', done => {
    const handleClick = event => {
      event.should.be.ok;
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle
        open={false}
        title="click forwards"
        onClick={handleClick}
      />
    );
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    ReactTestUtils.Simulate.click(button);
  });

  it('forwards id', () => {
    const id = 'testid';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle id={id} open={false} title="id forwards" />
    );
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    button.getAttribute('id').should.equal(id);
  });

  it('forwards bsStyle', () => {
    const style = 'success';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle bsStyle={style} open={false} title="bsStyle forwards" />
    );
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    button.className.should.match(/\bbtn-success\b/);
  });

  it('forwards bsSize', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle bsSize="small" open={false} title="bsSize forwards" />
    );
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    button.className.should.match(/\bbtn-sm\b/);
  });

  it('does not forward bsClass', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle
        bsClass="my-custom-bsClass"
        open={false}
        title="bsClass"
      />
    );
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'BUTTON'
    );

    button.className.should.match(/\bmy-custom-bsClass\b/);
    button.className.should.match(/\bbtn\b/);
  });
});
