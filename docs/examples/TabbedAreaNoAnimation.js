/** @jsx React.DOM */

var tabbedAreaInstance = (
    <TabbedArea defaultActiveKey={1} animation={false}>
      <TabPane key={1} tab="Tab 1">TabPane 1 content</TabPane>
      <TabPane key={2} tab="Tab 2">TabPane 2 content</TabPane>
    </TabbedArea>
  );

React.renderComponent(tabbedAreaInstance, mountNode);