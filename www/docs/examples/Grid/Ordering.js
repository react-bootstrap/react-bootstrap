import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function OrderingExample() {
  return (
    <Container>
      <Row>
        <Col xs>First, but unordered</Col>
        <Col xs={{ order: 5 }}>Second, but last</Col>
        <Col xs={{ order: 0 }}>Third, but second</Col>
      </Row>
    </Container>
  );
}

export default OrderingExample;
