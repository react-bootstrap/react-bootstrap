/** @jsx React.DOM */

var labelInstance = (
  <div>
    <h1>Label <Label>Default</Label></h1>
    <h2>Label <Label>Primary</Label></h2>
    <h3>Label <Label>Success</Label></h3>
    <h4>Label <Label>Info</Label></h4>
    <h5>Label <Label>Warning</Label></h5>
    <p>Label <Label>Danger</Label></p>
  </div>
);

React.renderComponent(labelInstance, mountNode);