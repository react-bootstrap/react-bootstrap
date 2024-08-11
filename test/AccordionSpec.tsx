import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Accordion from '../src/Accordion';
import AccordionCollapse from '../src/AccordionCollapse';
import Dropdown from '../src/Dropdown';
import ListGroup from '../src/ListGroup';
import Nav from '../src/Nav';

describe('<Accordion>', () => {
  it('should output a div', () => {
    render(<Accordion data-testid="test" />);

    expect(screen.getByTestId('test').tagName).toEqual('DIV');
  });

  it('should render flush prop', () => {
    render(<Accordion flush data-testid="test" />);

    const node = screen.getByTestId('test');
    expect(node.classList).toContain('accordion');
    expect(node.classList).toContain('accordion-flush');
  });

  it('should output a h1', () => {
    render(
      <Accordion>
        <Accordion.Button>Hi</Accordion.Button>
        <AccordionCollapse as="h1" eventKey="0" data-testid="test-collapse">
          <span>hidden Data</span>
        </AccordionCollapse>
      </Accordion>,
    );

    expect(screen.getByTestId('test-collapse').tagName).toEqual('H1');
  });

  it('should only have second item collapsed', () => {
    render(
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

    expect(screen.getByTestId('item-0').querySelector('.show')).toBeTruthy();
    expect(
      screen.getByTestId('item-1').querySelector('.collapse'),
    ).toBeTruthy();
  });

  it('should expand next item and collapse current item on click', async () => {
    const onClickSpy = vi.fn();

    render(
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

    fireEvent.click(screen.getByText('Button item 1'));

    expect(onClickSpy).toBeCalledTimes(1);

    expect(
      screen.getByTestId('item-0').querySelector('.collapse'),
    ).toBeTruthy();

    const item1 = screen.getByTestId('item-1');
    expect(item1.querySelector('.collapsing')).toBeTruthy();

    await waitFor(() => expect(item1.querySelector('.show')).toBeTruthy(), {
      container: item1,
    });
  });

  it('should collapse current item on click', async () => {
    const onClickSpy = vi.fn();

    render(
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

    fireEvent.click(screen.getByText('Button item 0'));

    expect(onClickSpy).toBeCalledTimes(1);

    expect(
      screen.getByTestId('item-1').querySelector('.collapse'),
    ).toBeTruthy();

    const item0 = screen.getByTestId('item-0');
    expect(item0.querySelector('.collapsing')).toBeTruthy();
    await waitFor(() => expect(item0.querySelector('.show')).to.not.exist, {
      container: item0,
    });
  });

  // https://github.com/react-bootstrap/react-bootstrap/issues/4176
  it('Should not close accordion when child dropdown clicked', () => {
    render(
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

    fireEvent.click(screen.getByText('Dropdown Action'));

    expect(
      screen.getByTestId('item-0').querySelector('.accordion-collapse.show'),
    ).toBeTruthy();
  });

  it('Should not close accordion when child ListGroup clicked', () => {
    render(
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

    fireEvent.click(screen.getByText('List Group Item 1'));

    expect(
      screen.getByTestId('item-0').querySelector('.accordion-collapse.show'),
    ).toBeTruthy();
  });

  it('Should not close accordion when child Nav clicked', () => {
    render(
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

    fireEvent.click(screen.getByText('Nav Link Item 0'));

    expect(
      screen.getByTestId('item-0').querySelector('.accordion-collapse.show'),
    ).toBeTruthy();
  });

  it('should allow multiple items to stay open', () => {
    const onSelectSpy = vi.fn();

    render(
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

    fireEvent.click(screen.getByText('header0'));
    fireEvent.click(screen.getByText('header1'));

    expect(onSelectSpy).toHaveBeenCalledWith(['0', '1'], expect.anything());
  });

  it('should remove only one of the active indices', () => {
    const onSelectSpy = vi.fn();

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

    expect(onSelectSpy).toHaveBeenCalledWith(['0'], expect.anything());
  });

  it('should pass transition callbacks to underlying AccordionCollapse', async () => {
    const increment = vi.fn();

    const { getByText } = render(
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>header0</Accordion.Header>
          <Accordion.Body
            onEnter={increment}
            onEntering={increment}
            onEntered={increment}
            onExit={increment}
            onExiting={increment}
            onExited={increment}
          >
            body
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('header0'));

    // Wait for body to open.
    await waitFor(() => expect(increment).toBeCalledTimes(3));

    fireEvent.click(getByText('header0'));

    // Wait for body to close.
    await waitFor(() => expect(increment).toBeCalledTimes(6));
  });
});
