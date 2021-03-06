import { graphql } from 'gatsby';

import LinkedHeading from '../../components/LinkedHeading';
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
      <LinkedHeading h="1" id="progress">
        Progress bars
      </LinkedHeading>

      <p className="lead">
        Provide up-to-date feedback on the progress of a workflow or action with
        simple yet flexible progress bars.
      </p>

      <LinkedHeading h="2" id="progress-basic">
        Example
      </LinkedHeading>
      <p>Default progress bar.</p>
      <ReactPlayground codeText={ProgressBarBasic} />

      <LinkedHeading h="2" id="progress-label">
        With label
      </LinkedHeading>
      <p>
        Add a <code>label</code> prop to show a visible percentage. For low
        percentages, consider adding a min-width to ensure the label's text is
        fully visible.
      </p>
      <ReactPlayground codeText={ProgressBarWithLabel} />

      <LinkedHeading h="2" id="progress-screenreader-label">
        Screenreader only label
      </LinkedHeading>
      <p>
        Add a <code>visuallyHidden</code> prop to hide the label visually.
      </p>
      <ReactPlayground codeText={ProgressBarScreenreaderLabel} />

      <LinkedHeading h="2" id="progress-contextual">
        Contextual alternatives
      </LinkedHeading>
      <p>
        Progress bars use some of the same button and alert classes for
        consistent styles.
      </p>
      <ReactPlayground codeText={ProgressBarContextual} />

      <LinkedHeading h="2" id="progress-striped">
        Striped
      </LinkedHeading>
      <p>Uses a gradient to create a striped effect. Not available in IE8.</p>
      <ReactPlayground codeText={ProgressBarStriped} />

      <LinkedHeading h="2" id="progress-animated">
        Animated
      </LinkedHeading>
      <p>
        Add <code>animated</code> prop to animate the stripes right to left. Not
        available in IE9 and below.
      </p>
      <ReactPlayground codeText={ProgressBarAnimated} />

      <LinkedHeading h="2" id="progress-stacked">
        Stacked
      </LinkedHeading>
      <p>
        Nest <code>{'<ProgressBar />'}</code>s to stack them.
      </p>
      <ReactPlayground codeText={ProgressBarStacked} />
      <LinkedHeading h="2" id="progess-api">
        API
      </LinkedHeading>
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
