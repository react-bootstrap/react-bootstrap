import _ from 'lodash-compat';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import Tooltip from '../src/Tooltip';

describe('Tooltip', () => {
  it('Should output a tooltip with content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tooltip positionTop={10} positionLeft={20}>
        <strong>Tooltip Content</strong>
      </Tooltip>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));

    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tooltip');
    expect(_.pick(tooltip.style, ['top', 'left']))
      .to.eql({top: '10px', left: '20px'});
  });

  describe('When a style property is provided', () => {
    it('Should render a tooltip with merged styles', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Tooltip style={{opacity: 0.9}} positionTop={10} positionLeft={20}>
          <strong>Tooltip Content</strong>
        </Tooltip>
      );
      const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tooltip');
      expect(_.pick(tooltip.style, ['opacity', 'top', 'left']))
        .to.eql({opacity: '0.9', top: '10px', left: '20px'});
    });
  });
});
