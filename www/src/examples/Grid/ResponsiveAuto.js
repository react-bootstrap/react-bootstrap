import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ResponsiveAutoExample() {
  return (
    <Container>
      <Row>
        <Col sm={8}>sm=8</Col>
        <Col sm={4}>sm=4</Col>
      </Row>
      <Row>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
      </Row>
    </Container>
  );
}

export default ResponsiveAutoExample;
