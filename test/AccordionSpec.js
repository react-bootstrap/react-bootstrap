import React from 'react';
import { mount } from 'enzyme';

import Accordion from '../src/Accordion';
import Card from '../src/Card';

describe('<Accordion>', () => {
  it('should output a div', () => {
    mount(<Accordion />).assertSingle('div');
  });

  it('should not add any new elements', () => {
    let wrapper = mount(
      <Accordion>
        <Card>
          <Card.Header className="header">This is a header</Card.Header>
          <Card.Body>This is the body</Card.Body>
        </Card>
      </Accordion>,
    );

    wrapper.children().should.have.length(1);

    let card = wrapper.find('.card');

    card.children().should.have.length(2);
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
    btns.should.not.be.undefined;
    btns.should.have.length(2);
    btns.forEach(btn => {
      let header = btn.find('.card-header');
      btns.should.not.be.undefined;
      header.should.have.length(1);
    });
  });

  it('should wrap every Card child in a Collapse component (besides the header)', () => {
    let wrapper = mount(
      <Accordion>
        <Card>
          <Card.Header className="header">This is a header</Card.Header>
          <Card.Body>This is the body</Card.Body>
          <Card.Body>This is another body</Card.Body>
        </Card>
      </Accordion>,
    );

    let collapse = wrapper.find('.accordion-collapse');

    collapse.find('.card-header').should.not.have.length(1);
    collapse.find('.card-body').should.have.length(2);
  });

  it('should only have one card collapsed', () => {
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
    let collapses = wrapper.find('.accordion-collapse');

    collapses.forEach((collapse, i) => {
      if(collapse.props().in)
        collapse.props().in.should.equal(i === 0); // The first element should be the only element that's expanded
    })
  })
});
