import * as React from 'react';

import {
  Alert,
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
} from 'react-bootstrap';

<Alert dismissible>Woop woop</Alert>;
<Alert.Link as="a" href="blah" />;
<Alert.Heading as="h3" />;

<Badge pill={false}>42</Badge>;

<Breadcrumb listProps={{ type: 'I' }}>
  <Breadcrumb.Item />
  <BreadcrumbItem />
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
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>;

<DropdownButton id="dropdown-basic-button" title="Dropdown button">
  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton>;
