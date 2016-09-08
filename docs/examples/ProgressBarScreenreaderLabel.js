const now = 60;

const progressInstance = (
  <ProgressBar now={now} label={`${now}%`} srOnly />
);

ReactDOM.render(progressInstance, mountNode);
