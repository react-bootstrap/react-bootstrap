import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import ButtonGroupBasic from '../../examples/ButtonGroup/Basic';
import ButtonToolbarBasic from '../../examples/ButtonGroup/ToolbarBasic';
import ButtonToolbar from '../../examples/ButtonGroup/Toolbar';
import ButtonGroupSizes from '../../examples/ButtonGroup/Sizes';
import ButtonGroupNested from '../../examples/ButtonGroup/Nested';
import ButtonGroupVertical from '../../examples/ButtonGroup/Vertical';

export default function ButtonGroupSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="btn-groups">Button groups</Anchor>{' '}
        <small>ButtonGroup, ButtonToolbar</small>
      </h2>

      <p className="lead">
        Group a series of buttons together on a single line with the button
        group.
      </p>

      <h3>
        <Anchor id="btn-groups-single">Basic example</Anchor>
      </h3>
      <p>
        Wrap a series of <code>{'<Button />'}</code>s in a{' '}
        <code>{'<ButtonGroup />'}</code>.
      </p>
      <ReactPlayground codeText={ButtonGroupBasic} />

      <h3>
        <Anchor id="btn-groups-toolbar">Button toolbar</Anchor>
      </h3>
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

      <h3>
        <Anchor id="btn-groups-sizing">Sizing</Anchor>
      </h3>
      <p>
        Instead of applying button sizing props to every button in a group, just
        add <code>bsSize</code> prop to the <code>{'<ButtonGroup />'}</code>.
      </p>
      <ReactPlayground codeText={ButtonGroupSizes} />

      <h3>
        <Anchor id="btn-groups-nested">Nesting</Anchor>
      </h3>
      <p>
        You can place other button types within the{' '}
        <code>{'<ButtonGroup />'}</code> like{' '}
        <code>{'<DropdownButton />'}</code>s.
      </p>
      <ReactPlayground codeText={ButtonGroupNested} />

      <h3>
        <Anchor id="btn-groups-vertical">Vertical variation</Anchor>
      </h3>
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

      <h3>
        <Anchor id="btn-groups-props">Props</Anchor>
      </h3>
      <h4>
        <Anchor id="btn-groups-group-props">ButtonGroup</Anchor>
        <LinkToSource component={data.ButtonGroup.displayName} />
      </h4>
      <PropTable metadata={data.ButtonGroup} />
    </div>
  );
}

export const query = graphql`
  query ButtonGroupQuery {
    ButtonGroup: componentMetadata(displayName: { eq: "ButtonGroup" }) {
      displayName
      ...PropTable_metadata
    }
  }
`;
