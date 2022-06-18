import Form from 'react-bootstrap/Form';

function NoLabelExample() {
  return (
    <>
      <Form.Check aria-label="option 1" />
      <Form.Check type="radio" aria-label="radio 1" />
    </>
  );
}

export default NoLabelExample;
