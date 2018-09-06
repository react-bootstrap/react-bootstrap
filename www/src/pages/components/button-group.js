import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import ButtonGroupBasic from '../../examples/ButtonGroupBasic';
import ButtonToolbarBasic from '../../examples/ButtonToolbarBasic';
import ButtonGroupSizes from '../../examples/ButtonGroupSizes';
import ButtonGroupNested from '../../examples/ButtonGroupNested';
import ButtonGroupVertical from '../../examples/ButtonGroupVertical';
import ButtonGroupBlock from '../../examples/ButtonGroupBlock';
import ButtonGroupJustified from '../../examples/ButtonGroupJustified';
import ToggleButtonGroupControlled from '../../examples/ToggleButtonGroupControlled';
import ToggleButtonGroupUncontrolled from '../../examples/ToggleButtonGroupUncontrolled';

export default function ButtonGroupSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="btn-groups">Button groups</Anchor>{' '}
        <small>
          ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton
        </small>
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
        <code>{'<DropdownButton />'}</code>
        s.
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
      <br />
      <p>
        Moreover, you can have buttons be block level elements so they take the
        full width of their container, just add <code>block</code> to the{' '}
        <code>{'<ButtonGroup />'}</code>, in addition to the{' '}
        <code>vertical</code> you just added.
      </p>
      <ReactPlayground codeText={ButtonGroupBlock} />

      <h3>
        <Anchor id="btn-groups-justified">Justified button groups</Anchor>
      </h3>
      <p>
        Make a group of buttons stretch at equal sizes to span the entire width
        of its parent. Also works with button dropdowns within the button group.
      </p>
      <div className="bs-callout bs-callout-warning">
        <h4>Style issues</h4>
        <p>
          There are some issues and workarounds required when using this
          property, please see{' '}
          <a href="http://getbootstrap.com/components/#btn-groups-justified">
            bootstrap&#8217;s button group docs
          </a>{' '}
          for more specifics.
        </p>
      </div>
      <p>
        Just add <code>justified</code> to the <code>{'<ButtonGroup />'}</code>.
      </p>
      <ReactPlayground codeText={ButtonGroupJustified} />

      <h3>
        <Anchor id="btn-groups-checkbox-radio">Checkbox / Radio</Anchor>
      </h3>
      <p>
        For checkboxes or radio buttons styled as Bootstrap buttons, use the
        <code>{'<ToggleButtonGroup>'}</code> and <code>{'<ToggleButton>'}</code>
        components. The group behaves as a form component, where the value is an
        array of the selected <code>eventKey</code>s for checkbox groups or the
        selected <code>eventKey</code> for radio groups.
      </p>

      <div className="bs-callout bs-callout-warning">
        <h4>Bootstrap JS issue</h4>
        <p>
          There is a known{' '}
          <a href="https://github.com/react-bootstrap/react-bootstrap/issues/2774">
            issue
          </a>{' '}
          when including Bootstrap JS while using Toggle Button Groups.
          Therefore it is advised not use Bootstrap JS in conjunction with{' '}
          <code>{'<ToggleButtonGroup>'}</code> and{' '}
          <code>{'<ToggleButton>'}</code>.
        </p>
      </div>

      <h4>Uncontrolled</h4>
      <ReactPlayground codeText={ToggleButtonGroupUncontrolled} />
      <h4>Controlled</h4>
      <ReactPlayground codeText={ToggleButtonGroupControlled} />

      <h3>
        <Anchor id="btn-groups-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="btn-groups-group-props">ButtonGroup</Anchor>
        <LinkToSource component={data.ButtonGroup.displayName} />
      </h4>
      <PropTable metadata={data.ButtonGroup} />

      <h4>
        <Anchor id="btn-groups-toolbar-props">ButtonToolbar</Anchor>
        <LinkToSource component={data.ButtonToolbar.displayName} />
      </h4>
      <PropTable metadata={data.ButtonToolbar} />

      <h4>
        <Anchor id="btn-groups-toggle-group-props">ToggleButtonGroup</Anchor>
        <LinkToSource component={data.ToggleButtonGroup.displayName} />
      </h4>
      <PropTable metadata={data.ToggleButtonGroup} />

      <h4>
        <Anchor id="btn-groups-toggle-btn-props">ToggleButton</Anchor>
        <LinkToSource component={data.ToggleButton.displayName} />
      </h4>
      <PropTable metadata={data.ToggleButton} />
    </div>
  );
}

export const query = graphql`
  query ButtonGroupQuery {
    ButtonGroup: componentMetadata(displayName: { eq: "ButtonGroup" }) {
      ...PropTable_metadata
    }
    ButtonToolbar: componentMetadata(displayName: { eq: "ButtonToolbar" }) {
      ...PropTable_metadata
    }
    ToggleButtonGroup: componentMetadata(
      displayName: { eq: "ToggleButtonGroup" }
    ) {
      ...PropTable_metadata
    }
    ToggleButton: componentMetadata(displayName: { eq: "ToggleButton" }) {
      ...PropTable_metadata
    }
  }
`;
