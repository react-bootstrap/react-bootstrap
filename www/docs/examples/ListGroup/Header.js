import ListGroup from 'react-bootstrap/ListGroup';

function HeaderExample() {
  return (
    <ListGroup>
      <ListGroup.Item header="Heading 1">Some body text</ListGroup.Item>
      <ListGroup.Item header="Heading 2" href="#">
        Linked item
      </ListGroup.Item>
      <ListGroup.Item header="Heading 3" bsStyle="danger">
        Danger styling
      </ListGroup.Item>
    </ListGroup>
  );
}

export default HeaderExample;
