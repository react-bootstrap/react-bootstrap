function handleClick() {
  alert('You have clicked on me');
}

const panelInstance = (
  <Panel onClick={handleClick}>
    <Panel.Body>Basic panel example</Panel.Body>
  </Panel>
);

render(panelInstance);
