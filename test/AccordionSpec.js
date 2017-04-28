import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Accordion from '../src/Accordion';

describe('<Accordion>', () => {
  it('Should render a div with a role of tablist', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Accordion>
        Accordion content
      </Accordion>
    );

    const accordion = ReactDOM.findDOMNode(instance);

    assert.equal(accordion.nodeName, 'DIV');
    assert.equal(accordion.getAttribute('role'), 'tablist');
  });
});
