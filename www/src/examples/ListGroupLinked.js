function alertClicked() {
  alert('You clicked the third ListGroupItem');
}

render(
  <ListGroup>
    <ListGroupItem href="#link1">Link 1</ListGroupItem>
    <ListGroupItem href="#link2">Link 2</ListGroupItem>
    <ListGroupItem onClick={alertClicked}>Trigger an alert</ListGroupItem>
  </ListGroup>
);
