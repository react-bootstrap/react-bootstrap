var tabbedAreaInstance = (
    <TabbedArea defaultActiveKey={2}>
      <TabPane selectKey={1} tab="Tab 1">TabPane 1 content</TabPane>
      <TabPane selectKey={2} tab="Tab 2">TabPane 2 content</TabPane>
    </TabbedArea>
  );

React.render(tabbedAreaInstance, mountNode);