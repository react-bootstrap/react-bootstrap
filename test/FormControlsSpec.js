import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import * as FormControls from '../src/FormControls';

describe('Form Controls', () => {
  describe('Static', () => {
    it('renders a p element wrapped around the given value', () => {
      const instance = ReactTestUtils.renderIntoDocument(
        <FormControls.Static value='v' />
      );

      const result = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'p');
      result.props.children.should.equal('v');
    });

    it('getValue() pulls from either value or children', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <FormControls.Static value='v' />
      );

      instance.getValue().should.equal('v');

      instance = ReactTestUtils.renderIntoDocument(
        <FormControls.Static>5</FormControls.Static>
      );

      instance.getValue().should.equal('5');
    });

    it('throws an error if both value and children are provided', () => {
      const testData = { value: 'blah', children: 'meh' };
      const result = FormControls.Static.propTypes.children(testData, 'children', 'Static');

      result.should.be.instanceOf(Error);
    });

    it('allows elements as children', () => {
      ReactTestUtils.renderIntoDocument(
        <FormControls.Static><span>blah</span></FormControls.Static>
      );
    });
  });
});
