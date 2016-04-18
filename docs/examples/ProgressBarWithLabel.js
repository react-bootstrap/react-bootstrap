const now = 60;

const progressInstance = (
  <ProgressBar now={now} label={`${now}%`} />
);

ReactDOM.render(progressInstance, mountNode);
