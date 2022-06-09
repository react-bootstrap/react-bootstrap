import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ContainerFluidBreakpointExample() {
  return (
    <Container fluid="md">
      <Row>
        <Col>1 of 1</Col>
      </Row>
    </Container>
  );
}

export default ContainerFluidBreakpointExample;
