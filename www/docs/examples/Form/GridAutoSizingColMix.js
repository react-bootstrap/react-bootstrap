import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function GridAutoSizingColMixExample() {
  return (
    <Form>
      <Row className="align-items-center">
        <Col sm={3} className="my-1">
          <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
            Name
          </Form.Label>
          <Form.Control id="inlineFormInputName" placeholder="Jane Doe" />
        </Col>
        <Col sm={3} className="my-1">
          <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
            Username
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              id="inlineFormInputGroupUsername"
              placeholder="Username"
            />
          </InputGroup>
        </Col>
        <Col xs="auto" className="my-1">
          <Form.Check
            type="checkbox"
            id="autoSizingCheck2"
            label="Remember me"
          />
        </Col>
        <Col xs="auto" className="my-1">
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default GridAutoSizingColMixExample;
