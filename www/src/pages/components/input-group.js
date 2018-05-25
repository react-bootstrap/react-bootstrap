import React from 'react';

import ComponentApi from '../../components/ComponentApi';
import Heading from '../../components/Heading';
import ReactPlayground from '../../components/ReactPlayground';
import Basic from '../../examples/InputGroup/Basic';
import ButtonDropdowns from '../../examples/InputGroup/ButtonDropdowns';
import Buttons from '../../examples/InputGroup/Buttons';
import Checkboxes from '../../examples/InputGroup/Checkboxes';
import MultipleAddons from '../../examples/InputGroup/MultipleAddons';
import MultipleInputs from '../../examples/InputGroup/MultipleInputs';
import Sizes from '../../examples/InputGroup/Sizes';
import withLayout from '../../withLayout';

export default withLayout(function InputGroupSection({ data }) {
  return (
    <div className="bs-docs-section">
      <Heading h="1" id="input-group">
        InputGroup
      </Heading>
      <p>
        Place one add-on or button on either side of an input. You may also
        place one on both sides of an input. Remember to place{' '}
        <code>{`<label>`}</code>s outside the input group.
      </p>
      <ReactPlayground codeText={Basic} />
      <Heading h="2" id="input-group-sizes">
        Sizing
      </Heading>
      <p>
        Add the relative form sizing classes to the <code>InputGroup</code> and
        contents within will automatically resize—no need for repeating the form
        control size classes on each element.
      </p>
      <ReactPlayground codeText={Sizes} />
      <Heading h="2" id="input-group-checkboxes">
        Checkboxes and radios
      </Heading>
      <p>
        Use the <code>InputGroup.Radio</code> or{' '}
        <code>InputGroup.Checkbox</code> to add options to an input group.
      </p>
      <ReactPlayground codeText={Checkboxes} />

      <Heading h="2" id="input-group-multiple-inputs">
        Multiple inputs
      </Heading>
      <p>
        While multiple inputss are supported visually, validation styles are
        only available for input groups with a single input.
      </p>
      <ReactPlayground codeText={MultipleInputs} />
      <Heading h="2" id="input-group-multiple-addons">
        Multiple addons
      </Heading>
      <p>Multiple add-ons are supported and can be mixed</p>
      <ReactPlayground codeText={MultipleAddons} />

      <Heading h="2" id="input-group-buttons">
        Button addons
      </Heading>
      <ReactPlayground codeText={Buttons} />
      <Heading h="2" id="input-group-buttons">
        Buttons with Dropdowns
      </Heading>
      <ReactPlayground codeText={ButtonDropdowns} />

      <Heading h="2" id="input-group-props">
        Props
      </Heading>
      <ComponentApi metadata={data.InputGroup} />
    </div>
  );
});

export const query = graphql`
  query InputGroupQuery {
    InputGroup: componentMetadata(displayName: { eq: "InputGroup" }) {
      ...ComponentApi_metadata
    }
  }
`;
