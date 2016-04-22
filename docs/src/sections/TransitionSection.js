import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function TransitionSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="transitions">Transitions</Anchor> <small>Collapse, Fade</small>
      </h2>

      <p>Transition components animate their children transitioning in and out.</p>

      <h3>
        <Anchor id="transitions-collapse">Collapse</Anchor>
      </h3>

      <p>Add a collapse toggle animation to an element or component.</p>
      <div className="bs-callout bs-callout-info">
        <h4>Smoothing animations</h4>
        <p>
          If you're noticing choppy animations,
          and the component that's being collapsed
          has non-zero margin or padding,
          try wrapping the contents
          of your <code>&lt;Collapse&gt;</code>
          {" "}inside a node with no margin or padding,
          like the <code>&lt;div&gt;</code> in the example below.
          This will allow the height to be computed properly,
          so the animation can proceed smoothly.
        </p>
      </div>
      <ReactPlayground codeText={Samples.Collapse} />

      <h4><Anchor id="transitions-collapse-props">Props</Anchor></h4>
      <PropTable component="Collapse"/>

      <h3>
        <Anchor id="transitions-fade">Fade</Anchor>
      </h3>

      <p>Add a fade animation to a child element or component.</p>
      <ReactPlayground codeText={Samples.Fade} />

      <h4><Anchor id="transitions-fade-props">Props</Anchor></h4>
      <PropTable component="Fade"/>
    </div>
  );
}
