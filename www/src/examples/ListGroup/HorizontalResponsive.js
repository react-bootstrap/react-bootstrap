['sm', 'md', 'lg', 'xl'].map((breakpoint, idx) => (
  <ListGroup layout={`horizontal-${breakpoint}`} className="my-2" key={idx}>
    <ListGroup.Item>This ListGroup</ListGroup.Item>
    <ListGroup.Item>renders horizontally</ListGroup.Item>
    <ListGroup.Item>on {breakpoint}</ListGroup.Item>
    <ListGroup.Item>and above!</ListGroup.Item>
  </ListGroup>
));
