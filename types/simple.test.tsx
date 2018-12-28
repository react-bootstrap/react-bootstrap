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

<ButtonToolbar>
  <ButtonGroup size="lg">
    <Button href="wooot" />;
  </ButtonGroup>
</ButtonToolbar>;

<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>;
