/** @jsx React.DOM */

var wellInstance = (
  <div>
    <Well bsSize="large">Look I'm in a large well!</Well>
    <Well bsSize="small">Look I'm in a small well!</Well>
  </div>
);

React.renderComponent(wellInstance, mountNode);