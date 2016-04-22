import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ProgressBarSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="progress">Progress bars</Anchor> <small>ProgressBar</small>
      </h2>

      <p className="lead">Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.</p>

      <h2><Anchor id="progress-basic">Basic example</Anchor></h2>
      <p>Default progress bar.</p>
      <ReactPlayground codeText={Samples.ProgressBarBasic} />

      <h2><Anchor id="progress-label">With label</Anchor></h2>
      <p>Add a <code>label</code> prop to show a visible percentage. For low percentages, consider adding a min-width to ensure the label's text is fully visible.</p>
      <ReactPlayground codeText={Samples.ProgressBarWithLabel} />

      <h2><Anchor id="progress-screenreader-label">Screenreader only label</Anchor></h2>
      <p>Add a <code>srOnly</code> prop to hide the label visually.</p>
      <ReactPlayground codeText={Samples.ProgressBarScreenreaderLabel} />

      <h2><Anchor id="progress-contextual">Contextual alternatives</Anchor></h2>
      <p>Progress bars use some of the same button and alert classes for consistent styles.</p>
      <ReactPlayground codeText={Samples.ProgressBarContextual} />

      <h2><Anchor id="progress-striped">Striped</Anchor></h2>
      <p>Uses a gradient to create a striped effect. Not available in IE8.</p>
      <ReactPlayground codeText={Samples.ProgressBarStriped} />

      <h2><Anchor id="progress-animated">Animated</Anchor></h2>
      <p>Add <code>active</code> prop to animate the stripes right to left. Not available in IE9 and below.</p>
      <ReactPlayground codeText={Samples.ProgressBarAnimated} />

      <h2><Anchor id="progress-stacked">Stacked</Anchor></h2>
      <p>Nest <code>&lt;ProgressBar /&gt;</code>s to stack them.</p>
      <ReactPlayground codeText={Samples.ProgressBarStacked} />

      <h3><Anchor id="progress-props">ProgressBar</Anchor></h3>
      <PropTable component="ProgressBar"/>
    </div>
  );
}
