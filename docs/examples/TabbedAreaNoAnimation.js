const tabbedAreaInstance = (
  <TabbedArea defaultActiveKey={1} animation={false}>
    <TabPane eventKey={1} tab='Tab 1'>TabPane 1 content</TabPane>
    <TabPane eventKey={2} tab='Tab 2'>TabPane 2 content</TabPane>
    <TabPane eventKey={3} tab='Tab 3' disabled={true}>TabPane 3 content</TabPane>
  </TabbedArea>
);

React.render(tabbedAreaInstance, mountNode);
