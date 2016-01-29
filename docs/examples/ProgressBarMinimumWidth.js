const progressInstance = (
  <div>
    <ProgressBar now={0} label="%(percent)s%" minWidth={15} />
    <ProgressBar now={2} label="%(percent)s%" minWidth={15} />
  </div>
);

ReactDOM.render(progressInstance, mountNode);
