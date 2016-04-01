import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import ListGroupItemText from '../src/ListGroupItemText';

describe('ListGroupItemText', () => {

  it('Should output an "span" with the class "list-group-item-text"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItemText>Text</ListGroupItemText>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SPAN');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item-text'));
  });

  it('Should output an "h3" tag if "componentClass" prop is set to "h3"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItemText href='#test' componentClass="h3">H3 Tag</ListGroupItemText>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H3');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item-text'));
  });
});
