import { fireEvent, render, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import { expect } from 'chai';

import Accordion from '../src/Accordion';
import AccordionCollapse from '../src/AccordionCollapse';
import Dropdown from '../src/Dropdown';
import ListGroup from '../src/ListGroup';
import Nav from '../src/Nav';

describe('<Accordion>', () => {
  it('should output a div', () => {
    const { getByTestId } = render(<Accordion data-testid="test" />);

    getByTestId('test').tagName.toLowerCase().should.equal('div');
  });

  it('should render flush prop', () => {
    const { getByTestId } = render(<Accordion flush data-testid="test" />);

    const node = getByTestId('test');
    node.classList.contains('accordion').should.be.true;
    node.classList.contains('accordion-flush').should.be.true;
  });

  it('should output a h1', () => {
    const { getByTestId } = render(
      <Accordion>
        <Accordion.Button>Hi</Accordion.Button>
        <AccordionCollapse as="h1" eventKey="0" data-testid="test-collapse">
          <span>hidden Data</span>
        </AccordionCollapse>
      </Accordion>,
    );

    getByTestId('test-collapse').tagName.toLowerCase().should.equal('h1');
  });

  it('should only have second item collapsed', () => {
    const { getByTestId } = render(
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header />
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" data-testid="item-1">
          <Accordion.Header />
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    expect(getByTestId('item-0').querySelector('.show')).to.exist;
    expect(getByTestId('item-1').querySelector('.collapse')).to.exist;
  });

  it('should expand next item and collapse current item on click', async () => {
    const onClickSpy = sinon.spy();

    const { getByTestId, getByText } = render(
      <Accordion>
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header onClick={onClickSpy} />
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" data-testid="item-1">
          <Accordion.Header onClick={onClickSpy} data-testid="item-1-button">
            Button item 1
          </Accordion.Header>
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('Button item 1'));

    onClickSpy.should.be.calledOnce;

    expect(getByTestId('item-0').querySelector('.collapse')).to.exist;

    const item1 = getByTestId('item-1');
    expect(item1.querySelector('.collapsing')).to.exist;

    await waitFor(() => expect(item1.querySelector('.show')).to.exist, {
      container: item1,
    });
  });

  it('should collapse current item on click', async () => {
    const onClickSpy = sinon.spy();

    const { getByTestId, getByText } = render(
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header onClick={onClickSpy}>
            Button item 0
          </Accordion.Header>
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" data-testid="item-1">
          <Accordion.Header onClick={onClickSpy} />
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('Button item 0'));

    onClickSpy.should.be.calledOnce;

    expect(getByTestId('item-1').querySelector('.collapse')).to.exist;

    const item0 = getByTestId('item-0');
    expect(item0.querySelector('.collapsing')).to.exist;
    await waitFor(() => expect(item0.querySelector('.show')).to.not.exist, {
      container: item0,
    });
  });

  // https://github.com/react-bootstrap/react-bootstrap/issues/4176
  it('Should not close accordion when child dropdown clicked', () => {
    const { getByTestId, getByText } = render(
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header />
          <Accordion.Body>
            <Dropdown show>
              <Dropdown.Toggle id="dropdown-test">
                Dropdown Toggle
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Dropdown Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('Dropdown Action'));

    expect(getByTestId('item-0').querySelector('.accordion-collapse.show')).to
      .exist;
  });

  it('Should not close accordion when child ListGroup clicked', () => {
    const { getByTestId, getByText } = render(
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header />
          <Accordion.Body>
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item action href="#link1">
                List Group Item 1
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('List Group Item 1'));

    expect(getByTestId('item-0').querySelector('.accordion-collapse.show')).to
      .exist;
  });

  it('Should not close accordion when child Nav clicked', () => {
    const { getByTestId, getByText } = render(
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header />
          <Accordion.Body>
            <Nav activeKey="/home">
              <Nav.Item>
                <Nav.Link href="#">Nav Link Item 0</Nav.Link>
              </Nav.Item>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('Nav Link Item 0'));

    expect(getByTestId('item-0').querySelector('.accordion-collapse.show')).to
      .exist;
  });

  it('should allow multiple items to stay open', () => {
    const onSelectSpy = sinon.spy();

    const { getByText } = render(
      <Accordion onSelect={onSelectSpy} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>header0</Accordion.Header>
          <Accordion.Body>body</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>header1</Accordion.Header>
          <Accordion.Body>body</Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('header0'));
    fireEvent.click(getByText('header1'));

    onSelectSpy.should.be.calledWith(['0', '1']);
  });

  it('should remove only one of the active indices', () => {
    const onSelectSpy = sinon.spy();

    const { getByText } = render(
      <Accordion
        onSelect={onSelectSpy}
        defaultActiveKey={['0', '1']}
        alwaysOpen
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>header0</Accordion.Header>
          <Accordion.Body>body</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>header1</Accordion.Header>
          <Accordion.Body>body</Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('header1'));

    onSelectSpy.should.be.calledWith(['0']);
  });
});
