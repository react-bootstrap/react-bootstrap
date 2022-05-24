/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  CardGroup,
  Carousel,
  Container,
  Col,
  Collapse,
  Row,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  Fade,
  Figure,
  Form,
  FormControl,
  Image,
  InputGroup,
  ListGroup,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  Overlay,
  OverlayTrigger,
  Tooltip,
  Pagination,
  Popover,
  ProgressBar,
  Spinner,
  SplitButton,
  Stack,
  Table,
  Tabs,
  Tab,
  ThemeProvider,
  ToggleButtonGroup,
  ToggleButton,
  Toast,
  ModalDialog,
} from '../src';
import BootstrapModalManager from '../src/BootstrapModalManager';

import { CarouselRef } from '../src/Carousel';

const style: React.CSSProperties = {
  color: 'red',
};

const RefTest = () => {
  const carouselRef = React.useRef<CarouselRef>();
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  carouselRef?.current?.element;
  carouselRef?.current?.prev();
  carouselRef?.current?.next();

  return (
    <>
      <Carousel ref={carouselRef} />
    </>
  );
};

class ClassComponent extends React.Component {
  render() {
    return <div>abc</div>;
  }
}

const FunctionComponent: React.FC = () => <div>abc</div>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const MegaComponent = () => (
  <>
    <Fade>
      <div>abc</div>
    </Fade>
    <Fade>
      <ClassComponent />
    </Fade>
    <Fade>
      <FunctionComponent />
    </Fade>
    <Collapse>
      <div>abc</div>
    </Collapse>
    <Collapse>
      <ClassComponent />
    </Collapse>
    <Collapse>
      <FunctionComponent />
    </Collapse>
    <Alert transition={Fade} />
    <Alert transition={Collapse} />
    <Alert
      ref={React.createRef<HTMLDivElement>()}
      style={style}
      closeLabel="close"
      dismissible
      onClose={noop}
      show
      variant="primary"
      bsPrefix="alert"
    >
      Woop woop
    </Alert>
    <Alert.Link as="a" href="blah" style={style} bsPrefix="alert-link" />
    <Alert.Heading as="h3" style={style} bsPrefix="alert-heading" />
    <Accordion
      defaultActiveKey="0"
      activeKey="0"
      as="div"
      bsPrefix="accordion"
      style={style}
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header as="div" onClick={noop} style={style}>
          Click me!
        </Accordion.Header>
        <Accordion.Body>Body</Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <Badge as="div" pill={false} style={style}>
      42
    </Badge>
    <Badge as="a" href="#" bg="primary" pill>
      42
    </Badge>
    <Breadcrumb
      as="div"
      listProps={{ type: 'I' }}
      style={style}
      label="label"
      bsPrefix="breadcrumb"
    >
      <Breadcrumb.Item
        active={false}
        as="li"
        href="#"
        linkAs="a"
        target="#"
        title="mytitle"
        bsPrefix="breadcrumbitem"
        style={style}
      />
      <BreadcrumbItem />
      <BreadcrumbItem linkProps={{ id: 'foo' }} />
    </Breadcrumb>
    <Button
      active={false}
      as="a"
      disabled={false}
      href="#"
      size="lg"
      type="button"
      variant="primary"
      bsPrefix="btn"
      style={style}
    />
    {/* If custom variants or sizes are desired, cast to any */}
    <Button size="lg" variant={'custom' as any} style={style} />
    <Button size={'custom' as any} variant="outline-warning" />
    <ButtonToolbar role="group" bsPrefix="toolbar" style={style}>
      <ButtonGroup
        as="div"
        role="group"
        size="lg"
        vertical
        bsPrefix="btn-group"
        style={style}
      >
        <Button href="wooot" />
      </ButtonGroup>
    </ButtonToolbar>
    <Card
      as="div"
      bg="primary"
      body
      border="primary"
      text="primary"
      bsPrefix="card"
      style={{ width: '18rem' }}
    >
      <Card.Img
        as="img"
        variant="top"
        src="holder.js/100px180"
        bsPrefix="cardimg"
        style={style}
      />
      <Card.ImgOverlay
        as="img"
        src="holder.js/100px180"
        bsPrefix="cardimg"
        style={style}
      />
      <Card.Body as="div" bsPrefix="cardbody" style={style}>
        <Card.Title style={style}>Card Title</Card.Title>
        <Card.Text style={style}>
          Some quick example text to build on the card title and make up the
          bulk of the card content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <CardGroup as="div" bsPrefix="cardgroup" style={style} />
    <Carousel
      activeIndex={1}
      as="div"
      controls
      fade
      indicators
      interval={1000}
      keyboard
      nextIcon={<span />}
      nextLabel="next"
      onSelect={noop}
      onSlid={noop}
      onSlide={noop}
      pause="hover"
      prevIcon={<span />}
      prevLabel="previous"
      slide
      touch
      wrap={false}
      bsPrefix="carousel"
      style={style}
    >
      <Carousel.Item as="div" bsPrefix="item" style={style}>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption as="div" bsPrefix="caption" style={style}>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
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
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <Container as="div" fluid bsPrefix="container" style={style}>
      <Row xs="auto" />
      <Row xs={{ cols: 'auto' }} />
      <Row
        as="div"
        xs={1}
        sm={1}
        md={1}
        lg={1}
        xl={1}
        xxl={1}
        bsPrefix="row"
        className="justify-content-md-center"
      >
        <Col xs sm md lg="2" xl xxl bsPrefix="col">
          1 of 3
        </Col>
        <Col md="auto">Variable width content</Col>
        <Col xs lg={2}>
          3 of 3
        </Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col md="auto">Variable width content</Col>
        <Col xs md={{ span: 4, offset: 4 }}>
          3 of 3
        </Col>
      </Row>
      <Row
        xs={{ cols: 1 }}
        sm={{ cols: 1 }}
        md={{ cols: 1 }}
        lg={{ cols: 1 }}
        xl={{ cols: 1 }}
      />
    </Container>
    <Container fluid="sm" />
    <Dropdown
      align="end"
      as="div"
      drop="up"
      flip
      focusFirstItemOnShow="keyboard"
      navbar
      onSelect={noop}
      onToggle={noop}
      show
      bsPrefix="dropdown"
      style={style}
    >
      <Dropdown.Toggle
        as="button"
        childBsPrefix="childprefix"
        variant="success"
        id="dropdown-basic"
        split
        style={style}
      >
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu
        as="div"
        flip
        onSelect={noop}
        popperConfig={{}}
        renderOnMount
        rootCloseEvent="click"
        show
        bsPrefix="dropdownmenu"
        style={style}
        align={{ sm: 'start' }}
      >
        <Dropdown.Item
          active
          as="a"
          disabled
          eventKey="key"
          href="#"
          onClick={noop}
          onSelect={noop}
          bsPrefix="dropdownitem"
          style={style}
        >
          Action
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        <Dropdown.Header as="div" bsPrefix="dropdownheader" style={style} />
        <Dropdown.Divider as="div" bsPrefix="dropdowndivider" style={style} />
        <Dropdown.Divider as="div" bsPrefix="prefix" style={style} />
      </Dropdown.Menu>
      <Dropdown.Menu align="start" />
      <Dropdown.Menu align="end" />
    </Dropdown>
    <DropdownButton
      disabled
      href="#"
      id="dropdown-basic-button"
      menuRole="role"
      onClick={noop}
      renderMenuOnMount
      rootCloseEvent="click"
      size="lg"
      title="Dropdown button"
      variant="primary"
      bsPrefix="dropdownbtn"
      style={style}
      align={{ sm: 'start' }}
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    <Figure as="figure" bsPrefix="figure" style={style} />
    <Figure.Image
      fluid
      rounded
      roundedCircle
      thumbnail
      bsPrefix="img"
      style={style}
    />
    <Figure.Caption as="figcaption" bsPrefix="figurecaption" />
    <Form ref={React.createRef<HTMLFormElement>()} as="form" validated>
      <Form.Group
        ref={React.createRef<HTMLDivElement>()}
        as="div"
        controlId="exampleForm.ControlInput1"
        style={style}
      >
        <Form.Label
          ref={React.createRef<HTMLDivElement>()}
          as="div"
          column="sm"
          htmlFor="id"
          visuallyHidden
          bsPrefix="formlabel"
          style={style}
        >
          Email address
        </Form.Label>
        <Form.Text
          ref={React.createRef<HTMLElement>()}
          as="small"
          muted
          bsPrefix="formtext"
          style={style}
        />
        <Form.Control
          as="input"
          disabled
          htmlSize={1}
          id="id"
          isInvalid
          isValid
          plaintext
          readOnly
          size="sm"
          type="email"
          value="a"
          bsPrefix="formcontrol"
          placeholder="name@example.com"
          ref={React.createRef<HTMLInputElement>()}
          onChange={(e) =>
            // $ExpectType ChangeEvent<FormControlElement>
            e
          }
          style={style}
        />
        <FormControl.Feedback as="div" tooltip type="valid" style={style} />
        <Form.Check
          ref={React.createRef<HTMLInputElement>()}
          as="input"
          disabled
          feedback="test"
          feedbackTooltip
          id="id"
          inline
          isInvalid
          isValid
          label="label"
          title="title"
          type="checkbox"
          bsPrefix="formcheck"
          bsSwitchPrefix="formswitch"
          style={style}
        >
          <Form.Check.Input
            as="input"
            id="id"
            isInvalid
            isValid
            type="radio"
            bsPrefix="formcheckinput"
            style={style}
          />
          <Form.Check.Label htmlFor="for" bsPrefix="formlabel" style={style} />
        </Form.Check>
        <Form.Range
          bsPrefix="prefix"
          ref={React.createRef<HTMLInputElement>()}
          min={0}
          max={100}
          value={50}
          className="class"
          style={style}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Example select</Form.Label>
        <Form.Select
          ref={React.createRef<HTMLSelectElement>()}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => e}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label column={false}>Example multiple select</Form.Label>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          ref={React.createRef<HTMLTextAreaElement>()}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => e}
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
      <Form.Group as={Row} controlId="exampleForm.HorizontalControl">
        <Form.Label column="sm" sm={2}>
          Horizontal
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Hoizontal" />
        </Col>
      </Form.Group>
      <Form.Switch label="Switch" disabled />
      <Form.Control type="color" />
    </Form>
    <Image fluid rounded roundedCircle thumbnail bsPrefix="img" style={style} />
    <div>
      <InputGroup
        as="div"
        size="sm"
        bsPrefix="inputgroup"
        className="mb-3"
        style={style}
      >
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
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
        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
      </InputGroup>

      <label htmlFor="basic-url">Your vanity URL</label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          https://example.com/users/
        </InputGroup.Text>
        <FormControl id="basic-url" aria-describedby="basic-addon3" />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <FormControl aria-label="Amount (to the nearest dollar)" />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>With textarea</InputGroup.Text>
        <FormControl as="textarea" aria-label="With textarea" />
      </InputGroup>
    </div>
    <ListGroup
      as="div"
      horizontal
      variant="flush"
      bsPrefix="list-group"
      defaultActiveKey="#link1"
      style={style}
    >
      <ListGroup.Item
        action
        active
        as="div"
        disabled
        eventKey="1"
        href="#link1"
        onClick={noop}
        variant="primary"
        bsPrefix="listgroupitem"
        style={style}
      >
        Link 1
      </ListGroup.Item>
      <ListGroup.Item action href="#link2" disabled>
        Link 2
      </ListGroup.Item>
      <ListGroup.Item action>This one is a button</ListGroup.Item>
    </ListGroup>
    <Modal
      animation
      aria-labelledby="label"
      autoFocus
      backdrop="static"
      backdropClassName="class"
      centered
      container={React.createRef()}
      dialogAs="div"
      dialogClassName="class"
      enforceFocus
      keyboard
      manager={new BootstrapModalManager()}
      onEnter={noop}
      onEntered={noop}
      onEntering={noop}
      onEscapeKeyDown={noop}
      onExit={noop}
      onExited={noop}
      onExiting={noop}
      onHide={noop}
      onShow={noop}
      restoreFocus
      restoreFocusOptions={{
        preventScroll: false,
      }}
      scrollabel
      show={false}
      size="xl"
      bsPrefix="modal"
      style={style}
    >
      <Modal.Header
        closeButton
        closeLabel="close"
        onHide={noop}
        bsPrefix="header"
        style={style}
      >
        <Modal.Title as="h4" bsPrefix="modaltitle" style={style}>
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body as="div" bsPrefix="modalbody" style={style}>
        Woohoo, you are reading this text in a modal!
      </Modal.Body>
      <Modal.Footer as="div" bsPrefix="modalfooter" style={style}>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save Changes</Button>
      </Modal.Footer>
    </Modal>
    <Modal fullscreen />
    <Modal fullscreen="sm-down" />
    <Modal fullscreen="md-down" />
    <Modal fullscreen="lg-down" />
    <Modal fullscreen="xl-down" />
    <Modal fullscreen="xxl-down" />
    <Modal.Dialog fullscreen />
    <Modal.Dialog fullscreen="sm-down" />
    <Modal.Dialog fullscreen="md-down" />
    <Modal.Dialog fullscreen="lg-down" />
    <Modal.Dialog fullscreen="xl-down" />
    <Modal.Dialog fullscreen="xxl-down" />
    <Modal.Dialog
      centered
      scrollable
      size="sm"
      bsPrefix="modal"
      style={style}
    />
    <Nav
      as="div"
      cardHeaderBsPrefix="prefix"
      fill
      justify
      navbar
      navbarBsPrefix="prefix"
      onKeyDown={noop}
      variant="pills"
      activeKey="1"
      onSelect={(k: string) => {
        // eslint-disable-next-line no-console
        console.log(k);
      }}
      role="role"
      bsPrefix="prefix"
      style={style}
    >
      <Nav.Item as="div" role="role" bsPrefix="prefix" style={style}>
        <Nav.Link
          active
          as="a"
          disabled
          eventKey="1"
          href="#/home"
          onSelect={noop}
          role="role"
          bsPrefix="prefix"
          style={style}
        >
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
      <NavDropdown
        active
        disabled
        menuRole="role"
        onClick={noop}
        renderMenuOnMount
        rootCloseEvent="click"
        title="Dropdown"
        id="nav-dropdown"
        bsPrefix="prefix"
        style={style}
        drop="up"
        align="end"
        show
        flip={false}
        onToggle={noop}
        onSelect={noop}
        focusFirstItemOnShow
        navbar
      >
        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        <NavDropdown.ItemText bsPrefix="prefix" as="div" />
      </NavDropdown>
    </Nav>
    <Navbar
      as="div"
      bg="light"
      collapseOnSelect
      expand="sm"
      expanded
      fixed="top"
      onSelect={noop}
      onToggle={noop}
      role="role"
      sticky="top"
      variant="light"
      bsPrefix="prefix"
      style={style}
    />
    <Navbar.Brand as="div" href="#" bsPrefix="prefix" style={style} />
    <Navbar.Toggle
      as="div"
      label="label"
      onClick={noop}
      bsPrefix="prefix"
      style={style}
    />
    <Navbar.Collapse bsPrefix="prefix" style={style} />
    <Overlay
      container={React.createRef()}
      onEnter={noop}
      onEntered={noop}
      onEntering={noop}
      onExit={noop}
      onExited={noop}
      onExiting={noop}
      onHide={noop}
      placement="auto"
      popperConfig={{}}
      rootClose
      rootCloseEvent="click"
      show
      target={React.createRef()}
      transition
    >
      {(props) => (
        <Tooltip id="overlay-example" {...props}>
          My Tooltip
        </Tooltip>
      )}
    </Overlay>
    <OverlayTrigger
      defaultShow
      delay={1000}
      flip
      popperConfig={{}}
      show
      placement="left"
      trigger="hover"
      overlay={
        <Tooltip id="tooltip-left" style={style}>
          Tooltip on <strong>left</strong>.
        </Tooltip>
      }
    >
      <Button variant="secondary">Tooltip on left</Button>
    </OverlayTrigger>
    <Spinner
      as="span"
      animation="border"
      variant="primary"
      size="sm"
      role="state"
      bsPrefix="prefix"
      style={style}
    />
    <Spinner animation="grow">
      <span>Something Inside</span>
    </Spinner>
    <Toast
      animation
      autohide
      delay={1000}
      onClose={noop}
      show
      bsPrefix="prefix"
      style={style}
    >
      <Toast.Header
        closeButton
        closeLabel="label"
        bsPrefix="prefix"
        style={style}
      >
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body as="div" bsPrefix="prefix" id="id" style={style}>
        Hello, world! This is a toast message.
      </Toast.Body>
    </Toast>
    <Pagination id="id" size="sm" bsPrefix="prefix" style={style}>
      <Pagination.First id="id" style={style} onClick={noop} />
      <Pagination.Prev id="id" style={style} onClick={noop} />
      <Pagination.Item
        id="id"
        active
        activeLabel="label"
        disabled
        style={style}
        onClick={noop}
        href="#"
      >
        {1}
      </Pagination.Item>
      <Pagination.Ellipsis id="id" style={style} />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
    <Popover
      id="test-popover"
      body
      placement="auto"
      popper={{}}
      show
      bsPrefix="popover"
      style={style}
    >
      <Popover.Header as="div" bsPrefix="prefix" style={style}>
        Popover title
      </Popover.Header>
      <Popover.Body as="div" bsPrefix="prefix" style={style}>
        <strong>Popover Content</strong>
      </Popover.Body>
    </Popover>
    <div>
      <ProgressBar striped variant="success" min={-10} now={40} max={200} />
      <ProgressBar striped animated variant="info" now={20} />
      <ProgressBar striped variant="warning" now={60} />
      <ProgressBar striped variant="danger" now={80} />
      <ProgressBar
        id="id"
        label="label"
        visuallyHidden
        bsPrefix="prefix"
        style={style}
      >
        <ProgressBar isChild />
      </ProgressBar>
    </div>
    <SplitButton
      disabled
      href="#"
      id="id"
      menuRole="role"
      onClick={noop}
      renderMenuOnMount
      rootCloseEvent="click"
      size="lg"
      target="target"
      title="title"
      toggleLabel="label"
      type="button"
      variant="primary"
      bsPrefix="splitbutton"
      style={style}
      align={{ sm: 'start' }}
      drop="up"
      onSelect={noop}
      flip
      onToggle={noop}
      focusFirstItemOnShow="keyboard"
      navbar
    >
      <Dropdown.Item />
    </SplitButton>
    <Table
      id="id"
      bordered
      borderless
      hover
      responsive="sm"
      size="sm"
      striped
      variant="dark"
      bsPrefix="prefix"
      style={style}
    />
    <Tabs
      activeKey="profile"
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      mountOnEnter
      onSelect={noop}
      transition={false}
      unmountOnExit
      variant="tabs"
      style={style}
    >
      <Tab eventKey="home" title="Home" id="id" style={style}>
        <div />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <div />
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        <div />
      </Tab>
    </Tabs>
    <Tab.Container
      activeKey="key"
      generateChildId={() => 'id'}
      id="id"
      mountOnEnter
      onSelect={noop}
      transition={false}
      unmountOnExit
    />
    <Tab.Content id="id" as="div" bsPrefix="prefix" style={style} />
    <Tab.Pane
      active
      aria-labelledby="label"
      as="div"
      eventKey="1"
      id="id"
      mountOnEnter
      onEnter={noop}
      onEntered={noop}
      onEntering={noop}
      onExit={noop}
      onExited={noop}
      onExiting={noop}
      transition={false}
      unmountOnExit
      bsPrefix="prefix"
      style={style}
    />
    <ToggleButtonGroup
      type="checkbox"
      name="options"
      defaultValue={[1]}
      onChange={noop}
      value={[1]}
      style={style}
      vertical
      size="lg"
    >
      <ToggleButton
        value={1}
        checked
        disabled={false}
        inputRef={React.createRef()}
        name="name"
        onChange={noop}
        type="checkbox"
        size="lg"
        style={style}
      >
        Radio 1 (pre-checked)
      </ToggleButton>
      <ToggleButton value={2}>Radio 2</ToggleButton>
      <ToggleButton value={3}>Radio 3</ToggleButton>
    </ToggleButtonGroup>
    <Stack direction="horizontal" gap={1} />
    <Stack
      direction="vertical"
      gap={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
    />
    {/* // As = ComponentClass // TODO: Reinstate these? What _is_ ExpectError? */}
    {/*
    <Tabs invalidProp="2" />; // $ExpectError
    <Alert.Link invalidProp="2" />; // $ExpectError
    <Dropdown.Item invalidProp="2" />; // $ExpectError
    <Nav.Link invalidProp="2" />; // $ExpectError
    <Spinner invalidProp="2" animation="border" />; // $ExpectError
    <ToggleButton invalidProp="2" />; // $ExpectError
    <ToggleButtonGroup invalidProp="2" />; // $ExpectError // As = intrinsic
    <Button invalidProp="2" />; // $ExpectError
    <Alert invalidProp="2" />; // $ExpectError
    <Badge invalidProp="2" />; // $ExpectError // AS = ComponentClass
    <Spinner as={Button} colSpan="secondary" />; // $ExpectError
    <Spinner as={Button} active animation="border" />
    // As = Intrinsic
    <Button<'img'> as="img" bla="foo" />; // $ExpectError
    <Button as="img" src="bla" />
    */}
  </>
);

const CustomBreakpoints = () => (
  <ThemeProvider
    dir="rtl"
    breakpoints={['customBreakpoint', 'sm']}
    prefixes={{ a: 'a' }}
  >
    <Container fluid="custom" />
    <Col customBreakpoint="2" />
    <Dropdown align={{ custom: 'start' }}>
      <div />
    </Dropdown>
    <DropdownButton align={{ custom: 'start' }} title="title">
      <div />
    </DropdownButton>
    <DropdownMenu align={{ custom: 'start' }}>
      <div />
    </DropdownMenu>
    <ListGroup horizontal="custom" />
    <Modal fullscreen="custom" />
    <ModalDialog fullscreen="custom" />
    <Navbar expand="custom" />
    <Row customBreakpoint="auto" />
    <SplitButton align={{ custom: 'start' }} title="title">
      <div />
    </SplitButton>
  </ThemeProvider>
);
