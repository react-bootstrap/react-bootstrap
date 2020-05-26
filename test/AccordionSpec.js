import React from 'react';
import { mount } from 'enzyme';

import Accordion from '../src/Accordion';
import Card from '../src/Card';
import Dropdown from '../src/Dropdown';
import ListGroup from '../src/ListGroup';
import Nav from '../src/Nav';

describe('<Accordion>', () => {
  it('should output a div', () => {
    mount(<Accordion />).assertSingle('div');
  });

  it('should only have second card collapsed', () => {
    const wrapper = mount(
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
    const collapses = wrapper.find('AccordionCollapse');

    collapses.at(0).getDOMNode().className.should.include('show');
    collapses.at(1).getDOMNode().className.should.include('collapse');
  });

  it('should expand next card and collapse current card on click', () => {
    const onClickSpy = sinon.spy();
    const wrapper = mount(
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
    );
    wrapper.find('CardHeader').at(1).find('button').simulate('click');

    onClickSpy.should.be.calledOnce;

    const collapses = wrapper.find('AccordionCollapse');

    collapses.at(0).getDOMNode().className.should.include('collapse');

    // Enzyme doesn't really provide support for async utilities
    // on components, but in an ideal setup we should be testing for
    // this className to be `show` after the collapsing animation is done
    // (which is possible in `@testing-library` via `waitForElement`).
    // https://testing-library.com/docs/dom-testing-library/api-async#waitforelement
    collapses.at(1).getDOMNode().className.should.include('collapsing');
  });

  // https://github.com/react-bootstrap/react-bootstrap/issues/4176
  it('Should not close accordion when child dropdown clicked', () => {
    const wrapper = mount(
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle eventKey="0" />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Dropdown show>
                <Dropdown.Toggle id="dropdown-test">
                  Dropdown Button
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>,
    );

    wrapper.find('DropdownItem').simulate('click');

    wrapper
      .find('AccordionCollapse')
      .at(0)
      .getDOMNode()
      .className.should.include('show');
  });

  it('Should not close accordion when child ListGroup clicked', () => {
    const wrapper = mount(
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle eventKey="0" />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <div>
              <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="#link1">
                  Link 1
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>,
    );

    wrapper.find('ListGroupItem').simulate('click');

    wrapper
      .find('AccordionCollapse')
      .at(0)
      .getDOMNode()
      .className.should.include('show');
  });

  it('Should not close accordion when child Nav clicked', () => {
    const wrapper = mount(
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle eventKey="0" />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Nav activeKey="/home">
              <Nav.Item>
                <Nav.Link href="#">Active</Nav.Link>
              </Nav.Item>
            </Nav>
          </Accordion.Collapse>
        </Card>
      </Accordion>,
    );

    wrapper.find('NavLink').simulate('click');

    wrapper
      .find('AccordionCollapse')
      .at(0)
      .getDOMNode()
      .className.should.include('show');
  });
});
