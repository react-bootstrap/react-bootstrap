import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ButtonGroupSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="btn-groups">Button groups</Anchor> <small>ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton</small>
      </h2>

      <p className="lead">Group a series of buttons together on a single line with the button group.</p>

      <h3><Anchor id="btn-groups-single">Basic example</Anchor></h3>
      <p>Wrap a series of <code>{'<Button />'}</code>s in a <code>{'<ButtonGroup />'}</code>.</p>
      <ReactPlayground codeText={Samples.ButtonGroupBasic} />

      <h3><Anchor id="btn-groups-toolbar">Button toolbar</Anchor></h3>
      <p>Combine sets of <code>{'<ButtonGroup />'}</code>s into a <code>{'<ButtonToolbar />'}</code> for more complex components.</p>
      <ReactPlayground codeText={Samples.ButtonToolbarBasic} />

      <h3><Anchor id="btn-groups-sizing">Sizing</Anchor></h3>
      <p>Instead of applying button sizing props to every button in a group, just add <code>bsSize</code> prop to the <code>{'<ButtonGroup />'}</code>.</p>
      <ReactPlayground codeText={Samples.ButtonGroupSizes} />

      <h3><Anchor id="btn-groups-nested">Nesting</Anchor></h3>
      <p>You can place other button types within the <code>{'<ButtonGroup />'}</code> like <code>{'<DropdownButton />'}</code>s.</p>
      <ReactPlayground codeText={Samples.ButtonGroupNested} />

      <h3><Anchor id="btn-groups-checkbox-radio">Checkbox / Radio</Anchor></h3>
      <p>
        For checkboxes or radio buttons styled as Bootstrap buttons, use the <code>{'<ToggleButtonGroup>'}</code> and <code>{'<ToggleButton>'}</code> components. The group behaves as a form component, where the value is an array of the selected <code>eventKey</code>s for checkbox groups or the selected <code>eventKey</code> for radio groups.
      </p>
      <h4>Uncontrolled</h4>
      <ReactPlayground codeText={Samples.ToggleButtonGroupUncontrolled} />
      <h4>Controlled</h4>
      <ReactPlayground codeText={Samples.ToggleButtonGroupControlled} />

      <h3><Anchor id="btn-groups-vertical">Vertical variation</Anchor></h3>
      <p>Make a set of buttons appear vertically stacked rather than horizontally. <strong
        className="text-danger"
      >Split button dropdowns are not supported here.</strong></p>
      <p>Just add <code>vertical</code> to the <code>{'<ButtonGroup />'}</code>.</p>
      <ReactPlayground codeText={Samples.ButtonGroupVertical} />
      <br />
      <p>Moreover, you can have buttons be block level elements so they take the full width of their container, just add <code>block</code> to the <code>{'<ButtonGroup />'}</code>, in addition to the <code>vertical</code> you just added.</p>
      <ReactPlayground codeText={Samples.ButtonGroupBlock} />

      <h3><Anchor id="btn-groups-justified">Justified button groups</Anchor></h3>
      <p>Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.</p>
      <div className="bs-callout bs-callout-warning">
        <h4>Style issues</h4>
        <p>There are some issues and workarounds required when using this property, please see <a href="http://getbootstrap.com/components/#btn-groups-justified">bootstrap&#8217;s button group docs</a> for more specifics.</p>
      </div>
      <p>Just add <code>justified</code> to the <code>{'<ButtonGroup />'}</code>.</p>
      <ReactPlayground codeText={Samples.ButtonGroupJustified} />

      <h3><Anchor id="btn-groups-props">Props</Anchor></h3>

      <h4><Anchor id="btn-groups-group-props">ButtonGroup</Anchor></h4>
      <PropTable component="ButtonGroup" />

      <h4><Anchor id="btn-groups-toolbar-props">ButtonToolbar</Anchor></h4>
      <PropTable component="ButtonToolbar" />

      <h4><Anchor id="btn-groups-toggle-group-props">ToggleButtonGroup</Anchor></h4>
      <PropTable component="ToggleButtonGroup" />

      <h4><Anchor id="btn-groups-toggle-btn-props">ToggleButton</Anchor></h4>
      <PropTable component="ToggleButton" />
    </div>
  );
}
