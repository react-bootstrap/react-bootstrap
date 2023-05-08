import Form from 'react-bootstrap/Form';

function InputSizesExample() {
  return (
    <>
      <Form.Control size="lg" type="text" placeholder="Large text" />
      <br />
      <Form.Control type="text" placeholder="Normal text" />
      <br />
      <Form.Control size="sm" type="text" placeholder="Small text" />
    </>
  );
}

export default InputSizesExample;
