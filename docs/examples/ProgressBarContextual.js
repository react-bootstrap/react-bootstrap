const progressInstance = (
  <div>
    <ProgressBar bsStyle="success" now={40} />
    <ProgressBar bsStyle="info" now={20} />
    <ProgressBar bsStyle="warning" now={60} />
    <ProgressBar bsStyle="danger" now={80} />
  </div>
);

React.render(progressInstance, mountNode);
