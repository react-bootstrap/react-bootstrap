import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function ButtonsExample() {
  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <Button variant="secondary">Save changes</Button>
      <Button variant="outline-secondary">Cancel</Button>
    </Stack>
  );
}

export default ButtonsExample;
