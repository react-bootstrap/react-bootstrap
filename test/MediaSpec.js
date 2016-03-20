import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Media from '../src/Media';

describe(`Media`, () => {
  it(`uses "div" by default`, () => {
    let instance = ReactTestUtils.renderIntoDocument(
        <Media/>
      );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });
  it(`has "media" class`, () => {
    let instance = ReactTestUtils.renderIntoDocument(
        <Media/>
      );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media');
  });
  it(`should merge additional classes passed in`, () => {
    let instance = ReactTestUtils.renderIntoDocument(
        <Media className="custom-class" />
      );

    assert.include(ReactDOM.findDOMNode(instance).className, 'media');
    assert.include(ReactDOM.findDOMNode(instance).className, 'custom-class');
  });
  it(`should allow custom elements instead of "div"`, () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Media componentClass='section' />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });
  it(`should render children`, () => {
    let instance = ReactTestUtils.renderIntoDocument(
        <Media>
          <strong>Children</strong>
        </Media>
      );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
