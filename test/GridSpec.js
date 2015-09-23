import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Grid from '../src/Grid';

describe('Grid', () => {
  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid />
    );

    assert.equal(React.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "container" class by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid />
    );
    assert.equal(React.findDOMNode(instance).className, 'container');
  });

  it('turns grid into "full-width" layout via "fluid" property set', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid fluid />
    );
    assert.equal(React.findDOMNode(instance).className, 'container-fluid');
  });

  it('should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid className="whatever" fluid />
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bwhatever\b/));
    assert.ok(React.findDOMNode(instance).className.match(/\bcontainer-fluid\b/));
  });

  it('allows custom elements instead of "div"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid componentClass='section' />
    );

    assert.equal(React.findDOMNode(instance).nodeName, 'SECTION');
  });
});
