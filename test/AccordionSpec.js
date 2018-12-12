import React from 'react';
import { mount } from 'enzyme';

import Accordion from '../src/Accordion';
import Card from '../src/Card';

describe('<Accordion>', () => {
  it('should output a div', () => {
    mount(<Accordion />).assertSingle('div');
  });
  it('should decorate the header of the card with a button', () => {
    let wrapper = mount(
      <Accordion>
        <Card>
          <Card.Header className="header">This is a header</Card.Header>
          <Card.Body>This is the body</Card.Body>
        </Card>
        <Card>
          <Card.Header className="header">This is another header</Card.Header>
          <Card.Body>This is another body</Card.Body>
        </Card>
      </Accordion>,
    );
    // should produce 2 buttons, with the
    // card headers as children
    let btns = wrapper.find('.btn');
    btns.should.have.length(2);
    btns.forEach(btn => {
      btn.find('.card-header').should.have.length(1);
    });
  });
});
