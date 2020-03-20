import * as React from 'react';

import {
  Alert,
  Accordion,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardColumns,
  Carousel,
  Container,
  Col,
  Row,
  Dropdown,
  DropdownButton,
  Form,
  FormFile,
  FormControl,
  InputGroup,
  ListGroup,
  Modal,
  Nav,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
  Pagination,
  Popover,
  ProgressBar,
  Spinner,
  Tabs,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
  Toast,
} from 'react-bootstrap';

<Alert ref={React.createRef<HTMLDivElement>()} dismissible>
  Woop woop
</Alert>;
<Alert.Link as="a" href="blah" />;
<Alert.Heading as="h3" />;

<Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle eventKey="0">Click me!</Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>;

<Badge pill={false}>42</Badge>;

<Badge as="a" href="#" variant="primary" pill>
  42
</Badge>;

<Breadcrumb listProps={{ type: 'I' }}>
  <Breadcrumb.Item />
  <BreadcrumbItem />
  <BreadcrumbItem listItemProps={{ id: 'foo' }} />
</Breadcrumb>;

<Button size="lg" variant="primary" />;
// If custom variants or sizes are desired, cast to any
<Button size="lg" variant={'custom' as any} />;
<Button size={'custom' as any} variant="outline-warning" />;

<ButtonToolbar>
  <ButtonGroup size="lg">
    <Button href="wooot" />;
  </ButtonGroup>
</ButtonToolbar>;

<CardColumns>
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
</CardColumns>;

<Carousel wrap={false}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=First slide&bg=373940"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>;

<Container fluid>
  <Row className="justify-content-md-center">
    <Col xs lg="2">
      1 of 3
    </Col>
    <Col md="auto">Variable width content</Col>
    <Col xs lg={2}>
      3 of 3
    </Col>
  </Row>
  <Row noGutters>
    <Col>1 of 3</Col>
    <Col md="auto">Variable width content</Col>
    <Col xs md={{ span: 4, offset: 4 }}>
      3 of 3
    </Col>
  </Row>
</Container>;

<Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item eventKey="key">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>;

<DropdownButton id="dropdown-basic-button" title="Dropdown button">
  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton>;

<Form>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Email address</Form.Label>
    <Form.Control
      type="email"
      placeholder="name@example.com"
      innerRef={React.createRef<HTMLInputElement>()}
      onChange={(e: React.FormEvent<HTMLInputElement>) => {
        e;
      }}
    />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Example select</Form.Label>
    <Form.Control
      as="select"
      innerRef={React.createRef<HTMLSelectElement>()}
      onChange={(e: React.FormEvent<HTMLSelectElement>) => {
        e;
      }}
    >
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label column={false}>Example multiple select</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Example textarea</Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      innerRef={React.createRef<HTMLTextAreaElement>()}
      onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
        e;
      }}
    />
  </Form.Group>
  <Form.Group as={Row} controlId="exampleForm.HorizontalControl">
    <Form.Label column sm={2}>
      Horizontal
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="text" placeholder="Hoizontal" />
    </Col>
  </Form.Group>
  <Form.File id="custom-file" label="Custom file input" custom />
  <Form.File
    ref={React.createRef<HTMLInputElement & FormFile>()}
    id="custom-file-ref"
    label="Custom file input"
    custom
  />
</Form>;

<div>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Username"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <FormControl
      placeholder="Recipient's username"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>

  <label htmlFor="basic-url">Your vanity URL</label>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon3">
        https://example.com/users/
      </InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl id="basic-url" aria-describedby="basic-addon3" />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text>$</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl aria-label="Amount (to the nearest dollar)" />
    <InputGroup.Append>
      <InputGroup.Text>.00</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>

  <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>With textarea</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" aria-label="With textarea" />
  </InputGroup>
</div>;

<ListGroup defaultActiveKey="#link1">
  <ListGroup.Item action href="#link1">
    Link 1
  </ListGroup.Item>
  <ListGroup.Item action href="#link2" disabled>
    Link 2
  </ListGroup.Item>
  <ListGroup.Item action>This one is a button</ListGroup.Item>
</ListGroup>;

<Modal show={false} onHide={() => {}}>
  <Modal.Header closeButton>
    <Modal.Title>Modal heading</Modal.Title>
  </Modal.Header>
  <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => {}}>
      Close
    </Button>
    <Button variant="primary" onClick={() => {}}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>;

<Nav variant="pills" activeKey="1" onSelect={(k: string) => console.log(k)}>
  <Nav.Item>
    <Nav.Link eventKey="1" href="#/home">
      NavLink 1 content
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="2" title="Item">
      NavLink 2 content
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="3" disabled>
      NavLink 3 content
    </Nav.Link>
  </Nav.Item>
  <NavDropdown title="Dropdown" id="nav-dropdown">
    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
    <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
  </NavDropdown>
</Nav>;

<OverlayTrigger
  placement="left"
  overlay={
    <Tooltip id="tooltip-left">
      Tooltip on <strong>left</strong>.
    </Tooltip>
  }
>
  <Button variant="secondary">Tooltip on left</Button>
</OverlayTrigger>;

<Spinner
  as="span"
  animation="border"
  variant="primary"
  size="sm"
  role="state"
/>;

<Spinner animation="grow">
  <span>Something Inside</span>
</Spinner>;

<Toast>
  <Toast.Header>
    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
    <strong className="mr-auto">Bootstrap</strong>
    <small>11 mins ago</small>
  </Toast.Header>
  <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
</Toast>;

<Pagination>
  <Pagination.First />
  <Pagination.Prev />
  <Pagination.Item>{1}</Pagination.Item>
  <Pagination.Ellipsis />

  <Pagination.Item>{10}</Pagination.Item>
  <Pagination.Item>{11}</Pagination.Item>
  <Pagination.Item active>{12}</Pagination.Item>
  <Pagination.Item>{13}</Pagination.Item>
  <Pagination.Item disabled>{14}</Pagination.Item>

  <Pagination.Ellipsis />
  <Pagination.Item>{20}</Pagination.Item>
  <Pagination.Next />
  <Pagination.Last />
</Pagination>;

<Popover id="test-popover">
  <Popover.Title>Popover title</Popover.Title>
  <Popover.Content>
    <strong>Popover Content</strong>
  </Popover.Content>
</Popover>;

<div>
  <ProgressBar striped variant="success" min={-10} now={40} max={200} />
  <ProgressBar striped animated variant="info" now={20} />
  <ProgressBar striped variant="warning" now={60} />
  <ProgressBar striped variant="danger" now={80} />
</div>;

<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
  <Tab eventKey="home" title="Home">
    <div />
  </Tab>
  <Tab eventKey="profile" title="Profile">
    <div />
  </Tab>
  <Tab eventKey="contact" title="Contact" disabled>
    <div />
  </Tab>
</Tabs>;

<ToggleButtonGroup type="checkbox" name="options" defaultValue={[1]}>
  <ToggleButton value={1}>Radio 1 (pre-checked)</ToggleButton>
  <ToggleButton value={2}>Radio 2</ToggleButton>
  <ToggleButton value={3}>Radio 3</ToggleButton>
</ToggleButtonGroup>;

// As = ComponentClass
<Tabs invalidProp="2" />; // $ExpectError
<Alert.Link invalidProp="2" />; // $ExpectError
<Dropdown.Item invalidProp="2" />; // $ExpectError
<Nav.Link invalidProp="2" />; // $ExpectError
<Spinner invalidProp="2" animation="border" />; // $ExpectError
<ToggleButton invalidProp="2" />; // $ExpectError
<ToggleButtonGroup invalidProp="2" />; // $ExpectError

// As = intrinsic
<Button invalidProp="2" />; // $ExpectError
<Alert invalidProp="2" />; // $ExpectError
<Badge invalidProp="2" />; // $ExpectError

// AS = ComponentClass
<Spinner as={Button} colSpan="secondary" />; // $ExpectError
<Spinner as={Button} active animation="border" />;

// As = Intrinsic
<Button<'img'> as="img" bla="foo" />; // $ExpectError
<Button as="img" src="bla" />;
