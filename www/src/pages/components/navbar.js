import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import Callout from '../../components/Callout';

import NavbarBasic from '../../examples/Navbar/Basic';
import NavbarBrand from '../../examples/Navbar/Brand';
import NavbarColorSchemes from '../../examples/Navbar/ColorSchemes';
import NavbarCollapsible from '../../examples/Navbar/Collapsible';
import NavbarForm from '../../examples/Navbar/Form';
import NavbarTextLink from '../../examples/Navbar/TextLink';

export default function NavbarSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="navbars">Navbars</Anchor>
      </h2>
      <p>
        A responsive navigation header, including support for branding,
        navigation, and more. Here’s an example of all the sub-components
        included in a responsive light-themed navbar that automatically
        collapses at the lg (large) breakpoint.
      </p>

      <ReactPlayground codeText={NavbarBasic} />
      <h3>
        <Anchor id="navbars-brand">Brand</Anchor>
      </h3>
      <p>
        A simple flexible branding component. Images are supported but will
        likely require custome styling to work well.
      </p>
      <ReactPlayground codeText={NavbarBrand} />

      <h3>
        <Anchor id="navbars-form">Forms</Anchor>
      </h3>
      <p>
        Use <code>{'<Form inline>'}</code> and your variaous form controls
        within the Navbar. Align the contents as needed with utility classes.
      </p>
      <ReactPlayground codeText={NavbarForm} />

      <h3>
        <Anchor id="navbars-text-link">Text and Non-nav links</Anchor>
      </h3>
      <p>
        Loose text and links can be wrapped <code>Navbar.Text</code> in order to
        correctly align it veritically.
      </p>
      <ReactPlayground codeText={NavbarTextLink} />

      <div className="bs-callout bs-callout-info">
        <h4>Additional Import Options</h4>
        <p>
          The Navbar Header, Toggle, Brand, and Collapse components are
          available as static properties on the <code>{'<Navbar/>'}</code>{' '}
          component but you can also import them directly from the{' '}
          <code>/lib</code> directory like:{' '}
          <code>{'require("react-bootstrap/lib/NavbarHeader")'}</code>.
        </p>
      </div>
      <h3>
        <Anchor id="navbars-colors">Color schemes</Anchor>
      </h3>
      <p>
        Theming the navbar has never been easier thanks to the combination of
        theming classes and background-color utilities. Choose from
        <code>variant="light"</code> for use with light background colors, or{' '}
        <code>variant="dark"</code> for dark background colors. Then, customize
        with the <code>bg</code> prop or any custome css!
      </p>

      <ReactPlayground codeText={NavbarColorSchemes} />
      <h3>
        <Anchor id="navbars-mobile-friendly">Responsive behaviors</Anchor>
      </h3>
      <p>
        Use the <code>expand</code> prop as well as the{' '}
        <code>Navbar.Toggle</code> and <code>Navbar.Collapse</code> components
        to control when content collapses behind a button.
      </p>
      <p>
        Set the <code>defaultExpanded</code> prop to make the Navbar start
        expanded. Set <code>collapseOnSelect</code> to make the Navbar collapse
        automatically when the user selects an item. You can also finely control
        the collapsing behavior by using the <code>expanded</code> and{' '}
        <code>onToggle</code> props.
      </p>

      <Callout theme="warning">
        Watch out! You <strong>need</strong> to provide a breakpoint value to{' '}
        <code>expand</code> in order for the Navbar to collapse at all.
      </Callout>
      <ReactPlayground codeText={NavbarCollapsible} />

      <h3>
        <Anchor id="navbar-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="navs-props-navbar">Navbar</Anchor>
        <LinkToSource component={data.Navbar.displayName} />
      </h4>
      <PropTable metadata={data.Navbar} />

      <h4>
        <Anchor id="navs-props-navbar-toggle">Navbar.Toggle</Anchor>
        <LinkToSource component={data.NavbarToggle.displayName} />
      </h4>
      <PropTable metadata={data.NavbarToggle} />
    </div>
  );
}

export const query = graphql`
  query NavbarQuery {
    Navbar: componentMetadata(displayName: { eq: "Navbar" }) {
      ...PropTable_metadata
    }
    NavbarToggle: componentMetadata(displayName: { eq: "NavbarToggle" }) {
      ...PropTable_metadata
    }
  }
`;
