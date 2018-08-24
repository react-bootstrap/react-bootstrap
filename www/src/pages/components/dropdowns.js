import { graphql } from 'gatsby';
import React from 'react';
import { css } from 'css-literal-loader/styled';

import LinkedHeading from '../../components/LinkedHeading';
import ARIA from '../../components/AriaAbbr';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import DropdownBasic from '../../examples/Dropdown/Basic';
import DropdownBasicButton from '../../examples/Dropdown/BasicButton';
import DropdownButtonCustom from '../../examples/Dropdown/ButtonCustom';
import DropdownButtonCustomMenu from '../../examples/Dropdown/ButtonCustomMenu';
import DropdownButtonSizes from '../../examples/Dropdown/ButtonSizes';
import DropDirections from '../../examples/Dropdown/DropDirections';
import DropdownItemTags from '../../examples/Dropdown/DropdownItemTags';
import MenuAlignRight from '../../examples/Dropdown/MenuAlignRight';
import MenuDividers from '../../examples/Dropdown/MenuDividers';
import MenuHeaders from '../../examples/Dropdown/MenuHeaders';
import SplitBasic from '../../examples/Dropdown/SplitBasic';
import SplitVariants from '../../examples/Dropdown/SplitVariants';
import DropdownVariants from '../../examples/Dropdown/Variants';
import withLayout from '../../withLayout';

const styles = css`
  .static-menu :global(.dropdown-menu) {
    position: static;
    display: block;
  }
  .custom-menu :global(.super-colors) {
    background: linear-gradient(
      to bottom,
      orange,
      yellow,
      green,
      cyan,
      blue,
      violet
    );
  }
`;

export default withLayout(function DropdownSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="dropdowns">
        Dropdowns
      </LinkedHeading>
      <p className="lead">
        Toggle contextual overlays for displaying lists of links and more with
        the Bootstrap dropdown plugin
      </p>
      <LinkedHeading h="2" id="dropdown-overview">
        Overview
      </LinkedHeading>
      <p>
        Dropdowns are toggleable, contextual overlays for displaying lists of
        links and more. Like overlays, Dropdowns are built using a third-party
        library <a href="https://popper.js.org/">Popper.js</a>, which provides
        dynamic positioning and viewport detection.
      </p>

      <LinkedHeading h="2" id="dropdown-a11y">
        Accessibility
      </LinkedHeading>
      <p>
        The{' '}
        <a href="https://www.w3.org/TR/wai-aria/">
          <abbr title="Web Accessibility Initiative">WAI</abbr> <ARIA />
        </a>{' '}
        standard defines a{' '}
        <a href="https://www.w3.org/TR/wai-aria-1.1/#menu">
          role="menu" widget
        </a>
        , but it's very specific to a certain kind a menu. <ARIA /> menus, must
        only contain <code>role="menuitem"</code>,{' '}
        <code>role="menuitemcheckbox"</code>, or{' '}
        <code>role="menuitemradio"</code>.
      </p>
      <p>
        On the other hand, Bootstrap's dropdowns are designed to more generic
        and application in a variety of situations. For this reason we don't
        automatically add the menu roles to the markup. We do implement some
        basic keyboard navigation, and if you do provide the "menu" role,
        react-bootstrap will do it's best to ensure the focus management is
        compliant with the <ARIA /> authoring guidelines for menus.
      </p>
      <LinkedHeading h="2" id="dropdown-examples">
        Examples
      </LinkedHeading>
      <LinkedHeading h="3" id="dropdowns-single">
        Single button dropdowns
      </LinkedHeading>
      <p>
        The basic Dropdown is composed of a wrapping <code>Dropdown</code> and
        inner <code>DropdownMenu</code>, and <code>DropdownToggle</code>. By
        default the <code>DropdownToggle</code> will render a{' '}
        <code>Button</code> component and accepts all the same props.
      </p>
      <ReactPlayground codeText={DropdownBasic} />
      <p>
        Since the above is such a common configuration react-bootstrap provide
        the <code>DropdownButton</code> component to help reduce typing. Provide
        a <code>title</code> prop and some <code>DropdownItem</code>s and you're
        ready to go.
      </p>

      <ReactPlayground codeText={DropdownBasicButton} />
      <p>
        DropdownButton will forward Button props to the underlying Toggle
        component
      </p>
      <ReactPlayground codeText={DropdownVariants} />

      <LinkedHeading h="3" id="dropdowns-split">
        Split button dropdowns
      </LinkedHeading>
      <p>
        Similarly, You create a split dropdown by combining the Dropdown
        components with another Button and a ButtonGroup.
      </p>
      <ReactPlayground codeText={SplitBasic} />

      <p>
        As with DropdownButton, <code>SplitButton</code> is provided as
        convenience component.
      </p>
      <ReactPlayground codeText={SplitVariants} />

      <LinkedHeading h="2" id="dropdowns-sizing">
        Sizing
      </LinkedHeading>
      <p>Dropdowns work with buttons of all sizes.</p>
      <ReactPlayground codeText={DropdownButtonSizes} />

      <LinkedHeading h="2" id="dropdowns-directions">
        Drop directions
      </LinkedHeading>
      <p>
        Trigger dropdown menus above, below, left, or to the right of their
        toggle elements, with the <code>drop</code> prop.
      </p>
      <ReactPlayground codeText={DropDirections} />

      <LinkedHeading h="2" id="menu-items">
        Dropdown items
      </LinkedHeading>

      <p>
        Historically dropdown menu contents had to be links, but that’s no
        longer the case with v4. Now you can optionally use{' '}
        <code>{'<button>'}</code> elements in your dropdowns instead of just{' '}
        <code>{'<a>'}</code>
        s.
      </p>
      <ReactPlayground codeText={DropdownItemTags} />

      <LinkedHeading h="2" id="menu-alignment">
        Menu alignment
      </LinkedHeading>
      <p>
        By default, a dropdown menu is aligned to the left, but you can switch
        it by passing the <code>alignRight</code> prop.
      </p>
      <ReactPlayground codeText={MenuAlignRight} />

      <LinkedHeading h="2" id="menu-headers">
        Menu headers
      </LinkedHeading>
      <p>Add a header to label sections of actions.</p>
      <ReactPlayground
        codeText={MenuHeaders}
        exampleClassName={styles.staticMenu}
      />

      <LinkedHeading h="2" id="menu-dividers">
        Menu dividers
      </LinkedHeading>
      <p>Separate groups of related menu items with a divider.</p>
      <ReactPlayground
        codeText={MenuDividers}
        exampleClassName={styles.staticMenu}
      />
      <LinkedHeading h="2" id="dropdowns-custom">
        Customization
      </LinkedHeading>
      <p>
        If the default handling of the dropdown menu and toggle components
        aren't to your liking, you can customize them, by using the more basic{' '}
        <code>Dropdown</code> Component to explicitly specify the Toggle and
        Menu components
      </p>
      <ReactPlayground
        codeText={DropdownButtonCustom}
        exampleClassName={styles.customMenu}
      />
      <LinkedHeading h="3" id="dropdowns-custom-components">
        Custom Dropdown Components
      </LinkedHeading>
      <p>
        For those that want to customize everything, you can forgo the included
        Toggle and Menu components, and create your own. By providing custom
        components to the <code>as</code> prop, you can control how each
        component behaves. Custom toggle and menu components{' '}
        <strong>must</strong> be able to accept refs.
      </p>

      <ReactPlayground codeText={DropdownButtonCustomMenu} />

      <LinkedHeading h="2" id="dropdowns-api">
        API
      </LinkedHeading>

      <ComponentApi metadata={data.DropdownButton} />

      <ComponentApi metadata={data.SplitButton} />

      <ComponentApi metadata={data.Dropdown} />

      <ComponentApi metadata={data.DropdownToggle} exportedBy={data.Dropdown} />

      <ComponentApi metadata={data.DropdownMenu} exportedBy={data.Dropdown} />

      <ComponentApi metadata={data.DropdownItem} exportedBy={data.Dropdown} />
      <ComponentApi metadata={data.DropdownHeader} exportedBy={data.Dropdown} />
      <ComponentApi
        metadata={data.DropdownDivider}
        exportedBy={data.Dropdown}
      />
    </>
  );
});

export const query = graphql`
  query DropdownQuery {
    DropdownButton: componentMetadata(displayName: { eq: "DropdownButton" }) {
      displayName
      ...ComponentApi_metadata
    }
    SplitButton: componentMetadata(displayName: { eq: "SplitButton" }) {
      displayName
      ...ComponentApi_metadata
    }
    Dropdown: componentMetadata(displayName: { eq: "Dropdown" }) {
      displayName
      ...ComponentApi_metadata
    }
    DropdownToggle: componentMetadata(displayName: { eq: "DropdownToggle" }) {
      displayName
      ...ComponentApi_metadata
    }
    DropdownMenu: componentMetadata(displayName: { eq: "DropdownMenu" }) {
      displayName
      ...ComponentApi_metadata
    }
    DropdownItem: componentMetadata(displayName: { eq: "DropdownItem" }) {
      displayName
      ...ComponentApi_metadata
    }
    DropdownHeader: componentMetadata(displayName: { eq: "DropdownHeader" }) {
      displayName
      ...ComponentApi_metadata
    }
    DropdownDivider: componentMetadata(displayName: { eq: "DropdownDivider" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`;
