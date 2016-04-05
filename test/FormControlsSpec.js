import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import * as FormControls from '../src/FormControls';

import {shouldWarn} from './helpers';

describe('Form Controls', () => {
  describe('Static', () => {
    it('renders a p element wrapped around the given value', () => {
      shouldWarn('deprecated');

      const instance = ReactTestUtils.renderIntoDocument(
        <FormControls.Static value='v' />
      );

      const result = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'p');
      result.innerHTML.should.equal('v');
    });

    it('getValue() pulls from either value or children', () => {
      shouldWarn('deprecated');

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
      shouldWarn('deprecated');

      ReactTestUtils.renderIntoDocument(
        <FormControls.Static><span>blah</span></FormControls.Static>
      );
    });
    it('allows choosing non-default element tag', () => {
      shouldWarn('deprecated');

      const instance = ReactTestUtils.renderIntoDocument(
        <FormControls.Static componentClass="output" value="v" />
      );
      const result = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'output');
      result.innerHTML.should.equal('v');
    });
  });
});
