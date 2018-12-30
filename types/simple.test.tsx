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
} from 'react-bootstrap';

<Alert>Woop woop</Alert>;
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
