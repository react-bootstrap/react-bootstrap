import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
// import Samples from '../Samples';

import ButtonTypes from '!!raw-loader!../../examples/ButtonTypes';
import ButtonSizes from '!!raw-loader!../../examples/ButtonSizes';
import ButtonBlock from '!!raw-loader!../../examples/ButtonBlock';
import ButtonActive from '!!raw-loader!../../examples/ButtonActive';
import ButtonTagTypes from '!!raw-loader!../../examples/ButtonTagTypes';
import ButtonDisabled from '!!raw-loader!../../examples/ButtonDisabled';
import ButtonLoading from '!!raw-loader!../../examples/ButtonLoading';


export default function ButtonSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h1 className="page-header">
        <Anchor id="buttons">Buttons</Anchor> <small>Button</small>
      </h1>

      <h3><Anchor id="buttons-options">Options</Anchor></h3>
      <p>Use any of the available button style types to quickly create a styled button. Just modify the <code>bsStyle</code> prop.</p>
      <ReactPlayground codeText={ButtonTypes} />

        <div className="bs-callout bs-callout-warning">
        <h4>Button spacing</h4>
        <p>Because React doesn't output newlines between elements, buttons on the same line are displayed
        flush against each other. To preserve the spacing between multiple inline buttons, wrap your
        button group in <code>{"<ButtonToolbar />"}</code>.</p>
      </div>

      <h3><Anchor id="buttons-sizes">Sizes</Anchor></h3>
      <p>Fancy larger or smaller buttons? Add <code>bsSize="large"</code>, <code>bsSize="small"</code>, or <code>bsSize="xsmall"</code> for additional sizes.</p>
      <ReactPlayground codeText={ButtonSizes} />

      <p>Create block level buttons—those that span the full width of a parent— by adding the <code>block</code> prop.</p>
      <ReactPlayground codeText={ButtonBlock} />

      <h3><Anchor id="buttons-active">Active state</Anchor></h3>
      <p>To set a buttons active state simply set the components <code>active</code> prop.</p>
      <ReactPlayground codeText={ButtonActive} />

      <h3><Anchor id="buttons-tags">Button tags</Anchor></h3>
      <p>The DOM element tag is choosen automatically for you based on the props you supply. Passing
        a <code>href</code> will result in the button using a <code>{"<a />"}</code> element otherwise
        a <code>{"<button />"}</code> element will be used.
      </p>
      <ReactPlayground codeText={ButtonTagTypes} />

      <h3><Anchor id="buttons-disabled">Disabled state</Anchor></h3>
      <p>Make buttons look unclickable by fading them back 50%. To do this add the <code>disabled</code> attribute to buttons.</p>
      <ReactPlayground codeText={ButtonDisabled} />

      <div className="bs-callout bs-callout-warning">
        <h4>Cross-Browser compatibility</h4>
        <p>
          Because <code>{"<Button />"}</code> will render an <code>{'<a>'}</code> tag in certain situations.
          Since anchor tags can't be <code>disabled</code>, the behavior is emulated as best it can be.
          Specifically, <code>pointer-events: none;</code> style is added to the anchor to prevent focusing, which
          is only supported in newer browser versions.
        </p>
      </div>

      <h3><Anchor id="buttons-loading">Button loading state</Anchor></h3>
      <p>When activating an asynchronous action from a button it is a good UX pattern to give the user
        feedback as to the loading state, this can easily be done by updating
        your <code>{"<Button />"}</code>&#8217;s props from a state change like below.</p>
      <ReactPlayground codeText={ButtonLoading} />

      <h3><Anchor id="buttons-props">Props</Anchor></h3>

      <PropTable metadata={data.metadata} />
    </div>
  );
}


export const query = graphql`
  query ButtonQuery {
    metadata: componentMetadata(displayName: { eq: "Button" }) {
      ...PropTable_metadata
    }
  }
`;
