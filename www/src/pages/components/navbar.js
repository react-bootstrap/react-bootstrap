import { graphql } from 'gatsby';

import DocLink from '../../components/DocLink';
import LinkedHeading from '../../components/LinkedHeading';
import Callout from '../../components/Callout';
import CodeBlock from '../../components/CodeBlock';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import NavbarBasic from '../../examples/Navbar/Basic';
import NavbarBrand from '../../examples/Navbar/Brand';
import NavbarCollapsible from '../../examples/Navbar/Collapsible';
import NavbarColorSchemes from '../../examples/Navbar/ColorSchemes';
import NavScroll from '../../examples/Navbar/NavScroll';
import NavbarTextLink from '../../examples/Navbar/TextLink';
import ContainerOutside from '../../examples/Navbar/ContainerOutside';
import ContainerInside from '../../examples/Navbar/ContainerInside';
import withLayout from '../../withLayout';

export default withLayout(function NaπvbarSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="navbars">
        Navbars
      </LinkedHeading>
      <p className="lead">
        A powerful, responsive navigation header, the navbar. Includes support
        for branding, navigation, and more
      </p>

      <LinkedHeading h="2" id="navbars-overview">
        Overview
      </LinkedHeading>
      <p>
        Here’s what you need to know before getting started with the Navbar:
      </p>
      <ul>
        <li>
          Use the <code>expand</code> prop to allow for collapsing the Navbar at
          lower breakpoints.
        </li>
        <li>
          Navbars and their contents are fluid by default. Use optional{' '}
          <a href="#navbars-containers">containers </a> to limit their
          horizontal width.
        </li>
        <li>Use spacing and flex utilities to size and position content</li>
      </ul>

      <p>
        A responsive navigation header, including support for branding,
        navigation, and more. Here’s an example of all the sub-components
        included in a responsive light-themed navbar that automatically
        collapses at the lg (large) breakpoint.
      </p>

      <ReactPlayground codeText={NavbarBasic} />
      <LinkedHeading h="2" id="navbars-brand">
        Brand
      </LinkedHeading>
      <p>
        A simple flexible branding component. Images are supported but will
        likely require custom styling to work well.
      </p>
      <ReactPlayground codeText={NavbarBrand} />

      <LinkedHeading h="2" id="navbars-form">
        Forms
      </LinkedHeading>

      <LinkedHeading h="2" id="navbars-text-link">
        Text and Non-nav links
      </LinkedHeading>
      <p>
        Loose text and links can be wrapped <code>Navbar.Text</code> in order to
        correctly align it vertically.
      </p>
      <ReactPlayground codeText={NavbarTextLink} />

      <LinkedHeading h="2" id="navbars-colors">
        Color schemes
      </LinkedHeading>
      <p>
        Theming the navbar has never been easier thanks to the combination of
        theming classes and background-color utilities. Choose from{' '}
        <code>variant="light"</code> for use with light background colors, or{' '}
        <code>variant="dark"</code> for dark background colors. Then, customize
        with the <code>bg</code> prop or any custom css!
      </p>

      <ReactPlayground codeText={NavbarColorSchemes} />

      <LinkedHeading h="2" id="navbars-containers">
        Containers
      </LinkedHeading>
      <p>
        While not required, you can wrap the Navbar in a{' '}
        <code>{'<Container>'}</code> component to center it on a page, or add
        one within to only center the contents of a{' '}
        <a href="#navbars-placement">fixed or static top navbar</a>.
      </p>
      <ReactPlayground codeText={ContainerOutside} />

      <p>
        When the container is within your navbar, its horizontal padding is
        removed at breakpoints lower than your specified{' '}
        <code>{`expand={'sm' | 'md' | 'lg' | 'xl' | 'xxl'}`}</code> prop. This
        ensures we’re not doubling up on padding unnecessarily on lower
        viewports when your navbar is collapsed.
      </p>
      <ReactPlayground codeText={ContainerInside} />

      <LinkedHeading h="2" id="navbars-placement">
        Placement
      </LinkedHeading>
      <p>
        You can use Bootstrap's{' '}
        <DocLink path="/utilities/position/">position utilities</DocLink> to
        place navbars in non-static positions. Choose from fixed to the top,
        fixed to the bottom, or stickied to the top (scrolls with the page until
        it reaches the top, then stays there). Fixed navbars use{' '}
        <code>position: fixed</code>, meaning they’re pulled from the normal
        flow of the DOM and may require custom CSS (e.g., padding-top on the{' '}
        <code>{'<body>'}</code>) to prevent overlap with other elements. Also
        note that{' '}
        <strong>
          <code>.sticky-top</code> uses <code>position: sticky</code>, which{' '}
          <a href="https://caniuse.com/#feat=css-sticky">
            isn’t fully supported in every browser
          </a>
        </strong>
        .
      </p>

      <p>
        Since these positioning needs are so common for Navbars, we've added
        convenience props for them
      </p>
      <h3 className="h4">Fixed top</h3>
      <CodeBlock codeText={` <Navbar fixed="top" />`} />

      <h3 className="h4">Fixed bottom</h3>
      <CodeBlock codeText={` <Navbar fixed="bottom" />`} />

      <h3 className="h4">Sticky top</h3>
      <CodeBlock codeText={` <Navbar sticky="top" />`} />

      <LinkedHeading h="2" id="navbars-nav-scroll">
        Scrolling
      </LinkedHeading>
      <p>
        You can use the <code>navbarScroll</code> prop in a{' '}
        <code>{'<Nav>'}</code> to enable vertical scrolling within the
        toggleable contents of a collapsed navbar. See the{' '}
        <DocLink path="/components/navbar/#scrolling">Bootstrap docs</DocLink>{' '}
        for more information.
      </p>
      <ReactPlayground codeText={NavScroll} />

      <LinkedHeading h="2" id="navbars-mobile-friendly">
        Responsive behaviors
      </LinkedHeading>
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

      <LinkedHeading h="2" id="navbar-api">
        API
      </LinkedHeading>

      <ComponentApi metadata={data.Navbar} />
      <ComponentApi metadata={data.NavbarBrand} exportedBy={data.Navbar} />
      <ComponentApi metadata={data.NavbarToggle} exportedBy={data.Navbar} />
      <ComponentApi metadata={data.NavbarCollapse} exportedBy={data.Navbar} />
    </>
  );
});

export const query = graphql`
  query NavbarQuery {
    Navbar: componentMetadata(displayName: { eq: "Navbar" }) {
      ...ComponentApi_metadata
    }
    NavbarBrand: componentMetadata(displayName: { eq: "NavbarBrand" }) {
      ...ComponentApi_metadata
    }
    NavbarToggle: componentMetadata(displayName: { eq: "NavbarToggle" }) {
      ...ComponentApi_metadata
    }
    NavbarCollapse: componentMetadata(displayName: { eq: "NavbarCollapse" }) {
      ...ComponentApi_metadata
    }
  }
`;
