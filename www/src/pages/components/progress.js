import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import ComponentApi from '../../components/ComponentApi';
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
      <Heading h="1" id="progress">
        Progress bars
      </Heading>

      <p className="lead">
        Provide up-to-date feedback on the progress of a workflow or action with
        simple yet flexible progress bars.
      </p>

      <Heading h="2" id="progress-basic">
        Example
      </Heading>
      <p>Default progress bar.</p>
      <ReactPlayground codeText={ProgressBarBasic} />

      <Heading h="2" id="progress-label">
        With label
      </Heading>
      <p>
        Add a <code>label</code> prop to show a visible percentage. For low
        percentages, consider adding a min-width to ensure the label's text is
        fully visible.
      </p>
      <ReactPlayground codeText={ProgressBarWithLabel} />

      <Heading h="2" id="progress-screenreader-label">
        Screenreader only label
      </Heading>
      <p>
        Add a <code>srOnly</code> prop to hide the label visually.
      </p>
      <ReactPlayground codeText={ProgressBarScreenreaderLabel} />

      <Heading h="2" id="progress-contextual">
        Contextual alternatives
      </Heading>
      <p>
        Progress bars use some of the same button and alert classes for
        consistent styles.
      </p>
      <ReactPlayground codeText={ProgressBarContextual} />

      <Heading h="2" id="progress-striped">
        Striped
      </Heading>
      <p>Uses a gradient to create a striped effect. Not available in IE8.</p>
      <ReactPlayground codeText={ProgressBarStriped} />

      <Heading h="2" id="progress-animated">
        Animated
      </Heading>
      <p>
        Add <code>active</code> prop to animate the stripes right to left. Not
        available in IE9 and below.
      </p>
      <ReactPlayground codeText={ProgressBarAnimated} />

      <Heading h="2" id="progress-stacked">
        Stacked
      </Heading>
      <p>
        Nest <code>{'<ProgressBar />'}</code>s to stack them.
      </p>
      <ReactPlayground codeText={ProgressBarStacked} />
      <Heading h="2" id="progess-api">
        API
      </Heading>
      <ComponentApi metadata={data.ProgressBar} />
    </>
  );
});

export const query = graphql`
  query ProgressBarQuery {
    ProgressBar: componentMetadata(displayName: { eq: "ProgressBar" }) {
      ...ComponentApi_metadata
    }
  }
`;
