import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import DropdownButtonTitle from '../../src/revisited/DropdownButtonTitle';

describe('DropdownButtonTitle', function() {
  it('renders single child string with wrapper', function() {
    const title = <DropdownButtonTitle>Basic text</DropdownButtonTitle>;
    const instance = ReactTestUtils.renderIntoDocument(title);
    const node = React.findDOMNode(instance);

    node.children.length.should.equal(0);
  });

  it('renders single child component with no wrapper', function() {
    const title = <DropdownButtonTitle><h1>Basic text</h1></DropdownButtonTitle>;
    const instance = ReactTestUtils.renderIntoDocument(title);
    const node = React.findDOMNode(instance);

    node.children.length.should.equal(0);
  });

  it('renders single child component, and className with wrapper', function() {
    const title = <DropdownButtonTitle className='herpa derpa'><h1>Basic text</h1></DropdownButtonTitle>;
    const instance = ReactTestUtils.renderIntoDocument(title);
    const node = React.findDOMNode(instance);

    node.children.length.should.equal(1);
    node.className.should.equal('herpa derpa');
  });
});
