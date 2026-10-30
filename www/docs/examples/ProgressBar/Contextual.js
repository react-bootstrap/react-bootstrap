import ProgressBar from 'react-bootstrap/ProgressBar';

function ContextualExample() {
  return (
    <div className="d-flex flex-column gap-2">
      <ProgressBar variant="success" now={40} />
      <ProgressBar variant="info" now={20} />
      <ProgressBar variant="warning" now={60} />
      <ProgressBar variant="danger" now={80} />
    </div>
  );
}

export default ContextualExample;
