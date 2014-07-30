/** @jsx React.DOM */

var listgroupInstance = (
    <ListGroup>
      <ListGroupItem href="#link1">Link 1</ListGroupItem>
      <ListGroupItem href="#link2">Link 2</ListGroupItem>
      <ListGroupItem href="#linkN">...</ListGroupItem>
    </ListGroup>
  );

React.renderComponent(listgroupInstance, mountNode);
