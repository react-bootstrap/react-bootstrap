import Badge from 'react-bootstrap/Badge';

function VariationsExample() {
  return (
    <div>
      <Badge bg="primary">Primary</Badge>{' '}
      <Badge bg="secondary">Secondary</Badge>{' '}
      <Badge bg="success">Success</Badge> <Badge bg="danger">Danger</Badge>{' '}
      <Badge bg="warning" text="dark">
        Warning
      </Badge>{' '}
      <Badge bg="info">Info</Badge>{' '}
      <Badge bg="light" text="dark">
        Light
      </Badge>{' '}
      <Badge bg="dark">Dark</Badge>
    </div>
  );
}

export default VariationsExample;
