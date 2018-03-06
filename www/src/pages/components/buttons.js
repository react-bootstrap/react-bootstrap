import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import ButtonTypes from '../../examples/Button/Types';
import ButtonOutlineTypes from '../../examples/Button/OutlineTypes';
import ButtonBlock from '../../examples/Button/Block';
import ButtonSizes from '../../examples/Button/Sizes';
import ButtonActive from '../../examples/Button/Active';
import ButtonTagTypes from '../../examples/Button/TagTypes';
import ButtonDisabled from '../../examples/Button/Disabled';
import ButtonLoading from '../../examples/Button/Loading';
import ToggleButton from '../../examples/Button/ToggleButton';
import ToggleButtonGroupControlled from '../../examples/Button/ToggleButtonGroupControlled';
import ToggleButtonGroupUncontrolled from '../../examples/Button/ToggleButtonGroupUncontrolled';

export default function ButtonSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h1 className="page-header">
        <Anchor id="buttons">Buttons</Anchor>
      </h1>
      <h3>
        <Anchor id="buttons-options">Options</Anchor>
      </h3>
      <p>
        Use any of the available button style types to quickly create a styled
        button. Just modify the <code>bsStyle</code> prop.
      </p>
      <ReactPlayground codeText={ButtonTypes} />
      <h3>
        <Anchor id="buttons-outline-btns">Outline buttons</Anchor>
      </h3>
      <p>
        For a lighter touch, Buttons also come in `outline` variants, with no
        background color.
      </p>
      <ReactPlayground codeText={ButtonOutlineTypes} />
      <h3>
        <Anchor id="buttons-tags">Button tags</Anchor>
      </h3>
      <p>
        Generally <code>{'<Button>'}</code>s will render a HTML{' '}
        <code>{'<button>'}</code> tag. However you can render whatever you'd
        like, adding a <code>href</code> prop will automatically render an{' '}
        <code>{'<a />'}</code> tag otherwise you can specify{' '}
        <code>componentClass</code> to render something else (like an{' '}
        <code>input</code> tag). React Bootstrap will take care of the proper
        ARIA roles for you.
      </p>
      <ReactPlayground codeText={ButtonTagTypes} />
      <h3>
        <Anchor id="buttons-sizes">Sizes</Anchor>
      </h3>
      <p>
        Fancy larger or smaller buttons? Add <code>bsSize="large"</code>,{' '}
        <code>bsSize="small"</code> for additional sizes.
      </p>
      <ReactPlayground codeText={ButtonSizes} />
      <p>
        Create block level buttons—those that span the full width of a parent—by
        adding <code>block</code>
      </p>
      <ReactPlayground codeText={ButtonBlock} />
      <h3>
        <Anchor id="buttons-active">Active state</Anchor>
      </h3>
      <p>
        To set a buttons active state simply set the components{' '}
        <code>active</code> prop.
      </p>
      <ReactPlayground codeText={ButtonActive} />
      <h3>
        <Anchor id="buttons-disabled">Disabled state</Anchor>
      </h3>
      <p>
        Make buttons look inactive by adding the <code>disabled</code> prop to.
      </p>
      <ReactPlayground codeText={ButtonDisabled} />
      <p>
        Watch out! <code>{'<a>'}</code> element's don't naturally support a
        disabled attribute. In browsers that support it this is handled with a{' '}
        <code>{'point-events: none'}</code> style but not all browsers support
        it yet.
      </p>
      <p>
        React Bootstrap will prevent any <code>onClick</code> handlers from
        firing regardless of the rendered element.
      </p>
      <h3>
        <Anchor id="buttons-loading">Button loading state</Anchor>
      </h3>
      <p>
        When activating an asynchronous action from a button it is a good UX
        pattern to give the user feedback as to the loading state, this can
        easily be done by updating your <code>{'<Button />'}</code>&#8217;s
        props from a state change like below.
      </p>
      <ReactPlayground codeText={ButtonLoading} />
      <h3>
        <Anchor id="buttons-checkbox-radio">Checkbox / Radio</Anchor>
      </h3>
      <p>
        Button's can also be used to style <code>checkbox</code> and{' '}
        <code>radio</code> form elements. This is helpful when you want a toggle
        button that works neatly inside an HTML form.
      </p>
      <ReactPlayground codeText={ToggleButton} />
      <p>
        The above handles styling, But requires manually controlling the{' '}
        <code>checked</code> state for each radio or checkbox in the group.
      </p>
      <p>
        For a nicer experience with checked state management use the{' '}
        <code>{'<ToggleButtonGroup>'}</code> instead of a{' '}
        <code>{'<ButtonGroup toggle>'}</code> component. The group behaves as a
        form component, where the <code>value</code> is an array of the selected{' '}
        <code>value</code>s for a named checkbox group or the single toggled{' '}
        <code>value</code> in a similarly named radio group.
      </p>
      <h4>Uncontrolled</h4>
      <ReactPlayground codeText={ToggleButtonGroupUncontrolled} />
      <h4>Controlled</h4>
      <ReactPlayground codeText={ToggleButtonGroupControlled} />
      <h2>
        <Anchor id="buttons-props">Props</Anchor>
      </h2>
      <h3>
        <Anchor id="buttons-button-props">Button</Anchor>
        <LinkToSource component={data.Button.displayName} />
      </h3>
      <PropTable metadata={data.Button} />
      <h3>
        <Anchor id="buttons-button-props">ToggleButton</Anchor>
        <LinkToSource component={data.ToggleButton.displayName} />
      </h3>
      <PropTable metadata={data.ToggleButton} />
    </div>
  );
}

export const query = graphql`
  query ButtonQuery {
    Button: componentMetadata(displayName: { eq: "Button" }) {
      displayName
      ...PropTable_metadata
    }
    ToggleButtonGroup: componentMetadata(
      displayName: { eq: "ToggleButtonGroup" }
    ) {
      displayName
      ...PropTable_metadata
    }
    ToggleButton: componentMetadata(displayName: { eq: "ToggleButton" }) {
      displayName
      ...PropTable_metadata
    }
  }
`;
