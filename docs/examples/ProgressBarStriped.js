const progressInstance = (
  <div>
    <ProgressBar striped bsStyle="success" now={40} />
    <ProgressBar striped bsStyle="info" now={20} />
    <ProgressBar striped bsStyle="warning" now={60} />
    <ProgressBar striped bsStyle="danger" now={80} />
  </div>
);

React.render(progressInstance, mountNode);
