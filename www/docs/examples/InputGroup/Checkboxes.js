import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function CheckboxesExample() {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
        <Form.Control aria-label="Text input with checkbox" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Radio aria-label="Radio button for following text input" />
        <Form.Control aria-label="Text input with radio button" />
      </InputGroup>
    </>
  );
}

export default CheckboxesExample;
