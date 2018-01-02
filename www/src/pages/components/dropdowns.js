import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import DropdownButtonBasic from '!!raw-loader!../../examples/DropdownButtonBasic';
import SplitButtonBasic from '!!raw-loader!../../examples/SplitButtonBasic';
import DropdownButtonSizes from '!!raw-loader!../../examples/DropdownButtonSizes';
import DropdownButtonNoCaret from '!!raw-loader!../../examples/DropdownButtonNoCaret';
import SplitButtonDropup from '!!raw-loader!../../examples/SplitButtonDropup';
import SplitButtonRight from '!!raw-loader!../../examples/SplitButtonRight';
import DropdownButtonCustom from '!!raw-loader!../../examples/DropdownButtonCustom';
import DropdownButtonCustomMenu from '!!raw-loader!../../examples/DropdownButtonCustomMenu';
import MenuItem from '!!raw-loader!../../examples/MenuItem';


export default function DropdownSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="btn-dropdowns">Dropdowns</Anchor> <small>DropdownButton, SplitButton, Dropdown</small>
      </h2>

      <h3><Anchor id="btn-dropdowns-single">Single button dropdowns</Anchor></h3>
      <p>Create a dropdown button with the <code>{"<DropdownButton />"}</code> component.</p>
      <ReactPlayground codeText={DropdownButtonBasic} />

      <h3><Anchor id="btn-dropdowns-split">Split button dropdowns</Anchor></h3>
      <p>Similarly, create split button dropdowns with the <code>{"<SplitButton />"}</code> component.</p>
      <ReactPlayground codeText={SplitButtonBasic} />

      <h3><Anchor id="btn-dropdowns-sizing">Sizing</Anchor></h3>
      <p>Dropdowns work with buttons of all sizes.</p>
      <ReactPlayground codeText={DropdownButtonSizes} />

      <h3><Anchor id="btn-dropdowns-nocaret">No caret variation</Anchor></h3>
      <p>Remove the caret using the <code>noCaret</code> prop.</p>
      <ReactPlayground codeText={DropdownButtonNoCaret} />

      <h3><Anchor id="btn-dropdowns-dropup">Dropup variation</Anchor></h3>
      <p>Trigger dropdown menus that site above the button by adding the <code>dropup</code> prop.</p>
      <ReactPlayground codeText={SplitButtonDropup} />

      <h3><Anchor id="btn-dropdowns-right">Dropdown right variation</Anchor></h3>
      <p>Trigger dropdown menus that align to the right of the button using the <code>pullRight</code> prop.</p>
      <ReactPlayground codeText={SplitButtonRight} />

      <h2 className="page-header">
        <Anchor id="menu-items">Menu items</Anchor> <small>MenuItem</small>
      </h2>

      <p>This component represents a menu item in a dropdown.</p>
      <p>It supports the basic anchor properties <code>href</code>, <code>target</code>, <code>title</code>.</p>
      <p>
        It also supports different properties of the normal Bootstrap MenuItem.
      </p>
      <ul>
        <li><code>header</code>: To add a header label to sections</li>
        <li><code>divider</code>: Adds an horizontal divider between sections</li>
        <li><code>disabled</code>: shows the item as disabled, and prevents <code>onSelect</code> from firing</li>
        <li><code>eventKey</code>: passed to the callback</li>
        <li><code>onSelect</code>: a callback that is called when the user clicks the item.</li>
      </ul>
      <p>The callback is called with the following arguments: <code>event</code> and <code>eventKey</code></p>
      <ReactPlayground codeText={MenuItem} />



      <h3><Anchor id="btn-dropdowns-custom">Dropdown Customization</Anchor></h3>
      <p>
        If the default handling of the dropdown menu and toggle components aren't to your liking, you can
        customize them, by using the more basic <code>Dropdown</code> Component to explicitly specify
        the Toggle and Menu components
      </p>
      <div className="bs-callout bs-callout-info">
        <h4>Additional Import Options</h4>
        <p>
          As a convenience Toggle and Menu components available as static properties
          on the Dropdown component. However, you can also import them directly, from
          the <code>/lib</code> directory like: <code>{'require("react-bootstrap/lib/DropdownToggle")'}</code>.
        </p>
      </div>
      <ReactPlayground codeText={DropdownButtonCustom} />

      <h4>Custom Dropdown Components</h4>

      <p>
        For those that want to customize everything, you can forgo the included Toggle and Menu components, and create your own. In order to tell the Dropdown component what role your custom components play, add a special prop <code>bsRole</code> to your menu or toggle components. The Dropdown expects at least one component with <code>bsRole="toggle"</code> and exactly one with <code>bsRole="menu"</code>. Custom toggle and menu components must be able to accept refs.
      </p>
      <ReactPlayground codeText={DropdownButtonCustomMenu} />

      <h3><Anchor id="btn-dropdowns-props">Props</Anchor></h3>

      <h4><Anchor id="btn-dropdowns-props-dropdown-button">DropdownButton</Anchor></h4>
      <PropTable metadata={data.DropdownButton} />

      <h4><Anchor id="btn-dropdowns-props-split">SplitButton</Anchor></h4>
      <PropTable metadata={data.SplitButton} />

      <h4><Anchor id="btn-dropdowns-props-dropdown">Dropdown</Anchor></h4>
      <PropTable metadata={data.Dropdown} />

      <h3><Anchor id="menu-item-props">Props</Anchor></h3>
      <PropTable metadata={data.MenuItem}/>
    </div>
  );
}

export const query = graphql`
  query DropdownQuery {
    DropdownButton: componentMetadata(displayName: { eq: "DropdownButton" }) {
      ...PropTable_metadata
    }
    SplitButton: componentMetadata(displayName: { eq: "SplitButton" }) {
      ...PropTable_metadata
    }
    Dropdown: componentMetadata(displayName: { eq: "Dropdown" }) {
      ...PropTable_metadata
    }
    MenuItem: componentMetadata(displayName: { eq: "MenuItem" }) {
      ...PropTable_metadata
    }
  }

`;
