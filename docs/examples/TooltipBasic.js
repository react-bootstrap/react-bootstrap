const tooltipInstance = (
  <div>
    <Tooltip placement="right" className="in">
      Tooltip right
    </Tooltip>

    <Tooltip placement="top" className="in">
      Tooltip top
    </Tooltip>

    <Tooltip placement="left" className="in">
      Tooltip left
    </Tooltip>

    <Tooltip placement="bottom" className="in">
      Tooltip bottom
    </Tooltip>
  </div>
);

React.render(tooltipInstance, mountNode);
