import Form from 'react-bootstrap/Form';

function FormFileExample() {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
      <Form.Group controlId="formFileDisabled" className="mb-3">
        <Form.Label>Disabled file input example</Form.Label>
        <Form.Control type="file" disabled />
      </Form.Group>
      <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Label>Small file input example</Form.Label>
        <Form.Control type="file" size="sm" />
      </Form.Group>
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Large file input example</Form.Label>
        <Form.Control type="file" size="lg" />
      </Form.Group>
    </>
  );
}

export default FormFileExample;
