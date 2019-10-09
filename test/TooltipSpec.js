import pick from 'lodash/pick';
import React from 'react';
import { mount } from 'enzyme';

import Tooltip from '../src/Tooltip';

describe('Tooltip', () => {
  it('Should output a tooltip with content', () => {
    let wrapper = mount(
      <Tooltip id="test-tooltip" style={{ top: 10, left: 20 }}>
        <strong>Tooltip Content</strong>
      </Tooltip>
    );
    assert.ok(wrapper.find('strong').getDOMNode());

    const tooltip = wrapper.find('.tooltip').getDOMNode();
    expect(pick(tooltip.style, ['top', 'left'])).to.eql({
      top: '10px',
      left: '20px'
    });
  });

  describe('When a style property is provided', () => {
    it('Should render a tooltip with merged styles', () => {
      let wrapper = mount(
        <Tooltip id="test-tooltip" style={{ opacity: 0.9, top: 10, left: 20 }}>
          <strong>Tooltip Content</strong>
        </Tooltip>
      );
      const tooltip = wrapper.find('.tooltip').getDOMNode();
      expect(pick(tooltip.style, ['top', 'left'])).to.eql({
        top: '10px',
        left: '20px'
      });
      // Decimal point string depends on locale
      expect(parseFloat(tooltip.style.opacity)).to.eql(0.9);
    });
  });
});
