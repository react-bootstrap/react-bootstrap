import Button from 'react-bootstrap/Button';

function DisabledExample() {
  return (
    <>
      <Button variant="primary" size="lg" disabled>
        Primary button
      </Button>{' '}
      <Button variant="secondary" size="lg" disabled>
        Button
      </Button>{' '}
      <Button href="#" variant="secondary" size="lg" disabled>
        Link
      </Button>
    </>
  );
}

export default DisabledExample;
