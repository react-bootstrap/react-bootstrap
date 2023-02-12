import ListGroup from 'react-bootstrap/ListGroup';

function ButtonExample() {
  const alertClicked = () => {
    alert('You clicked the third ListGroupItem');
  };

  return (
    <ListGroup>
      <ListGroup.Item action>Link 1</ListGroup.Item>
      <ListGroup.Item action>Link 2</ListGroup.Item>
      <ListGroup.Item action onClick={alertClicked}>
        Trigger an alert
      </ListGroup.Item>
    </ListGroup>
  );
}

export default ButtonExample;
