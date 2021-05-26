import { graphql } from 'gatsby';

import ComponentApi from '../../components/ComponentApi';
import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';
import Basic from '../../examples/InputGroup/Basic';
import ButtonDropdowns from '../../examples/InputGroup/ButtonDropdowns';
import Buttons from '../../examples/InputGroup/Buttons';
import Checkboxes from '../../examples/InputGroup/Checkboxes';
import MultipleAddons from '../../examples/InputGroup/MultipleAddons';
import MultipleInputs from '../../examples/InputGroup/MultipleInputs';
import SegmentedButtonDropdowns from '../../examples/InputGroup/SegmentedButtonDropdowns';
import Sizes from '../../examples/InputGroup/Sizes';
import withLayout from '../../withLayout';

export default withLayout(function InputGroupSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="input-group">
        InputGroup
      </LinkedHeading>
      <p>
        Place one add-on or button on either side of an input. You may also
        place one on both sides of an input. Remember to place{' '}
        <code>{`<label>`}</code>s outside the input group.
      </p>
      <ReactPlayground codeText={Basic} />
      <LinkedHeading h="2" id="input-group-sizes">
        Sizing
      </LinkedHeading>
      <p>
        Add the relative form sizing classes to the <code>InputGroup</code> and
        contents within will automatically resize—no need for repeating the form
        control size classes on each element.
      </p>
      <ReactPlayground codeText={Sizes} />
      <LinkedHeading h="2" id="input-group-checkboxes">
        Checkboxes and radios
      </LinkedHeading>
      <p>
        Use the <code>InputGroup.Radio</code> or{' '}
        <code>InputGroup.Checkbox</code> to add options to an input group.
      </p>
      <ReactPlayground codeText={Checkboxes} />

      <LinkedHeading h="2" id="input-group-multiple-inputs">
        Multiple inputs
      </LinkedHeading>
      <p>
        While multiple inputs are supported visually, validation styles are only
        available for input groups with a single input.
      </p>
      <ReactPlayground codeText={MultipleInputs} />
      <LinkedHeading h="2" id="input-group-multiple-addons">
        Multiple addons
      </LinkedHeading>
      <p>
        Multiple add-ons are supported and can be mixed with checkbox and radio
        input versions.
      </p>
      <ReactPlayground codeText={MultipleAddons} />

      <LinkedHeading h="2" id="input-group-buttons">
        Button addons
      </LinkedHeading>
      <ReactPlayground codeText={Buttons} />
      <LinkedHeading h="2" id="input-group-buttons">
        Buttons with Dropdowns
      </LinkedHeading>
      <ReactPlayground codeText={ButtonDropdowns} />

      <LinkedHeading h="2" id="input-group-segmented-buttons">
        Segmented buttons
      </LinkedHeading>
      <ReactPlayground codeText={SegmentedButtonDropdowns} />

      <LinkedHeading h="2" id="input-group-api">
        API
      </LinkedHeading>
      <ComponentApi metadata={data.InputGroup} />
    </>
  );
});

export const query = graphql`
  query InputGroupQuery {
    InputGroup: componentMetadata(displayName: { eq: "InputGroup" }) {
      ...ComponentApi_metadata
    }
  }
`;
