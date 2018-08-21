import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import Callout from '../../components/Callout';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import Collapse from '../../examples/Collapse';
import Fade from '../../examples/Fade';
import withLayout from '../../withLayout';

export default withLayout(function TransitionSection({ data }) {
  return (
    <>
      <Heading h="1" id="transitions">
        Transitions
      </Heading>

      <p>
        Transition components animate their children transitioning in and out.
      </p>

      <Heading h="2" id="transitions-collapse">
        Collapse
      </Heading>

      <p>Add a collapse toggle animation to an element or component.</p>
      <Callout title="Smooth animations">
        If you're noticing choppy animations, and the component that's being
        collapsed has non-zero margin or padding, try wrapping the contents of
        your <code>{'<Collapse>'}</code> inside a node with no margin or
        padding, like the <code>{'<div>'}</code> in the example below. This will
        allow the height to be computed properly, so the animation can proceed
        smoothly.
      </Callout>
      <ReactPlayground codeText={Collapse} />

      <Heading h="2" id="transitions-fade">
        Fade
      </Heading>

      <p>Add a fade animation to a child element or component.</p>
      <ReactPlayground codeText={Fade} />

      <Heading h="2" id="transitions-fade-api">
        API
      </Heading>
      <ComponentApi metadata={data.Collapse} />
      <ComponentApi metadata={data.Fade} />
    </>
  );
});

export const query = graphql`
  query TransitionQuery {
    Fade: componentMetadata(displayName: { eq: "Fade" }) {
      ...ComponentApi_metadata
    }
    Collapse: componentMetadata(displayName: { eq: "Collapse" }) {
      ...ComponentApi_metadata
    }
  }
`;
