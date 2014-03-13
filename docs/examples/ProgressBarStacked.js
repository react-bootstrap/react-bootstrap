/** @jsx React.DOM */

var progressInstance = (
    <ProgressBar>
      <ProgressBar bsStyle="success" now={35} key={1} />
      <ProgressBar bsStyle="warning" now={20} key={2}  />
      <ProgressBar bsStyle="danger" now={10} key={3}  />
    </ProgressBar>
  );

React.renderComponent(progressInstance, mountNode);