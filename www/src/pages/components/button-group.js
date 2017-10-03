import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import ButtonGroupBasic from '!!raw-loader!../../examples/ButtonGroupBasic';
import ButtonToolbarBasic from '!!raw-loader!../../examples/ButtonToolbarBasic';
import ButtonGroupSizes from '!!raw-loader!../../examples/ButtonGroupSizes';
import ButtonGroupNested from '!!raw-loader!../../examples/ButtonGroupNested';
import ButtonGroupVertical from '!!raw-loader!../../examples/ButtonGroupVertical';
import ButtonGroupBlock from '!!raw-loader!../../examples/ButtonGroupBlock';
import ButtonGroupJustified from '!!raw-loader!../../examples/ButtonGroupJustified';

export default function ButtonGroupSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="btn-groups">Button groups</Anchor> <small>ButtonGroup, ButtonToolbar</small>
      </h2>

      <p className="lead">Group a series of buttons together on a single line with the button group.</p>

      <h3><Anchor id="btn-groups-single">Basic example</Anchor></h3>
      <p>Wrap a series of <code>{"<Button />"}</code>s in a <code>{"<ButtonGroup />"}</code>.</p>
      <ReactPlayground codeText={ButtonGroupBasic} />

      <h3><Anchor id="btn-groups-toolbar">Button toolbar</Anchor></h3>
      <p>Combine sets of <code>{"<ButtonGroup />"}</code>s into a <code>{"<ButtonToolbar />"}</code> for more complex components.</p>
      <ReactPlayground codeText={ButtonToolbarBasic} />

      <h3><Anchor id="btn-groups-sizing">Sizing</Anchor></h3>
      <p>Instead of applying button sizing props to every button in a group, just add <code>bsSize</code> prop to the <code>{"<ButtonGroup />"}</code>.</p>
      <ReactPlayground codeText={ButtonGroupSizes} />

      <h3><Anchor id="btn-groups-nested">Nesting</Anchor></h3>
      <p>You can place other button types within the <code>{"<ButtonGroup />"}</code> like <code>{"<DropdownButton />"}</code>s.</p>
      <ReactPlayground codeText={ButtonGroupNested} />

      <h3><Anchor id="btn-groups-vertical">Vertical variation</Anchor></h3>
      <p>Make a set of buttons appear vertically stacked rather than horizontally. <strong
        className="text-danger">Split button dropdowns are not supported here.</strong></p>
      <p>Just add <code>vertical</code> to the <code>{"<ButtonGroup />"}</code>.</p>
      <ReactPlayground codeText={ButtonGroupVertical} />
      <br />
      <p>Moreover, you can have buttons be block level elements so they take the full width of their container, just add <code>block</code> to the <code>{"<ButtonGroup />"}</code>, in addition to the <code>vertical</code> you just added.</p>
      <ReactPlayground codeText={ButtonGroupBlock} />

      <h3><Anchor id="btn-groups-justified">Justified button groups</Anchor></h3>
      <p>Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.</p>
      <div className="bs-callout bs-callout-warning">
        <h4>Style issues</h4>
        <p>There are some issues and workarounds required when using this property, please see <a href="http://getbootstrap.com/components/#btn-groups-justified">bootstrap&#8217;s button group docs</a> for more specifics.</p>
      </div>
      <p>Just add <code>justified</code> to the <code>{"<ButtonGroup />"}</code>.</p>
      <ReactPlayground codeText={ButtonGroupJustified} />

      <h3><Anchor id="btn-groups-props">Props</Anchor></h3>
      <PropTable metadata={data.metadata} />
    </div>
  );
}


export const query = graphql`
  query ButtonGroupQuery {
    metadata: componentMetadata(displayName: { eq: "ButtonGroup" }) {
      ...PropTable_metadata
    }
  }
`;
