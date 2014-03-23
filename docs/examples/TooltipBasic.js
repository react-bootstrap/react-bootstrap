/** @jsx React.DOM */

var holderStyle = {height: 50};

var tooltipInstance = (
    <div style={holderStyle}>
      <Tooltip placement="right" positionLeft={150} positionTop={50}>
        <strong>Holy guacamole!</strong> Check this info.
      </Tooltip>
    </div>
  );

React.renderComponent(tooltipInstance, mountNode);