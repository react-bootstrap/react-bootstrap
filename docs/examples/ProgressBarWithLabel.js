/** @jsx React.DOM */

var progressInstance = (
    <ProgressBar now={60} label="%(percent)s%" />
  );

React.renderComponent(progressInstance, mountNode);