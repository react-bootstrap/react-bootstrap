import { graphql } from 'gatsby';
import React from 'react';
import { css } from 'astroturf';

import LinkedHeading from '../../components/LinkedHeading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';

import Disabled from '../../examples/Overlays/Disabled';
import Overlay from '../../examples/Overlays/Overlay';
import OverlayTrigger from '../../examples/Overlays/OverlayTrigger';
import PopoverBasic from '../../examples/Overlays/PopoverBasic';
import PopoverContained from '../../examples/Overlays/PopoverContained';
import PopoverPositioned from '../../examples/Overlays/PopoverPositioned';
import ScheduleUpdate from '../../examples/Overlays/ScheduleUpdate';
import TooltipInCopy from '../../examples/Overlays/TooltipInCopy';
import TooltipOverlay from '../../examples/Overlays/TooltipOverlay';
import TooltipPositioned from '../../examples/Overlays/TooltipPositioned';

import withLayout from '../../withLayout';

const styles = css`
  .contained {
    height: 200px;
    & > div {
      position: relative;
    }
  }
`;

export default withLayout(function TooltipSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="overlays">
        Overlays
      </LinkedHeading>
      <p className="lead">
        A set of components for positioning beautiful overlays, tooltips,
        popovers, and anything else you need.
      </p>

      <LinkedHeading h="2" id="overlays-overview">
        Overview
      </LinkedHeading>

      <p>Things to know about the React-Boostrap Overlay components.</p>
      <ul>
        <li>
          Overlays rely on the third-party library{' '}
          <a href="https://popper.js.org/">Popper.js</a>. It's included
          automatically with React-Bootstrap, but you should reference the API
          for more advanced use cases.
        </li>
        <li>
          The <code>{'<Tooltip>'}</code> and <code>{'<Popover>'}</code>{' '}
          components do not position themselves. Instead the{' '}
          <code>{'<Overlay>'}</code> (or <code>{'<OverlayTrigger>'}</code>)
          components, inject <code>ref</code> and <code>style</code> props.
        </li>
        <li>
          Tooltip expects specific props injected by the{' '}
          <code>{'<Overlay>'}</code> component
        </li>
        <li>
          Tooltips for <code>disabled</code> elements must be triggered on a
          wrapper element.
        </li>
      </ul>

      <LinkedHeading h="2" id="overlays">
        Overlay
      </LinkedHeading>
      <p>
        <code>Overlay</code> is the fundamental component for positioning and
        controlling tooltip visibility. It's a wrapper around Popper.js, that
        adds support for transitions, and visibility toggling.
      </p>

      <LinkedHeading h="3" id="creating-an-overlay">
        Creating an Overlay
      </LinkedHeading>
      <p>
        Overlays consist of at least two elements, the "overlay", the element to
        be positioned, as well as a "target", the element the overlay is
        positioned in relation to. You can also also have an "arrow" element,
        like the tooltips and popovers, but that is optional. Be sure to{' '}
        <strong>
          check out the <a href="https://popper.js.org/docs/v2/">Popper</a>{' '}
          documentation for more details about the injected props.
        </strong>
      </p>
      <ReactPlayground codeText={Overlay} />

      <LinkedHeading h="3" id="overlay-trigger">
        OverlayTrigger
      </LinkedHeading>
      <p>
        Since the above pattern is pretty common, but verbose, we've included{' '}
        <code>{'<OverlayTrigger>'}</code> component to help with common
        use-cases. It even has functionality to delayed show or hides, and a few
        different "trigger" events you can mix and match.
      </p>
      <p>
        Note that triggering components{' '}
        <strong>
          must be able to accept{' '}
          <a href="https://reactjs.org/docs/refs-and-the-dom.html">a ref</a>
        </strong>{' '}
        since <code>{'<OverlayTrigger>'}</code> will attempt to add one. You can
        use{' '}
        <a href="https://reactjs.org/docs/react-api.html#reactforwardref">
          forwardRef()
        </a>{' '}
        for function components.
      </p>

      <ReactPlayground codeText={OverlayTrigger} />

      <LinkedHeading h="2" id="tooltips">
        Tooltips
      </LinkedHeading>
      <p className="lead">
        A tooltip component for a more stylish alternative to that anchor tag{' '}
        <code>title</code> attribute.
      </p>

      <LinkedHeading h="3" id="tooltip-examples">
        Examples
      </LinkedHeading>

      <p>Hover over the links below to see tooltips.</p>
      <ReactPlayground codeText={TooltipInCopy} showCode={false} />

      <p>
        You can pass the <code>Overlay</code> injected props directly to the
        Tooltip component.
      </p>
      <ReactPlayground codeText={TooltipOverlay} />

      <p>
        Or pass a Tooltip element to <code>OverlayTrigger</code> instead.
      </p>
      <ReactPlayground codeText={TooltipPositioned} />

      <LinkedHeading h="2" id="popovers">
        Popovers
      </LinkedHeading>
      <p className="lead">A popover component, like those found in iOS.</p>

      <LinkedHeading h="3" id="popover-examples">
        Examples
      </LinkedHeading>

      <ReactPlayground codeText={PopoverBasic} />
      <p>
        As with <code>{'<Tooltip>'}</code>s, you can control the placement of
        the Popover.
      </p>
      <ReactPlayground codeText={PopoverPositioned} />

      <LinkedHeading h="2" id="overlays-disabled">
        Disabled elements
      </LinkedHeading>
      <p>
        Elements with the <code>disabled</code> attribute aren’t interactive,
        meaning users cannot hover or click them to trigger a popover (or
        tooltip). As a workaround, you’ll want to trigger the overlay from a
        wrapper <code>{'<div>'}</code> or <code>{'<span>'}</code> and override
        the <code>pointer-events</code> on the disabled element.
      </p>
      <ReactPlayground codeText={Disabled} />

      <LinkedHeading h="2" id="overlays-container">
        Changing containers
      </LinkedHeading>
      <p>
        You can specify a <code>container</code> to control the DOM element the
        overlay is appended to. This is especially useful when styles conflict
        with your Overlay's.
      </p>
      <ReactPlayground
        codeText={PopoverContained}
        exampleClassName={styles.contained}
      />

      <LinkedHeading h="2" id="overlays-dynamic-updates">
        Updating position dynamically
      </LinkedHeading>
      <p>
        Since we can't know every time your overlay changes size, to reposition
        it, you need to take manual action if you want to update the position of
        an Overlay in response to a change.
      </p>
      <p>
        For this, the Overlay component also injects a{' '}
        <code>scheduleUpdate()</code> method that an overlay component can use
        to reposition itself.
      </p>
      <ReactPlayground codeText={ScheduleUpdate} />

      <LinkedHeading h="2" id="overlays-api">
        API
      </LinkedHeading>

      <ComponentApi metadata={data.Overlay} />
      <ComponentApi metadata={data.OverlayTrigger} />
      <ComponentApi metadata={data.Tooltip} />
      <ComponentApi metadata={data.Popover} />
      <ComponentApi metadata={data.PopoverContent} />
      <ComponentApi metadata={data.PopoverTitle} />
    </>
  );
});

export const query = graphql`
  query OverlayQuery {
    Tooltip: componentMetadata(displayName: { eq: "Tooltip" }) {
      ...ComponentApi_metadata
    }
    Popover: componentMetadata(displayName: { eq: "Popover" }) {
      ...ComponentApi_metadata
    }
    PopoverContent: componentMetadata(displayName: { eq: "PopoverContent" }) {
      ...ComponentApi_metadata
    }
    PopoverTitle: componentMetadata(displayName: { eq: "PopoverTitle" }) {
      ...ComponentApi_metadata
    }
    Overlay: componentMetadata(displayName: { eq: "Overlay" }) {
      ...ComponentApi_metadata
    }
    OverlayTrigger: componentMetadata(displayName: { eq: "OverlayTrigger" }) {
      ...ComponentApi_metadata
    }
  }
`;
