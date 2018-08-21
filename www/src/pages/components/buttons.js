import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import ButtonActive from '../../examples/Button/Active';
import ButtonBlock from '../../examples/Button/Block';
import ButtonDisabled from '../../examples/Button/Disabled';
import ButtonLoading from '../../examples/Button/Loading';
import ButtonOutlineTypes from '../../examples/Button/OutlineTypes';
import ButtonSizes from '../../examples/Button/Sizes';
import ButtonTagTypes from '../../examples/Button/TagTypes';
import ToggleButton from '../../examples/Button/ToggleButton';
import ToggleButtonGroupControlled from '../../examples/Button/ToggleButtonGroupControlled';
import ToggleButtonGroupUncontrolled from '../../examples/Button/ToggleButtonGroupUncontrolled';
import ButtonTypes from '../../examples/Button/Types';
import withLayout from '../../withLayout';

export default withLayout(function ButtonSection({ data }) {
  return (
    <>
      <Heading h="1" id="buttons">
        Buttons
      </Heading>
      <p className="lead">
        Custom button styles for actions in forms, dialogs, and more with
        support for multiple sizes, states, and more.
      </p>
      <Heading h="2" id="buttons-examples">
        Examples
      </Heading>
      <p>
        Use any of the available button style types to quickly create a styled
        button. Just modify the <code>variant</code> prop.
      </p>
      <ReactPlayground codeText={ButtonTypes} />
      <Heading h="3" id="buttons-outline-btns">
        Outline buttons
      </Heading>
      <p>
        For a lighter touch, Buttons also come in <code>outline-*</code>{' '}
        variants with no background color.
      </p>
      <ReactPlayground codeText={ButtonOutlineTypes} />
      <Heading h="2" id="buttons-tags">
        Button tags
      </Heading>
      <p>
        Normally <code>{'<Button>'}</code> components will render a HTML{' '}
        <code>{'<button>'}</code> element. However you can render whatever you'd
        like, adding a <code>href</code> prop will automatically render an{' '}
        <code>{'<a />'}</code> element. You can use the <code>as</code> prop to
        render whatever your heart desires. React Bootstrap will take care of
        the proper ARIA roles for you.
      </p>
      <ReactPlayground codeText={ButtonTagTypes} />
      <Heading h="2" id="buttons-sizes">
        Sizes
      </Heading>
      <p>
        Fancy larger or smaller buttons? Add <code>size="large"</code>,{' '}
        <code>size="small"</code> for additional sizes.
      </p>
      <ReactPlayground codeText={ButtonSizes} />
      <p>
        Create block level buttons—those that span the full width of a parent—by
        adding <code>block</code>
      </p>
      <ReactPlayground codeText={ButtonBlock} />
      <Heading h="2" id="buttons-active">
        Active state
      </Heading>
      <p>
        To set a buttons active state simply set the components{' '}
        <code>active</code> prop.
      </p>
      <ReactPlayground codeText={ButtonActive} />
      <Heading h="2" id="buttons-disabled">
        Disabled state
      </Heading>
      <p>
        Make buttons look inactive by adding the <code>disabled</code> prop to.
      </p>
      <ReactPlayground codeText={ButtonDisabled} />
      <p>
        Watch out! <code>{'<a>'}</code> element's don't naturally support a
        disabled attribute. In browsers that support it this is handled with a{' '}
        <code>point-events: none</code> style but not all browsers support it
        yet.
      </p>
      <p>
        React Bootstrap will prevent any <code>onClick</code> handlers from
        firing regardless of the rendered element.
      </p>
      <Heading h="2" id="buttons-loading">
        Button loading state
      </Heading>
      <p>
        When activating an asynchronous action from a button it is a good UX
        pattern to give the user feedback as to the loading state, this can
        easily be done by updating your <code>{'<Button />'}</code>&#8217;s
        props from a state change like below.
      </p>
      <ReactPlayground codeText={ButtonLoading} />
      <Heading h="2" id="buttons-checkbox-radio">
        Checkbox / Radio
      </Heading>
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
      <Heading h="2" id="buttons-props">
        API
      </Heading>
      <ComponentApi metadata={data.Button} />
      <ComponentApi metadata={data.ToggleButton} />
    </>
  );
});

export const query = graphql`
  query ButtonQuery {
    Button: componentMetadata(displayName: { eq: "Button" }) {
      displayName
      ...ComponentApi_metadata
    }
    ToggleButtonGroup: componentMetadata(
      displayName: { eq: "ToggleButtonGroup" }
    ) {
      displayName
      ...ComponentApi_metadata
    }
    ToggleButton: componentMetadata(displayName: { eq: "ToggleButton" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`;
