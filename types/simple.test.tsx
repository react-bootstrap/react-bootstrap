import * as React from 'react';

import {
  Alert,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  ButtonToolbar,
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
