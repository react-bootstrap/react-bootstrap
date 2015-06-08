import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import DropdownTitle from '../../src/revisited/DropdownTitle';

describe('DropdownTitle', function() {
  it('renders single child string with wrapper', function() {
    const title = <DropdownTitle>Basic text</DropdownTitle>;
    const instance = ReactTestUtils.renderIntoDocument(title);
    const node = React.findDOMNode(instance);

    node.children.length.should.equal(0);
  });

  it('renders single child component with no wrapper', function() {
    const title = <DropdownTitle><h1>Basic text</h1></DropdownTitle>;
    const instance = ReactTestUtils.renderIntoDocument(title);
    const node = React.findDOMNode(instance);

    node.children.length.should.equal(0);
  });

  it('renders single child component, and className with wrapper', function() {
    const title = <DropdownTitle className='herpa derpa'><h1>Basic text</h1></DropdownTitle>;
    const instance = ReactTestUtils.renderIntoDocument(title);
    const node = React.findDOMNode(instance);

    node.children.length.should.equal(1);
    node.className.should.equal('herpa derpa');
  });
});
