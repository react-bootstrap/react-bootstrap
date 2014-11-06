var key = '1';

function renderTabbedArea () {
  var tabbedAreaInstance = (
    <TabbedArea activeKey={key} onSelect={handleSelect}>
      <TabPane key='1' tab="Tab 1">TabPane 1 content</TabPane>
      <TabPane key='2' tab="Tab 2">TabPane 2 content</TabPane>
    </TabbedArea>
  );
  React.render(tabbedAreaInstance, mountNode);
}

function handleSelect (selectedKey) {
  alert('selected ' + selectedKey);
  key = selectedKey;
  renderTabbedArea();
}

renderTabbedArea();