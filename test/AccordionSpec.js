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
          <Card.Header>
            <Accordion.Toggle eventKey="0" />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>body text</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>,
    );

    wrapper.children().should.have.length(1);

    let card = wrapper.find('.card');

    card.children().should.have.length(2);
  });

  it('should only have one card collapsed', () => {
    let wrapper = mount(
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle eventKey="0" />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>body text</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle eventKey="1" />
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>body text</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>,
    );
    let collapses = wrapper.find('.accordion-collapse');

    collapses.forEach((collapse, i) => {
      collapse
        .props()
        .className.endsWith('show')
        .should.equal(i === 0);
    });
  });
  it('should fire the onClick callback only once', () => {
    let onClickSpy = sinon.spy();
    mount(
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle onClick={onClickSpy} eventKey="0" />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>body text</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle onClick={onClickSpy} eventKey="1" />
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>body text</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>,
    )
      .find('.card-header')
      .at(0)
      .find('button')
      .simulate('click');

    expect(onClickSpy).to.be.calledOnce;
  });

  it('Should have div as default component', () => {
    mount(<Accordion />).assertSingle('div');
  });
});
