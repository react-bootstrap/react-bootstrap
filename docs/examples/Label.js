/** @jsx React.DOM */

var labelInstance = (
  <div>
    <h1>Label <Label bsStyle="default">Default</Label></h1>
    <h2>Label <Label bsStyle="primary">Primary</Label></h2>
    <h3>Label <Label bsStyle="success">Success</Label></h3>
    <h4>Label <Label bsStyle="info">Info</Label></h4>
    <h5>Label <Label bsStyle="warning">Warning</Label></h5>
    <p>Label <Label bsStyle="danger">Danger</Label></p>
  </div>
);

React.renderComponent(labelInstance, mountNode);