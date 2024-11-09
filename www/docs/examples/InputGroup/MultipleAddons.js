import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function MultipleAddonsExample() {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
        <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
      </InputGroup>
      <InputGroup>
        <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
      </InputGroup>
    </>
  );
}

export default MultipleAddonsExample;
