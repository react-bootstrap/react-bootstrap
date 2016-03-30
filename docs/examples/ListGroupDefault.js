let header = (<div>Header 5</div>);

const listgroupInstance = (
  <ListGroup>
    <ListGroupItem>Item 1</ListGroupItem>
    <ListGroupItem>Item 2</ListGroupItem>
    <ListGroupItem>...</ListGroupItem>
    <ListGroupItem header="Header 4"><div>Item 4</div></ListGroupItem>
    <ListGroupItem header={header}><div>Item 5</div></ListGroupItem>
    <ListGroupItem header="Header 6"><ul><li>Item 6</li></ul></ListGroupItem>
  </ListGroup>
);

ReactDOM.render(listgroupInstance, mountNode);
