import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function DropdownSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="btn-dropdowns">Dropdowns</Anchor> <small>DropdownButton, SplitButton, Dropdown</small>
      </h2>

      <h3><Anchor id="btn-dropdowns-single">Single button dropdowns</Anchor></h3>
      <p>Create a dropdown button with the <code>{"<DropdownButton />"}</code> component.</p>
      <ReactPlayground codeText={Samples.DropdownButtonBasic} />

      <h3><Anchor id="btn-dropdowns-split">Split button dropdowns</Anchor></h3>
      <p>Similarly, create split button dropdowns with the <code>{"<SplitButton />"}</code> component.</p>
      <ReactPlayground codeText={Samples.SplitButtonBasic} />

      <h3><Anchor id="btn-dropdowns-sizing">Sizing</Anchor></h3>
      <p>Dropdowns work with buttons of all sizes.</p>
      <ReactPlayground codeText={Samples.DropdownButtonSizes} />

      <h3><Anchor id="btn-dropdowns-nocaret">No caret variation</Anchor></h3>
      <p>Remove the caret using the <code>noCaret</code> prop.</p>
      <ReactPlayground codeText={Samples.DropdownButtonNoCaret} />

      <h3><Anchor id="btn-dropdowns-dropup">Dropup variation</Anchor></h3>
      <p>Trigger dropdown menus that site above the button by adding the <code>dropup</code> prop.</p>
      <ReactPlayground codeText={Samples.SplitButtonDropup} />

      <h3><Anchor id="btn-dropdowns-right">Dropdown right variation</Anchor></h3>
      <p>Trigger dropdown menus that align to the right of the button using the <code>pullRight</code> prop.</p>
      <ReactPlayground codeText={Samples.SplitButtonRight} />

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
      <ReactPlayground codeText={Samples.DropdownButtonCustom} />

      <h4>Custom Dropdown Components</h4>

      <p>
        For those that want to customize everything, you can forgo the included Toggle and Menu components, and create your own. In order to tell the Dropdown component what role your custom components play, add a special prop <code>bsRole</code> to your menu or toggle components. The Dropdown expects at least one component with <code>bsRole="toggle"</code> and exactly one with <code>bsRole="menu"</code>. Custom toggle and menu components must be able to accept refs.
      </p>
      <ReactPlayground codeText={Samples.DropdownButtonCustomMenu} />

      <h3><Anchor id="btn-dropdowns-props">Props</Anchor></h3>

      <h4><Anchor id="btn-dropdowns-props-dropdown-button">DropdownButton</Anchor></h4>
      <PropTable component="DropdownButton"/>

      <h4><Anchor id="btn-dropdowns-props-split">SplitButton</Anchor></h4>
      <PropTable component="SplitButton"/>

      <h4><Anchor id="btn-dropdowns-props-dropdown">Dropdown</Anchor></h4>
      <PropTable component="Dropdown"/>
    </div>
  );
}
