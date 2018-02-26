import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import InputGroupBasic from '../../examples/InputGroup/Basic';
import InputGroupButtons from '../../examples/InputGroup/Buttons';
import InputGroupButtonDropdowns from '../../examples/InputGroup/ButtonDropdowns';
import InputGroupCheckboxes from '../../examples/InputGroup/Checkboxes';
import InputGroupSizes from '../../examples/InputGroup/Sizes';
import InputGroupMultipleAddons from '../../examples/InputGroup/MultipleAddons';
import InputGroupMultipleInputs from '../../examples/InputGroup/MultipleInputs';

export default function FormControlsSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="input-groups">Input groups</Anchor>
        <small>
          InputGroupPrepend, InputGroupAppend, InputGroupText,
          InputGroupCheckbox, InputGroupRadio
        </small>
      </h2>
      <p>
        Place one add-on or button on either side of an input. You may also
        place one on both sides of an input. We do not support multiple
        form-controls in a single input group and {'<label>'}s must come outside
        the input group.
      </p>
      <ReactPlayground codeText={InputGroupBasic} />
      <h3>
        <Anchor id="input-sizes">Input sizes</Anchor>
      </h3>
      <p>
        Use <code>bsSize</code> on <code>{'<InputGroup>'}</code> to change the
        size of inputs. It also works with add-ons and most other options.
      </p>
      <ReactPlayground codeText={InputGroupSizes} />

      <h3>
        <Anchor id="input-sizes">Checkboxes and radios</Anchor>
      </h3>
      <p>
        Place any checkbox or radio option within an input group’s addon instead
        of text.
      </p>
      <ReactPlayground codeText={InputGroupCheckboxes} />

      <h3>
        <Anchor id="input-sizes">Multiple inputs</Anchor>
      </h3>
      <p>
        While multiple <code>{'FormControl'}</code>s are supported visually,
        validation styles are only available for input groups with a single{' '}
        <code>{'FormControl'}</code>.
      </p>
      <ReactPlayground codeText={InputGroupMultipleInputs} />

      <h3>
        <Anchor id="input-sizes">Multiple addons</Anchor>
      </h3>
      <p>
        Multiple add-ons are supported and can be mixed with checkbox and radio
        input versions.
      </p>
      <ReactPlayground codeText={InputGroupMultipleAddons} />

      <h3>
        <Anchor id="input-sizes">Button addons</Anchor>
      </h3>
      <ReactPlayground codeText={InputGroupButtons} />

      <h3>
        <Anchor id="input-sizes">Button dropdowns</Anchor>
      </h3>
      <ReactPlayground codeText={InputGroupButtonDropdowns} />

      <h3>
        <Anchor id="input-groups-props">Props</Anchor>
      </h3>
      <h4>
        <Anchor id="props-input-group">InputGroup</Anchor>
      </h4>
      <p>
        <em>
          All sub-components will pass through all props to their root element
        </em>
      </p>
      <PropTable metadata={data.InputGroup} />
    </div>
  );
}

export const query = graphql`
  query InputGroupQuery {
    InputGroup: componentMetadata(displayName: { eq: "InputGroup" }) {
      ...PropTable_metadata
    }
  }
`;
