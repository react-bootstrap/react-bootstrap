['sm', 'md', 'lg', 'xl', 'xxl'].map((breakpoint, idx) => (
  <ListGroup horizontal={breakpoint} className="my-2" key={idx}>
    <ListGroup.Item>This ListGroup</ListGroup.Item>
    <ListGroup.Item>renders horizontally</ListGroup.Item>
    <ListGroup.Item>on {breakpoint}</ListGroup.Item>
    <ListGroup.Item>and above!</ListGroup.Item>
  </ListGroup>
));
