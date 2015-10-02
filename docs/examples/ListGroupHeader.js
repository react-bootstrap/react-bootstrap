const listgroupInstance = (
  <ListGroup>
    <ListGroupItem header="Heading 1">Some body text</ListGroupItem>
    <ListGroupItem header="Heading 2" href="#">Linked item</ListGroupItem>
    <ListGroupItem header="Heading 3" bsStyle="danger">Danger styling</ListGroupItem>
  </ListGroup>
);

React.render(listgroupInstance, mountNode);
