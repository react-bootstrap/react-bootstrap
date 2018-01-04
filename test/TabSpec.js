import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Tab from '../src/Tab';

describe('<Tab>', () => {
  it('Should have class', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Tab>Item content</Tab>);
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab-pane')
    );
  });

  it('Should add active class', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Tab>Item content</Tab>);
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active')
    );
  });

  it('Should not add active class when not visible', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tab eventKey={{}}>Item content</Tab>
    );
    assert.lengthOf(
      ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'active'),
      0
    );
  });

  describe('Web Accessibility', () => {
    it('Should have aria-hidden false when visible', () => {
      let instance = ReactTestUtils.renderIntoDocument(<Tab>Item content</Tab>);

      assert.equal(
        ReactDOM.findDOMNode(instance).getAttribute('aria-hidden'),
        'false'
      );
    });

    it('Should have aria-hidden true when hidden', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Tab eventKey={{}}>Item content</Tab>
      );

      assert.equal(
        ReactDOM.findDOMNode(instance).getAttribute('aria-hidden'),
        'true'
      );
    });

    it('Should have role', () => {
      let instance = ReactTestUtils.renderIntoDocument(<Tab>Item content</Tab>);

      assert.equal(
        ReactDOM.findDOMNode(instance).getAttribute('role'),
        'tabpanel'
      );
    });
  });
});
