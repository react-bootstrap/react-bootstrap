function handleClick() {
  alert('You have clicked on me');
}

const panelInstance = (
  <Panel onClick={ handleClick }>
    Basic panel example
  </Panel>
);

ReactDOM.render(panelInstance, mountNode);
