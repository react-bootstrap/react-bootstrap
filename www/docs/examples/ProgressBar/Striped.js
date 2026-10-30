import ProgressBar from 'react-bootstrap/ProgressBar';

function StripedExample() {
  return (
    <div className="d-flex flex-column gap-2">
      <ProgressBar striped variant="success" now={40} />
      <ProgressBar striped variant="info" now={20} />
      <ProgressBar striped variant="warning" now={60} />
      <ProgressBar striped variant="danger" now={80} />
    </div>
  );
}

export default StripedExample;
