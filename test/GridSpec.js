import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Container from '../src/Container';

describe('<Container>', () => {
  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Container />);

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "container" class by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Container />);
    assert.equal(ReactDOM.findDOMNode(instance).className, 'container');
  });

  it('turns grid into "full-width" layout via "fluid" property set', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Container fluid />);
    assert.equal(ReactDOM.findDOMNode(instance).className, 'container-fluid');
  });

  it('should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Container className="whatever" fluid />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bwhatever\b/));
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bcontainer-fluid\b/)
    );
  });

  it('allows custom elements instead of "div"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Container as="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });
});
