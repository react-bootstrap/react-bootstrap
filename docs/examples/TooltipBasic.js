const tooltipInstance = (
  <div style={{ height: 50 }}>
    <Tooltip placement="right" positionLeft={150} positionTop={50}>
      <strong>Holy guacamole!</strong> Check this info.
    </Tooltip>
  </div>
);

React.render(tooltipInstance, mountNode);
