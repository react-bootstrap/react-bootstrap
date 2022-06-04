import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function NestedExample() {
  return (
    <ButtonGroup>
      <Button>1</Button>
      <Button>2</Button>

      <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
        <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
        <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>
  );
}

export default NestedExample;
