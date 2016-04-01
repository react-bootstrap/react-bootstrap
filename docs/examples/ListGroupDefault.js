const listgroupInstance = (
  <ListGroup>
    <ListGroupItem>Item 1</ListGroupItem>
    <ListGroupItem>Item 2</ListGroupItem>
    <ListGroupItem componentClass="li">3</ListGroupItem>
    <ListGroupItem componentClass="button">4</ListGroupItem>
    <ListGroupItem><ListGroupItemHeading>Title</ListGroupItemHeading><div>4</div></ListGroupItem>
  </ListGroup>
);

ReactDOM.render(listgroupInstance, mountNode);
