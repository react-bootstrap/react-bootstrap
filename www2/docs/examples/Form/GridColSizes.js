import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function GridColSizesExample() {
  return (
    <Form>
      <Row>
        <Col xs={7}>
          <Form.Control placeholder="City" />
        </Col>
        <Col>
          <Form.Control placeholder="State" />
        </Col>
        <Col>
          <Form.Control placeholder="Zip" />
        </Col>
      </Row>
    </Form>
  );
}

export default GridColSizesExample;
