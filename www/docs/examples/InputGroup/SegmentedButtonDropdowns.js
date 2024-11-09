import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';

function SegmentedButtonDropdownsExample() {
  return (
    <>
      <InputGroup className="mb-3">
        <SplitButton
          variant="outline-secondary"
          title="Action"
          id="segmented-button-dropdown-1"
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </SplitButton>
        <Form.Control aria-label="Text input with dropdown button" />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control aria-label="Text input with dropdown button" />
        <SplitButton
          variant="outline-secondary"
          title="Action"
          id="segmented-button-dropdown-2"
          alignRight
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </SplitButton>
      </InputGroup>
    </>
  );
}

export default SegmentedButtonDropdownsExample;
