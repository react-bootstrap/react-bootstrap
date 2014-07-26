/** @jsx React.DOM */

var listgroupInstance = (
    <ListGroup>
      <ListGroupItem bsStyle="success">Success</ListGroupItem>
      <ListGroupItem bsStyle="info">Info</ListGroupItem>
      <ListGroupItem bsStyle="warning">Warning</ListGroupItem>
      <ListGroupItem bsStyle="danger">Danger</ListGroupItem>
    </ListGroup>
  );

React.renderComponent(listgroupInstance, mountNode);
