import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function NavbarSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="navbars">Navbars</Anchor> <small>Navbar</small>
      </h2>

      <p>Navbars are responsive meta components that serve as navigation headers for your application or site.</p>
      <p>
        They also support all the different Bootstrap classes as properties. Just camelCase
        the css class and remove navbar from it.
      </p>
      <p>
        For example <code>navbar-fixed-top</code> becomes the property <code>fixedTop</code>.
        The different properties are <code>fixedTop</code>, <code>fixedBottom</code>, <code>staticTop</code>
        , <code>inverse</code>, and <code>fluid</code>.
      </p>
      <p>
        You can also align elements to the right by specifying the <code>pullRight</code> prop on
        the <code>Nav</code>, and other sub-components.
      </p>

      <h3><Anchor id="navbars-basic">Navbar Basic Example</Anchor></h3>
      <ReactPlayground codeText={Samples.NavbarBasic} />
      <div className="bs-callout bs-callout-info">
        <h4>Additional Import Options</h4>
        <p>
          The Navbar Header, Toggle, Brand, and Collapse components are available as static properties
          on the <code>{"<Navbar/>"}</code> component but you can also import them directly from
          the <code>/lib</code> directory
          like: <code>{'require("react-bootstrap/lib/NavbarHeader")'}</code>.
        </p>
      </div>

      <h3><Anchor id="navbars-mobile-friendly">Responsive Navbars</Anchor></h3>
      <p>
        To have a mobile friendly Navbar, Add a <code>Navbar.Toggle</code> to your Header and wrap your
        Navs in a <code>Navbar.Collapse</code> component. The <code>Navbar</code> will automatically wire
        the toggle and collapse together!
      </p>
      <p>
        By setting the prop <code>defaultExpanded</code> the Navbar will start
        expanded by default. You can also finely control the collapsing behavior by using
        the <code>expanded</code> and <code>onToggle</code> props.
      </p>

      <ReactPlayground codeText={Samples.NavbarCollapsible} />

      <h3><Anchor id="navbars-form">Forms</Anchor></h3>
      <p>
        Use the <code>Navbar.Form</code> convenience component to apply proper margins and alignment to
        form components.
      </p>
      <ReactPlayground codeText={Samples.NavbarForm} />

      <h3><Anchor id="navbars-text-link">Text and Non-nav links</Anchor></h3>
      <p>
        Loose text and links can be wraped in the convenience
        components: <code>Navbar.Link</code> and <code>Navbar.Text</code>
      </p>

      <ReactPlayground codeText={Samples.NavbarTextLink} />

      <h3><Anchor id="navbar-props">Props</Anchor></h3>

      <h4><Anchor id="navs-props-navbar">Navbar</Anchor></h4>
      <PropTable component="Navbar"/>

      <h4><Anchor id="navs-props-navbar-toggle">Navbar.Toggle</Anchor></h4>
      <PropTable component="NavbarToggle"/>
    </div>
  );
}
