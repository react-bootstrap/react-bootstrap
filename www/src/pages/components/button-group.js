import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import ButtonGroupBasic from '../../examples/ButtonGroup/Basic';
import ButtonGroupNested from '../../examples/ButtonGroup/Nested';
import ButtonGroupSizes from '../../examples/ButtonGroup/Sizes';
import ButtonToolbar from '../../examples/ButtonGroup/Toolbar';
import ButtonToolbarBasic from '../../examples/ButtonGroup/ToolbarBasic';
import ButtonGroupVertical from '../../examples/ButtonGroup/Vertical';
import withLayout from '../../withLayout';

export default withLayout(function ButtonGroupSection({ data }) {
  return (
    <>
      <Heading h="1" id="btn-groups">
        Button groups
      </Heading>
      <p className="lead">
        Group a series of buttons together on a single line with the button
        group.
      </p>
      <Heading h="2" id="btn-groups-single">
        Basic example
      </Heading>
      <p>
        Wrap a series of <code>{'<Button />'}</code>s in a{' '}
        <code>{'<ButtonGroup />'}</code>.
      </p>
      <ReactPlayground codeText={ButtonGroupBasic} />
      <Heading h="2" id="btn-groups-toolbar">
        Button toolbar
      </Heading>
      <p>
        Combine sets of <code>{'<ButtonGroup />'}</code>s into a{' '}
        <code>{'<ButtonToolbar />'}</code> for more complex components.
      </p>
      <ReactPlayground codeText={ButtonToolbarBasic} />
      <p>
        Feel free to mix input groups with button groups in your toolbars.
        Similar to the example above, you’ll likely need some utilities though
        to space things properly.
      </p>
      <ReactPlayground codeText={ButtonToolbar} />
      <Heading h="2" id="btn-groups-sizing">
        Sizing
      </Heading>
      <p>
        Instead of applying button sizing props to every button in a group, just
        add <code>bsSize</code> prop to the <code>{'<ButtonGroup />'}</code>.
      </p>
      <ReactPlayground codeText={ButtonGroupSizes} />
      <Heading h="2" id="btn-groups-nested">
        Nesting
      </Heading>
      <p>
        You can place other button types within the{' '}
        <code>{'<ButtonGroup />'}</code> like{' '}
        <code>{'<DropdownButton />'}</code>s.
      </p>
      <ReactPlayground codeText={ButtonGroupNested} />
      <Heading h="2" id="btn-groups-vertical">
        Vertical variation
      </Heading>
      <p>
        Make a set of buttons appear vertically stacked rather than
        horizontally.{' '}
        <strong className="text-danger">
          Split button dropdowns are not supported here.
        </strong>
      </p>
      <p>
        Just add <code>vertical</code> to the <code>{'<ButtonGroup />'}</code>.
      </p>
      <ReactPlayground codeText={ButtonGroupVertical} />
      <Heading h="2" id="btn-groups-api">
        API
      </Heading>
      <ComponentApi metadata={data.ButtonGroup} />{' '}
      <ComponentApi metadata={data.ButtonToolbar} />
    </>
  );
});

export const query = graphql`
  query ButtonGroupQuery {
    ButtonGroup: componentMetadata(displayName: { eq: "ButtonGroup" }) {
      displayName
      ...ComponentApi_metadata
    }
    ButtonToolbar: componentMetadata(displayName: { eq: "ButtonToolbar" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`;
