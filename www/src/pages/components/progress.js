import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import ProgressBarAnimated from '../../examples/ProgressBar/Animated';
import ProgressBarBasic from '../../examples/ProgressBar/Basic';
import ProgressBarContextual from '../../examples/ProgressBar/Contextual';
import ProgressBarScreenreaderLabel from '../../examples/ProgressBar/ScreenreaderLabel';
import ProgressBarStacked from '../../examples/ProgressBar/Stacked';
import ProgressBarStriped from '../../examples/ProgressBar/Striped';
import ProgressBarWithLabel from '../../examples/ProgressBar/WithLabel';
import withLayout from '../../withLayout';

export default withLayout(function ProgressBarSection({ data }) {
  return (
    <>
      <h2>
        <Anchor id="progress">Progress bars</Anchor>
      </h2>

      <p className="lead">
        Provide up-to-date feedback on the progress of a workflow or action with
        simple yet flexible progress bars.
      </p>

      <h2>
        <Anchor id="progress-basic">Basic example</Anchor>
      </h2>
      <p>Default progress bar.</p>
      <ReactPlayground codeText={ProgressBarBasic} />

      <h2>
        <Anchor id="progress-label">With label</Anchor>
      </h2>
      <p>
        Add a <code>label</code> prop to show a visible percentage. For low
        percentages, consider adding a min-width to ensure the label's text is
        fully visible.
      </p>
      <ReactPlayground codeText={ProgressBarWithLabel} />

      <h2>
        <Anchor id="progress-screenreader-label">
          Screenreader only label
        </Anchor>
      </h2>
      <p>
        Add a <code>srOnly</code> prop to hide the label visually.
      </p>
      <ReactPlayground codeText={ProgressBarScreenreaderLabel} />

      <h2>
        <Anchor id="progress-contextual">Contextual alternatives</Anchor>
      </h2>
      <p>
        Progress bars use some of the same button and alert classes for
        consistent styles.
      </p>
      <ReactPlayground codeText={ProgressBarContextual} />

      <h2>
        <Anchor id="progress-striped">Striped</Anchor>
      </h2>
      <p>Uses a gradient to create a striped effect. Not available in IE8.</p>
      <ReactPlayground codeText={ProgressBarStriped} />

      <h2>
        <Anchor id="progress-animated">Animated</Anchor>
      </h2>
      <p>
        Add <code>active</code> prop to animate the stripes right to left. Not
        available in IE9 and below.
      </p>
      <ReactPlayground codeText={ProgressBarAnimated} />

      <h2>
        <Anchor id="progress-stacked">Stacked</Anchor>
      </h2>
      <p>
        Nest <code>&lt;ProgressBar /&gt;</code>s to stack them.
      </p>
      <ReactPlayground codeText={ProgressBarStacked} />

      <h3>
        <Anchor id="progress-props">ProgressBar</Anchor>
        <LinkToSource component={data.ProgressBar.displayName} />
      </h3>
      <PropTable metadata={data.ProgressBar} />
    </>
  );
});

export const query = graphql`
  query ProgressBarQuery {
    ProgressBar: componentMetadata(displayName: { eq: "ProgressBar" }) {
      ...PropTable_metadata
    }
  }
`;
