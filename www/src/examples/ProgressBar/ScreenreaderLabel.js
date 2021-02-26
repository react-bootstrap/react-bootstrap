const now = 60;

const progressInstance = (
  <ProgressBar now={now} label={`${now}%`} visuallyHidden />
);

render(progressInstance);
