import Dropdown from 'react-bootstrap/Dropdown';

function MenuDividersExample() {
  return (
    <Dropdown.Menu show>
      <Dropdown.Item eventKey="1">Action</Dropdown.Item>
      <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
      <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    </Dropdown.Menu>
  );
}

export default MenuDividersExample;
