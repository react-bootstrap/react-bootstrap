import ListGroup from 'react-bootstrap/ListGroup';

function HorizontalResponsiveExample() {
  return (
    <>
      {['sm', 'md', 'lg', 'xl', 'xxl'].map((breakpoint) => (
        <ListGroup key={breakpoint} horizontal={breakpoint} className="my-2">
          <ListGroup.Item>This ListGroup</ListGroup.Item>
          <ListGroup.Item>renders horizontally</ListGroup.Item>
          <ListGroup.Item>on {breakpoint}</ListGroup.Item>
          <ListGroup.Item>and above!</ListGroup.Item>
        </ListGroup>
      ))}
    </>
  );
}

export default HorizontalResponsiveExample;
