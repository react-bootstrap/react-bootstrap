import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import Fade from '../../examples/Fade';
import Collapse from '../../examples/Collapse';

export default function TransitionSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="transitions">Transitions</Anchor>{' '}
        <small>Collapse, Fade</small>
      </h2>

      <p>
        Transition components animate their children transitioning in and out.
      </p>

      <h3>
        <Anchor id="transitions-collapse">Collapse</Anchor>
      </h3>

      <p>Add a collapse toggle animation to an element or component.</p>
      <div className="bs-callout bs-callout-info">
        <h4>Smoothing animations</h4>
        <p>
          If you're noticing choppy animations, and the component that's being
          collapsed has non-zero margin or padding, try wrapping the contents of
          your <code>&lt;Collapse&gt;</code> inside a node with no margin or
          padding, like the <code>&lt;div&gt;</code> in the example below. This
          will allow the height to be computed properly, so the animation can
          proceed smoothly.
        </p>
      </div>
      <ReactPlayground codeText={Collapse} />

      <h4>
        <Anchor id="transitions-collapse-props">Props</Anchor>
      </h4>
      <PropTable metadata={data.Collapse} />

      <h3>
        <Anchor id="transitions-fade">Fade</Anchor>
      </h3>

      <p>Add a fade animation to a child element or component.</p>
      <ReactPlayground codeText={Fade} />

      <h4>
        <Anchor id="transitions-fade-props">Props</Anchor>
      </h4>
      <PropTable metadata={data.Fade} />
    </div>
  );
}

export const query = graphql`
  query TransitionQuery {
    Fade: componentMetadata(displayName: { eq: "Fade" }) {
      ...PropTable_metadata
    }
    Collapse: componentMetadata(displayName: { eq: "Collapse" }) {
      ...PropTable_metadata
    }
  }
`;
