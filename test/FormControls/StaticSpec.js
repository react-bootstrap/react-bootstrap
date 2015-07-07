import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Static from '../../src/FormControls/Static';

describe('FormControls.Static', function () {
  it('renders a p element wrapped around the given value', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <Static value='v' />
    );

    const result = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'p');
    result.props.children.should.equal('v');
  });

  it('getValue() pulls from either value or children', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Static value='v' />
    );

    instance.getValue().should.equal('v');

    instance = ReactTestUtils.renderIntoDocument(
      <Static>5</Static>
    );

    instance.getValue().should.equal('5');
  });

  it('throws an error if both value and children are provided', function () {
    const testData = { value: 'blah', children: 'meh' };
    const result = Static.propTypes.children(testData, 'children', 'Static');

    result.should.be.instanceOf(Error);
  });
});
