import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function ButtonExample() {
  return (
    <>
      <Button variant="primary">
        Notifications <Badge bg="secondary">4</Badge>
        <span className="visually-hidden">unread messages</span>
      </Button>{' '}
      <Button variant="primary" className="position-relative">
        Inbox{' '}
        <Badge positioned pill bg="danger">
          99+
        </Badge>
        <span className="visually-hidden">unread messages</span>
      </Button>{' '}
      <Button variant="primary" className="position-relative">
        Profile <Badge positioned bg="danger" className="p-2" />
        <span className="visually-hidden">New alerts</span>
      </Button>
    </>
  );
}

export default ButtonExample;
