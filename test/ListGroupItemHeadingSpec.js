import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import ListGroupItemHeading from '../src/ListGroupItemHeading';

describe('ListGroupItemHeading', () => {

  it('Should output an "h4" with the class "list-group-item-heading"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItemHeading>Text</ListGroupItemHeading>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H4');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item-heading'));
  });

  it('Should output an "h3" tag if "componentClass" prop is set to "h3"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItemHeading href='#test' componentClass="h3">H3 Tag</ListGroupItemHeading>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H3');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item-heading'));
  });
});
