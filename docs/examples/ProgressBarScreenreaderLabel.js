/** @jsx React.DOM */

var progressInstance = (
    <ProgressBar now={60} label="%(percent)s%" srOnly />
  );

React.renderComponent(progressInstance, mountNode);