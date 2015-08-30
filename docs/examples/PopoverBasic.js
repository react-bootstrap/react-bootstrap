const popoverInstance = (
  <div style={{ height: 120 }}>
    <Popover placement="right" positionLeft={200} positionTop={50} title="Popover right">
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover>
  </div>
);

React.render(popoverInstance, mountNode);
