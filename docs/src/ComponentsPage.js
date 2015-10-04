/* eslint react/no-did-mount-set-state: 0 */

import React from 'react';
import getOffset from 'dom-helpers/query/offset';
import css from 'dom-helpers/style';

import Affix from '../../src/Affix';
import Nav from '../../src/Nav';
import SubNav from '../../src/SubNav';
import NavItem from '../../src/NavItem';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PropTable from './PropTable';
import PageFooter from './PageFooter';
import ReactPlayground from './ReactPlayground';
import Samples from './Samples';
import Anchor from './Anchor';

const ComponentsPage = React.createClass({
  getInitialState() {
    return {
      activeNavItemHref: null,
      navOffsetTop: null
    };
  },

  handleNavItemSelect(key, href) {
    this.setState({
      activeNavItemHref: href
    });

    window.location = href;
  },

  componentDidMount() {
    let elem = React.findDOMNode(this.refs.sideNav);
    let sideNavOffsetTop = getOffset(elem).top;
    let sideNavMarginTop = parseInt(css(elem.firstChild, 'marginTop'), 10);
    let topNavHeight = React.findDOMNode(this.refs.topNav).offsetHeight;

    this.setState({
      navOffsetTop: sideNavOffsetTop - topNavHeight - sideNavMarginTop,
      navOffsetBottom: React.findDOMNode(this.refs.footer).offsetHeight
    });
  },

  render() {
    return (
        <div>
          <NavMain activePage="components" ref="topNav" />

          <PageHeader
            title="Components"
            subTitle="" />

          <div className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">


                {/* Buttons */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="buttons">Buttons</Anchor> <small>Button</small></h1>
                  <h2><Anchor id="buttons-options">Options</Anchor></h2>
                  <p>Use any of the available button style types to quickly create a styled button. Just modify the <code>bsStyle</code> prop.</p>
                  <ReactPlayground codeText={Samples.ButtonTypes} />
                  <div className="bs-callout bs-callout-warning">
                    <h4>Button spacing</h4>
                    <p>Because React doesn"t output newlines between elements, buttons on the same line are displayed
                    flush against each other. To preserve the spacing between multiple inline buttons, wrap your
                    button group in <code>{"<ButtonToolbar />"}</code>.</p>
                  </div>

                  <h2><Anchor id="buttons-sizes">Sizes</Anchor></h2>
                  <p>Fancy larger or smaller buttons? Add <code>bsSize="large"</code>, <code>bsSize="small"</code>, or <code>bsSize="xsmall"</code> for additional sizes.</p>
                  <ReactPlayground codeText={Samples.ButtonSizes} />

                  <p>Create block level buttons—those that span the full width of a parent— by adding the <code>block</code> prop.</p>
                  <ReactPlayground codeText={Samples.ButtonBlock} />

                  <h2><Anchor id="buttons-active">Active state</Anchor></h2>
                  <p>To set a buttons active state simply set the components <code>active</code> prop.</p>
                  <ReactPlayground codeText={Samples.ButtonActive} />

                  <h2><Anchor id="buttons-disabled">Disabled state</Anchor></h2>
                  <p>Make buttons look unclickable by fading them back 50%. To do this add the <code>disabled</code> attribute to buttons.</p>
                  <ReactPlayground codeText={Samples.ButtonDisabled} />

                  <div className="bs-callout bs-callout-warning">
                    <h4>Event handler functionality not impacted</h4>
                    <p>This prop will only change the <code>{"<Button />"}</code>&#8217;s appearance, not its
                      functionality. Use custom logic to disable the effect of the <code>onClick</code> handlers.</p>
                  </div>

                  <h2><Anchor id="buttons-tags">Button tags</Anchor></h2>
                  <p>The DOM element tag is choosen automatically for you based on the props you supply. Passing
                    a <code>href</code> will result in the button using a <code>{"<a />"}</code> element otherwise
                    a <code>{"<button />"}</code> element will be used.</p>
                  <ReactPlayground codeText={Samples.ButtonTagTypes} />

                  <h2><Anchor id="buttons-loading">Button loading state</Anchor></h2>
                  <p>When activating an asynchronous action from a button it is a good UX pattern to give the user
                    feedback as to the loading state, this can easily be done by updating
                    your <code>{"<Button />"}</code>&#8217;s props from a state change like below.</p>
                  <ReactPlayground codeText={Samples.ButtonLoading} />

                  <h3><Anchor id="buttons-props">Props</Anchor></h3>
                  <PropTable component="Button"/>

                </div>

                {/* Button Groups */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="btn-groups">Button groups</Anchor> <small>ButtonGroup, ButtonToolbar</small></h1>
                  <p className="lead">Group a series of buttons together on a single line with the button group.</p>

                  <h3><Anchor id="btn-groups-single">Basic example</Anchor></h3>
                  <p>Wrap a series of <code>{"<Button />"}</code>s in a <code>{"<ButtonGroup />"}</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupBasic} />

                  <h3><Anchor id="btn-groups-toolbar">Button toolbar</Anchor></h3>
                  <p>Combine sets of <code>{"<ButtonGroup />"}</code>s into a <code>{"<ButtonToolbar />"}</code> for more complex components.</p>
                  <ReactPlayground codeText={Samples.ButtonToolbarBasic} />

                  <h3><Anchor id="btn-groups-sizing">Sizing</Anchor></h3>
                  <p>Instead of applying button sizing props to every button in a group, just add <code>bsSize</code> prop to the <code>{"<ButtonGroup />"}</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupSizes} />

                  <h3><Anchor id="btn-groups-nested">Nesting</Anchor></h3>
                  <p>You can place other button types within the <code>{"<ButtonGroup />"}</code> like <code>{"<DropdownButton />"}</code>s.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupNested} />

                  <h3><Anchor id="btn-groups-vertical">Vertical variation</Anchor></h3>
                  <p>Make a set of buttons appear vertically stacked rather than horizontally. <strong
                    className="text-danger">Split button dropdowns are not supported here.</strong></p>
                  <p>Just add <code>vertical</code> to the <code>{"<ButtonGroup />"}</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupVertical} />
                  <br />
                  <p>Moreover, you can have buttons be block level elements so they take the full width of their container, just add <code>block</code> to the <code>{"<ButtonGroup />"}</code>, in addition to the <code>vertical</code> you just added.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupBlock} />

                  <h3><Anchor id="btn-groups-justified">Justified button groups</Anchor></h3>
                  <p>Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.</p>
                  <div className="bs-callout bs-callout-warning">
                    <h4>Style issues</h4>
                    <p>There are some issues and workarounds required when using this property, please see <a href="http://getbootstrap.com/components/#btn-groups-justified">bootstrap&#8217;s button group docs</a> for more specifics.</p>
                  </div>
                  <p>Just add <code>justified</code> to the <code>{"<ButtonGroup />"}</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupJustified} />

                  <h3><Anchor id="btn-groups-props">Props</Anchor></h3>
                  <PropTable component="ButtonGroup"/>
                </div>

                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="btn-dropdowns">Button dropdowns</Anchor></h1>
                  <p className="lead">Use <code>{"<DropdownButton />"}</code> or <code>{"<SplitButton />"}</code> components to display a button with a dropdown menu.</p>

                  <h3><Anchor id="btn-dropdowns-single">Single button dropdowns</Anchor></h3>
                  <p>Create a dropdown button with the <code>{"<DropdownButton />"}</code> component.</p>
                  <ReactPlayground codeText={Samples.DropdownButtonBasic} />

                  <h3><Anchor id="btn-dropdowns-split">Split button dropdowns</Anchor></h3>
                  <p>Similarly, create split button dropdowns with the <code>{"<SplitButton />"}</code> component.</p>
                  <ReactPlayground codeText={Samples.SplitButtonBasic} />

                  <h3><Anchor id="btn-dropdowns-sizing">Sizing</Anchor></h3>
                  <p>Button dropdowns work with buttons of all sizes.</p>
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
                    If the default handling of the dropdown menu and toggle components aren"t to your liking, you can
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
                    For those that want to customize everything, you can forgo the included Toggle and Menu components,
                    and create your own. In order to tell the Dropdown component what role your custom components play
                    add a special prop <code>bsRole</code> to your menu or toggle components. The Dropdown expects
                    at least one component with <code>bsRole="toggle"</code> and exactly one with <code>bsRole="menu"</code>.
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

                {/* Menu Item */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="menu-item">Menu Item</Anchor> <small> MenuItem</small></h1>
                  <p>This is a component used in other components (see <a href="buttons">Buttons</a>, <a href="#navbars">Navbars</a>).</p>
                  <p>It supports the basic anchor properties <code>href</code>, <code>target</code>, <code>title</code>.</p>
                  <p>It also supports different properties of the normal Bootstrap MenuItem.
                    <ul>
                      <li><code>header</code>: To add a header label to sections</li>
                      <li><code>divider</code>: Adds an horizontal divider between sections</li>
                      <li><code>disabled</code>: shows the item as disabled, and prevents the onclick</li>
                      <li><code>eventKey</code>: passed to the callback</li>
                      <li><code>onSelect</code>: a callback that is called when the user clicks the item.</li>
                    </ul>
                  <p>The callback is called with the following arguments: <code>eventKey</code>, <code>href</code> and <code>target</code></p>
                  </p>
                  <ReactPlayground codeText={Samples.MenuItem} />

                  <h3><Anchor id="menu-item-props">Props</Anchor></h3>
                  <PropTable component="MenuItem"/>
                </div>

              {/* Panels */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="panels">Panels</Anchor> <small>Panel, PanelGroup, Accordion</small></h1>

                  <h3><Anchor id="panels-basic">Basic example</Anchor></h3>
                  <p>By default, all the <code>&lt;Panel /&gt;</code> does is apply some basic border and padding to contain some content.</p>
                  <p>You can pass on any additional properties you need, e.g. a custom <code>onClick</code> handler, as it is shown in the example code. They all will apply to the wrapper <code>div</code> element.</p>
                  <ReactPlayground codeText={Samples.PanelBasic} />

                  <h3><Anchor id="panels-collapsible">Collapsible Panel</Anchor></h3>
                  <ReactPlayground codeText={Samples.PanelCollapsible} />

                  <h3><Anchor id="panels-heading">Panel with heading</Anchor></h3>
                  <p>Easily add a heading container to your panel with the <code>header</code> prop.</p>
                  <ReactPlayground codeText={Samples.PanelWithHeading} />

                  <h3><Anchor id="panels-footer">Panel with footer</Anchor></h3>
                  <p>Pass buttons or secondary text in the <code>footer</code> prop. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground.</p>
                  <ReactPlayground codeText={Samples.PanelWithFooter} />

                  <h3><Anchor id="panels-contextual">Contextual alternatives</Anchor></h3>
                  <p>Like other components, easily make a panel more meaningful to a particular context by adding a <code>bsStyle</code> prop.</p>
                  <ReactPlayground codeText={Samples.PanelContextual} />

                  <h3><Anchor id="panels-tables">With tables and list groups</Anchor></h3>
                  <p>Add the <code>fill</code> prop to <code>&lt;Table /&gt;</code> or <code>&lt;ListGroup /&gt;</code> elements to make them fill the panel.</p>
                  <ReactPlayground codeText={Samples.PanelListGroupFill} />

                  <h3><Anchor id="panels-controlled">Controlled PanelGroups</Anchor></h3>
                  <p><code>PanelGroup</code>s can be controlled by a parent component. The <code>activeKey</code> prop dictates which panel is open.</p>
                  <ReactPlayground codeText={Samples.PanelGroupControlled} />

                  <h3><Anchor id="panels-uncontrolled">Uncontrolled PanelGroups</Anchor></h3>
                  <p><code>PanelGroup</code>s can also be uncontrolled where they manage their own state. The <code>defaultActiveKey</code> prop dictates which panel is open when initially.</p>
                  <ReactPlayground codeText={Samples.PanelGroupUncontrolled} />

                  <h3><Anchor id="panels-accordion">Accordions</Anchor></h3>
                  <p><code>&lt;Accordion /&gt;</code> aliases <code>&lt;PanelGroup accordion /&gt;</code>.</p>
                  <ReactPlayground codeText={Samples.PanelGroupAccordion} />

                  <h3><Anchor id="panels-props">Props</Anchor></h3>

                  <h4><Anchor id="panels-props-accordion">Panels, Accordion</Anchor></h4>
                  <PropTable component="Panel"/>

                  <h4><Anchor id="panels-props-group">PanelGroup</Anchor></h4>
                  <PropTable component="PanelGroup"/>

                </div>

                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="modals">Modals</Anchor> <small>Modal</small></h1>

                  <h3><Anchor id="modals-static">Static Markup</Anchor></h3>
                  <p>A modal dialog component</p>
                  <ReactPlayground codeText={Samples.ModalStatic} />

                  <h3><Anchor id="modals-live">Basic example</Anchor></h3>
                  <p></p>
                  <p>
                    A modal with header, body, and set of actions in the footer. Use <code>{"<Modal/>"}</code> in combination with other components to
                    show or hide your Modal. The <code>{"<Modal/>"}</code> Component comes with
                    a few convenient "sub components": <code>{"<Modal.Header/>"}</code>, <code>{"<Modal.Title/>"}</code>, <code>{"<Modal.Body/>"}</code>,
                    and <code>{"<Modal.Footer/>"}</code>, which you can use to build the Modal content.
                  </p>
                  <ReactPlayground codeText={Samples.Modal} />
                  <div className="bs-callout bs-callout-info">
                    <h4>Additional Import Options</h4>
                    <p>
                      The Modal Header, Title, Body, and Footer components are available as static properties the <code>{"<Modal/>"}</code> component, but you can also,
                      import them directly from the <code>/lib</code> directory like: <code>{'require("react-bootstrap/lib/ModalHeader")'}</code>.
                    </p>
                  </div>

                  <h3><Anchor id="modals-contained">Contained Modal</Anchor></h3>
                  <p>You will need to add the following css to your project and ensure that your container has the <code>modal-container</code> class.</p>
                  <pre>
                    {React.DOM.code(null,
                      '.modal-container {\n' +
                      '  position: relative;\n' +
                      '}\n' +
                      '.modal-container .modal, .modal-container .modal-backdrop {\n' +
                      '  position: absolute;\n' +
                      '}\n'
                    )}
                  </pre>
                  <ReactPlayground codeText={Samples.ModalContained} />

                  <h3><Anchor id="modal-default-sizing">Sizing modals using standard Bootstrap props</Anchor></h3>
                  <p>You can specify a bootstrap large or small modal by using the "bsSize" prop.</p>
                  <ReactPlayground codeText={Samples.ModalDefaultSizing} />

                  <h3><Anchor id="modal-custom-sizing">Sizing modals using custom CSS</Anchor></h3>
                  <p>You can apply custom css to the modal dialog div using the "dialogClassName" prop. Example is using a custom css class with width set to 90%.</p>
                  <ReactPlayground codeText={Samples.ModalCustomSizing} />

                  <h3><Anchor id="modals-props">Props</Anchor></h3>

                  <h4><Anchor id="modals-props-modal">Modal</Anchor></h4>
                  <PropTable component="Modal"/>

                  <h4><Anchor id="modals-props-modal-header">Modal.Header</Anchor></h4>
                  <PropTable component="ModalHeader"/>

                  <h4><Anchor id="modals-props-modal-title">Modal.Title</Anchor></h4>
                  <PropTable component="ModalTitle"/>

                  <h4><Anchor id="modals-props-modal-body">Modal.Body</Anchor></h4>
                  <PropTable component="ModalBody"/>

                  <h4><Anchor id="modals-props-modal-footer">Modal.Footer</Anchor></h4>
                  <PropTable component="ModalFooter"/>
                </div>


                {/* Tooltip */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="tooltips">Tooltip</Anchor></h1>
                  <p>
                    Tooltip component for a more stylish alternative to that anchor tag <code>title</code> attribute.
                  </p>
                  <ReactPlayground codeText={Samples.TooltipBasic} exampleClassName="tooltip-static"/>

                  <h4><Anchor id="tooltips-overlay-trigger">With OverlayTrigger</Anchor></h4>
                  <p>Attach and position tooltips with <code>OverlayTrigger</code>.</p>
                  <ReactPlayground codeText={Samples.TooltipPositioned} />

                  <h4><Anchor id="tooltips-in-text">In text copy</Anchor></h4>
                  <p>Positioned tooltip in text copy.</p>
                  <ReactPlayground codeText={Samples.TooltipInCopy} />

                  <h3><Anchor id="tooltips-props">Props</Anchor></h3>

                  <h4><Anchor id="overlays-trigger-props">Overlay Trigger</Anchor></h4>
                  <PropTable component="OverlayTrigger"/>

                  <h4><Anchor id="tooltips-props-tooltip">Tooltip</Anchor></h4>
                  <PropTable component="Tooltip"/>
                </div>

                {/* Popover */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="popovers">Popovers</Anchor></h1>

                  <p>
                    The Popover, offers a more robust alternative to the Tooltip for displaying overlays of content.
                  </p>
                  <ReactPlayground codeText={Samples.PopoverBasic}/>

                  <h4><Anchor id="popovers-overlay-trigger">With OverlayTrigger</Anchor></h4>
                  <p>The Popover component, like the Tooltip can be used with an <code>OverlayTrigger</code> Component, and positioned around it.</p>
                  <ReactPlayground codeText={Samples.PopoverPositioned} />

                  <h4><Anchor id="popovers-trigger-behaviors">Trigger behaviors</Anchor></h4>
                  <p>It"s inadvisable to use <code>"hover"</code> or <code>"focus"</code> triggers for popovers, because they have poor accessibility from keyboard and on mobile devices.</p>
                  <ReactPlayground codeText={Samples.PopoverTriggerBehaviors} />

                  <h4><Anchor id="popovers-in-container">Popover component in container</Anchor></h4>
                  <ReactPlayground codeText={Samples.PopoverContained} exampleClassName="bs-example-popover-contained" />

                  <h4><Anchor id="popovers-positioned-scrolling">Positioned popover components in scrolling container</Anchor></h4>
                  <ReactPlayground codeText={Samples.PopoverPositionedScrolling} exampleClassName="bs-example-popover-scroll" />

                  <h3><Anchor id="popover-props">Props</Anchor></h3>
                  <PropTable component="Popover"/>
                </div>

                {/* Overlay */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="overlays">Overlay</Anchor></h1>

                  <p>
                    The <code>OverlayTrigger</code> component is great for most use cases, but as a higher level abstraction it can lack the flexibility needed
                    to build more nuanced or custom behaviors into your Overlay components. For these cases it can be helpful to forgo the trigger and use
                    the <code>Overlay</code> component directly.
                  </p>
                  <ReactPlayground codeText={Samples.Overlay}/>

                  <h4><Anchor id="overlays-overlay">Use Overlay instead of Tooltip and Popover</Anchor></h4>
                  <p>
                    You don"t need to use the provided <code>Tooltip</code> or <code>Popover</code> components. Creating custom overlays
                    is as easy as wrapping some markup in an <code>Overlay</code> component
                  </p>
                  <ReactPlayground codeText={Samples.OverlayCustom} />

                  <h3><Anchor id="overlays-props">Props</Anchor></h3>
                  <PropTable component="Overlay"/>
                </div>

                {/* Progress Bar */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="progress">Progress bars</Anchor> <small>ProgressBar</small></h1>

                  <p className="lead">Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.</p>

                  <h2><Anchor id="progress-basic">Basic example</Anchor></h2>
                  <p>Default progress bar.</p>
                  <ReactPlayground codeText={Samples.ProgressBarBasic} />

                  <h2><Anchor id="progress-label">With label</Anchor></h2>
                  <p>Add a <code>label</code> prop to show a visible percentage. For low percentages, consider adding a min-width to ensure the label"s text is fully visible.</p>
                  <p>The following keys are interpolated with the current values: <code>%(min)s</code>, <code>%(max)s</code>, <code>%(now)s</code>, <code>%(percent)s</code>, <code>%(bsStyle)s</code></p>
                  <ReactPlayground codeText={Samples.ProgressBarWithLabel} />

                  <h2><Anchor id="progress-screenreader-label">Screenreader only label</Anchor></h2>
                  <p>Add a <code>srOnly</code> prop to hide the label visually.</p>
                  <ReactPlayground codeText={Samples.ProgressBarScreenreaderLabel} />

                  <h2><Anchor id="progress-contextual">Contextual alternatives</Anchor></h2>
                  <p>Progress bars use some of the same button and alert classes for consistent styles.</p>
                  <ReactPlayground codeText={Samples.ProgressBarContextual} />

                  <h2><Anchor id="progress-striped">Striped</Anchor></h2>
                  <p>Uses a gradient to create a striped effect. Not available in IE8.</p>
                  <ReactPlayground codeText={Samples.ProgressBarStriped} />

                  <h2><Anchor id="progress-animated">Animated</Anchor></h2>
                  <p>Add <code>active</code> prop to animate the stripes right to left. Not available in IE9 and below.</p>
                  <ReactPlayground codeText={Samples.ProgressBarAnimated} />

                  <h2><Anchor id="progress-stacked">Stacked</Anchor></h2>
                  <p>Nest <code>&lt;ProgressBar /&gt;</code>s to stack them.</p>
                  <ReactPlayground codeText={Samples.ProgressBarStacked} />

                  <h3><Anchor id="progress-props">ProgressBar</Anchor></h3>
                  <PropTable component="ProgressBar"/>
                </div>

                {/* Nav */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="navs">Navs</Anchor> <small>Nav, NavItem</small></h1>

                  <p>Navs come in two styles, <code>pills</code> and <code>tabs</code>. Disable a tab by adding <code>disabled</code>.</p>
                  <ReactPlayground codeText={Samples.NavBasic} />

                  <h3><Anchor id="navs-dropdown">Dropdown</Anchor></h3>
                  <p>Add dropdowns using the <code>NavDropdown</code> component.</p>
                  <ReactPlayground codeText={Samples.NavDropdown} />

                  <h3><Anchor id="navs-stacked">Stacked</Anchor></h3>
                  <p>They can also be <code>stacked</code> vertically.</p>
                  <ReactPlayground codeText={Samples.NavStacked} />

                  <h3><Anchor id="navs-justified">Justified</Anchor></h3>
                  <p>They can be <code>justified</code> to take the full width of their parent.</p>
                  <ReactPlayground codeText={Samples.NavJustified} />

                  <h3><Anchor id="navs-props">Props</Anchor></h3>

                  <h4><Anchor id="navs-props-nav">Nav</Anchor></h4>
                  <PropTable component="Nav"/>

                  <h4><Anchor id="navs-props-navitem">NavItem</Anchor></h4>
                  <PropTable component="NavItem"/>

                </div>

                {/* Navbar */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="navbars">Navbars</Anchor> <small>Navbar, NavBrand, Nav, NavItem</small></h1>

                  <p>Navbars are by default accessible and will provide <code>role="navigation"</code>.</p>
                  <p>They also supports all the different Bootstrap classes as properties. Just camelCase the css class and remove navbar from it. For example <code>navbar-fixed-top</code> becomes the property <code>fixedTop</code>. The different properties are <code>fixedTop</code>, <code>fixedBottom</code>, <code>staticTop</code>, <code>inverse</code>, <code>fluid</code>.</p>
                  <p>You can drag elements to the right by specifying the <code>right</code> property on a nav group.</p>

                  <h3><Anchor id="navbars-basic">Navbar Basic Example</Anchor></h3>
                  <ReactPlayground codeText={Samples.NavbarBasic} />

                  <h3><Anchor id="navbars-brand">Navbar Brand Example</Anchor></h3>
                  <p>You can specify a brand by passing a <code>NavBrand</code> component as a child to the <code>Navbar</code> component.</p>
                  <p><code>NavBrand</code> accepts either string or a renderable component as a child.</p>
                  <p><em>Note: <code>brand</code> attribute of <code>Navbar</code> component has been deprecated. Use <code>NavBrand</code> component instead.</em></p>
                  <ReactPlayground codeText={Samples.NavbarBrand} />

                  <h3><Anchor id="navbars-mobile-friendly">Mobile Friendly</Anchor></h3>
                  <p>To have a mobile friendly Navbar, specify the property <code>toggleNavKey</code> on the Navbar with a value corresponding to an <code>eventKey</code> of one of his <code>Nav</code> children. This child will be the one collapsed.</p>
                  <p>By setting the property {React.DOM.code(null, 'defaultNavExpanded')} the Navbar will start expanded by default.</p>
                  <div className="bs-callout bs-callout-info">
                    <h4>Scrollbar overflow</h4>
                    <p>The height of the collapsible is slightly smaller than the real height. To hide the scroll bar, add the following css to your style files.</p>
                    <pre>
                      {React.DOM.code(null,
                        '.navbar-collapse {\n' +
                        '  overflow: hidden;\n' +
                        '}\n'
                      )}
                    </pre>
                  </div>
                  <ReactPlayground codeText={Samples.NavbarCollapsible} />

                  <h3><Anchor id="navbars-mobile-friendly-multiple">Mobile Friendly (Multiple Nav Components)</Anchor></h3>
                  <p>To have a mobile friendly Navbar that handles multiple <code>Nav</code> components use <code>CollapsibleNav</code>. The <code>toggleNavKey</code> must still be set, however, the corresponding <code>eventKey</code> must now be on the <code>CollapsibleNav</code> component.</p>
                  <div className="bs-callout bs-callout-info">
                    <h4>Div collapse</h4>
                    <p>The <code>navbar-collapse</code> div gets created as the collapsible element which follows the <a href="http://getbootstrap.com/components/#navbar-default">bootstrap</a> collapsible navbar documentation.</p>
                    <pre>&lt;div class="collapse navbar-collapse"&gt;&lt;/div&gt;</pre>
                  </div>
                  <ReactPlayground codeText={Samples.CollapsibleNav} />

                  <h3><Anchor id="navbar-props">Props</Anchor></h3>
                  <PropTable component="Navbar"/>
                </div>

                {/* Breadcrumb */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="breadcrumbs">Breadcrumbs</Anchor> <small>Breadcrumb, BreadcrumbItems</small></h1>
                  <p>Breadcrumbs are used to indicate the current page's location. Add <code>active</code> attribute to active <code>BreadcrumbItem</code>.</p>
                  <p>Do not set both <code>active</code> and <code>href</code> attributes. <code>active</code> overrides <code>href</code> and <code>span</code> element is rendered instead of <code>a</code>.</p>

                  <h3><Anchor id="breadcrumbs-example">Breadcrumbs Example</Anchor></h3>
                  <ReactPlayground codeText={Samples.Breadcrumb} />

                  <h3><Anchor id="breadcrumbs-props">Props</Anchor></h3>
                  <p><code>Breadcrumb</code> component itself doesn't have any specific public properties</p>

                  <h4><Anchor id="breadcrumbs-props-breadcrumbItem">BreadcrumbItem</Anchor></h4>
                  <PropTable component="BreadcrumbItem"/>
                </div>

                {/* Tabbed Areas */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="tabs">Togglable tabs</Anchor> <small>Tabs, Tab</small></h1>

                  <p>Add quick, dynamic tab functionality to transition through panes of local content.</p>

                  <h3><Anchor id="tabs-uncontrolled">Uncontrolled</Anchor></h3>
                  <p>Allow the component to control its own state.</p>
                  <ReactPlayground codeText={Samples.TabsUncontrolled} exampleClassName="bs-example-tabs" />

                  <h3><Anchor id="tabs-controlled">Controlled</Anchor></h3>
                  <p>Pass down the active state on render via props.</p>
                  <ReactPlayground codeText={Samples.TabsControlled} exampleClassName="bs-example-tabs" />

                  <h3><Anchor id="tabs-no-animation">No animation</Anchor></h3>
                  <p>Set the <code>animation</code> prop to <code>false</code></p>
                  <ReactPlayground codeText={Samples.TabsNoAnimation} exampleClassName="bs-example-tabs" />

                  <h3><Anchor id="left-tabs">Left tabs</Anchor></h3>
                  <p>Set <code>position</code> to <code>"left"</code>. Optionally, <code>tabWidth</code> can be passed the number of columns for the tabs.</p>
                  <ReactPlayground codeText={Samples.LeftTabs} exampleClassName="bs-example-tabs" />

                  <h3><Anchor id="tabs-props">Props</Anchor></h3>

                  <h4><Anchor id="tabs-props-area">Tabs</Anchor></h4>
                  <PropTable component="Tabs"/>

                  <h4><Anchor id="tabs-props-pane">Tab</Anchor></h4>
                  <PropTable component="Tab"/>
                </div>

                {/* Pager */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="pager">Pager</Anchor> <small>Pager, PageItem</small></h1>
                  <p>Quick previous and next links.</p>

                  <h3><Anchor id="pager-default">Centers by default</Anchor></h3>
                  <ReactPlayground codeText={Samples.PagerDefault} />

                  <h3><Anchor id="pager-aligned">Aligned</Anchor></h3>
                  <p>Set the <code>previous</code> or <code>next</code> prop to <code>true</code>, to align left or right.</p>
                  <ReactPlayground codeText={Samples.PagerAligned} />

                  <h3><Anchor id="pager-disabled">Disabled</Anchor></h3>
                  <p>Set the <code>disabled</code> prop to <code>true</code> to disable the link.</p>
                  <ReactPlayground codeText={Samples.PagerDisabled} />

                  <h3><Anchor id="pager-props">Props</Anchor></h3>

                  <h4><Anchor id="pager-props-pager">Pager</Anchor></h4>
                  <PropTable component="Pager"/>

                  <h4><Anchor id="pager-props-pageitem">PageItem</Anchor></h4>
                  <PropTable component="PageItem"/>
                </div>

                {/* Pagination */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="pagination">Pagination</Anchor> <small>Pagination</small></h1>

                  <p>Provide pagination links for your site or app with the multi-page pagination component. Set <code>items</code> to the number of pages. <code>activePage</code> prop dictates which page is active</p>
                  <ReactPlayground codeText={Samples.PaginationBasic} />

                  <h4><Anchor id="pagination-more">More options</Anchor></h4>
                  <p>such as <code>first</code>, <code>last</code>, <code>previous</code>, <code>next</code> and <code>ellipsis</code>.</p>
                  <ReactPlayground codeText={Samples.PaginationAdvanced} />

                  <h3><Anchor id="pagination-props">Props</Anchor></h3>
                  <PropTable component="Pagination"/>
                </div>

                {/* Alerts */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="alerts">Alert messages</Anchor> <small>Alert</small></h1>

                  <p>Basic alert styles.</p>
                  <ReactPlayground codeText={Samples.AlertBasic} />

                  <h4><Anchor id="alerts-closeable">Closeable alerts</Anchor></h4>
                  <p>just pass in a <code>onDismiss</code> function.</p>
                  <ReactPlayground codeText={Samples.AlertDismissable} />

                  <div className="bs-callout bs-callout-info">
                    <h4>Screen Reader Accessibility</h4>
                  <p>Unlike regular Bootstrap, alerts have an sr-only dismiss button after the content.</p>
                  </div>

                  <h4><Anchor id="alerts-auto-closeable">Auto closeable</Anchor></h4>
                  <p>Auto close after a set time with <code>dismissAfter</code> prop.</p>
                  <ReactPlayground codeText={Samples.AlertAutoDismissable} />

                  <h3><Anchor id="alert-props">Props</Anchor></h3>
                  <PropTable component="Alert"/>
                </div>

                {/* Carousels */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="carousels">Carousels</Anchor> <small>Carousel, CarouselItem</small></h1>

                  <h3><Anchor id="carousels-uncontrolled">Uncontrolled</Anchor></h3>
                  <p>Allow the component to control its own state.</p>
                  <ReactPlayground codeText={Samples.CarouselUncontrolled} exampleClassName="bs-example-tabs" />

                  <h3><Anchor id="carousels-controlled">Controlled</Anchor></h3>
                  <p>Pass down the active state on render via props.</p>
                  <ReactPlayground codeText={Samples.CarouselControlled} exampleClassName="bs-example-tabs" />

                  <h3><Anchor id="carousels-props">Props</Anchor></h3>

                  <h4><Anchor id="carousels-props-carousel">Carousel</Anchor></h4>
                  <PropTable component="Carousel"/>

                  <h4><Anchor id="carousels-props-item">CarouselItem</Anchor></h4>
                  <PropTable component="CarouselItem"/>
                </div>

                {/* Grids */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="grids">Grids</Anchor> <small>Grid, Row, Col</small></h1>

                  <ReactPlayground codeText={Samples.GridBasic} exampleClassName="bs-example-tabs" />

                  <h3><Anchor id="grids-props">Props</Anchor></h3>

                  <h4><Anchor id="grids-props-grid">Grid</Anchor></h4>
                  <PropTable component="Grid"/>

                  <h4><Anchor id="grids-props-row">Row</Anchor></h4>
                  <PropTable component="Row"/>

                  <h4><Anchor id="grids-props-col">Col</Anchor></h4>
                  <PropTable component="Col"/>
                </div>

                {/* Images */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="images">Images</Anchor></h1>

                  <h3><Anchor id="image-shape">Shape</Anchor></h3>
                  <p>Use the <code>rounded</code>, <code>circle</code> and <code>thumbnail</code> props to customise the image.</p>
                  <ReactPlayground codeText={Samples.ImageShape} />

                  <h3><Anchor id="image-responsive">Responsive</Anchor></h3>
                  <p>Use the <code>responsive</code> to scale image nicely to the parent element.</p>
                  <ReactPlayground codeText={Samples.ImageResponsive} />

                  <h3><Anchor id="image-props">Props</Anchor></h3>
                  <PropTable component="Image"/>
                </div>

                {/* Thumbnail */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="thumbnail">Thumbnail</Anchor></h1>

                  <p>Thumbnails are designed to showcase linked images with minimal required markup. You can extend the grid component with thumbnails.</p>

                  <h3><Anchor id="thumbnail-anchor">Anchor Thumbnail</Anchor></h3>
                  <p>Creates an anchor wrapping an image.</p>
                  <ReactPlayground codeText={Samples.ThumbnailAnchor} />

                  <h3><Anchor id="thumbnail-divider">Divider Thumbnail</Anchor></h3>
                  <p>Creates a divider wrapping an image and other children elements.</p>
                  <ReactPlayground codeText={Samples.ThumbnailDiv} />

                  <h3><Anchor id="thumbnail-props">Props</Anchor></h3>
                  <PropTable component="Thumbnail"/>
                </div>

                {/* ListGroup */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="listgroup">List group</Anchor> <small>ListGroup, ListGroupItem</small></h1>
                  <p>Quick previous and next links.</p>

                  <h3><Anchor id="listgroup-default">Centers by default</Anchor></h3>
                  <ReactPlayground codeText={Samples.ListGroupDefault} />

                  <h3><Anchor id="listgroup-linked">Linked</Anchor></h3>
                  <p>Set the <code>href</code> or <code>onClick</code> prop on <code>ListGroupItem</code>, to create a linked or clickable element.</p>
                  <ReactPlayground codeText={Samples.ListGroupLinked} />

                  <h3><Anchor id="listgroup-styling-state">Styling by state</Anchor></h3>
                  <p>Set the <code>active</code> or <code>disabled</code> prop to <code>true</code> to mark or disable the item.</p>
                  <ReactPlayground codeText={Samples.ListGroupActive} />

                  <h3><Anchor id="listgroup-styling-color">Styling by color</Anchor></h3>
                  <p>Set the <code>bsStyle</code> prop to style the item</p>
                  <ReactPlayground codeText={Samples.ListGroupStyle} />

                  <h3><Anchor id="listgroup-with-header">With header</Anchor></h3>
                  <p>Set the <code>header</code> prop to create a structured item, with a heading and a body area.</p>
                  <ReactPlayground codeText={Samples.ListGroupHeader} />

                  <h3><Anchor id="listgroup-with-custom-children">With custom component children</Anchor></h3>
                  <p>
                    When using ListGroupItems directly, ListGroup looks at whether the items have href
                    or onClick props to determine which DOM elements to emit. However, with custom item
                    components as children to <code>ListGroup</code>, set the
                    <code>componentClass</code> prop to specify which element <code>ListGroup</code> should output.
                  </p>
                  <ReactPlayground codeText={Samples.ListGroupCustom} />

                  <h3><Anchor id="listgroup-props">Props</Anchor></h3>

                  <h4><Anchor id="listgroup-props-group">ListGroup</Anchor></h4>
                  <PropTable component="ListGroup"/>

                  <h4><Anchor id="listgroup-props-item">ListGroupItem</Anchor></h4>
                  <PropTable component="ListGroupItem"/>
                </div>

                {/* Labels */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="labels">Labels</Anchor></h1>

                  <p>Create a <code>{"<Label>label</Label>"}</code> to highlight information</p>
                  <ReactPlayground codeText={Samples.Label} />

                  <h3><Anchor id="labels-variations">Available variations</Anchor></h3>
                  <p>Add any of the below mentioned modifier classes to change the appearance of a label.</p>
                  <ReactPlayground codeText={Samples.LabelVariations} />

                  <h3><Anchor id="label-props">Props</Anchor></h3>
                  <PropTable component="Label"/>
                </div>

                {/* Badges */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="badges">Badges</Anchor></h1>

                  <p>Easily highlight new or unread items by adding a <code>{"<Badge>"}</code> to links, Bootstrap navs, and more.</p>
                  <ReactPlayground codeText={Samples.Badge} />
                  <div className="bs-callout bs-callout-info">
                    <h4>Cross-browser compatibility</h4>
                    <p>Unlike regular Bootstrap badges self collapse even in Internet Explorer 8.</p>
                  </div>

                  <h3><Anchor id="badges-props">Props</Anchor></h3>
                  <PropTable component="Badge"/>
                </div>

                {/* Jumbotron */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="jumbotron">Jumbotron</Anchor></h1>

                  <p>A lightweight, flexible component that can optionally extend the entire viewport to showcase key content on your site.</p>
                  <ReactPlayground codeText={Samples.Jumbotron} />

                  <h3><Anchor id="jumbotron-props">Props</Anchor></h3>
                  <PropTable component="Jumbotron"/>
                </div>

                {/* Page Header */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="page-header">Page Header</Anchor></h1>

                  <p>A simple shell for an <code>h1</code> to appropriately space out and segment sections of content on a page. It can utilize the <code>h1</code>&#8217;s default <code>small</code> element, as well as most other components (with additional styles).</p>
                  <ReactPlayground codeText={Samples.PageHeader} />
                </div>

                {/* Responsive embed */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="responsive-embed">Responsive embed</Anchor></h1>

                  <p>Allow browsers to determine video or slideshow dimensions based on the width of their containing block by creating an intrinsic ratio that will properly scale on any device.</p>
                  <p>You don't need to include <code>frameborder="0"</code> in your <code>iframe</code>s.</p>
                  <p className="bg-warning">Either <b>16by9</b> or <b>4by3</b> aspect ratio via <code>a16by9</code> or <code>a4by3</code> attribute must be set.</p>
                  <ReactPlayground codeText={Samples.ResponsiveEmbed} />

                  <h3><Anchor id="responsive-embed-props">Props</Anchor></h3>
                  <PropTable component="ResponsiveEmbed"/>
                </div>

                {/* Wells */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="wells">Wells</Anchor></h1>

                  <p>Use the well as a simple effect on an element to give it an inset effect.</p>
                  <ReactPlayground codeText={Samples.Well} />

                  <h2><Anchor id="wells-optional">Optional classes</Anchor></h2>
                  <p>Control padding and rounded corners with two optional modifier classes.</p>
                  <ReactPlayground codeText={Samples.WellSizes} />

                  <h3><Anchor id="wells-props">Props</Anchor></h3>
                  <PropTable component="Well"/>
                </div>

                {/* Glyphicons */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="glyphicons">Glyphicons</Anchor></h1>

                  <p>Use them in buttons, button groups for a toolbar, navigation, or prepended form inputs.</p>
                  <ReactPlayground codeText={Samples.Glyphicon} />

                  <h3><Anchor id="glyphicons-props">Props</Anchor></h3>
                  <PropTable component="Glyphicon"/>
                </div>

                {/* Tables */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="tables">Tables</Anchor></h1>

                  <p>Use the <code>striped</code>, <code>bordered</code>, <code>condensed</code> and <code>hover</code> props to customise the table.</p>
                  <ReactPlayground codeText={Samples.TableBasic} />

                  <h2><Anchor id="table-responsive">Responsive</Anchor></h2>
                  <p>Add <code>responsive</code> prop to make them scroll horizontally up to small devices (under 768px). When viewing on anything larger than 768px wide, you will not see any difference in these tables.</p>
                  <ReactPlayground codeText={Samples.TableResponsive} />

                  <h3><Anchor id="table-props">Props</Anchor></h3>
                  <PropTable component="Table"/>
                </div>

                {/* Input */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="input">Input</Anchor></h1>

                  <p>Renders an input in bootstrap wrappers. Supports label, help, text input add-ons, validation and use as wrapper.
                  Use <code>getValue()</code> or <code>getChecked()</code> to get the current state.
                  The helper method <code>getInputDOMNode()</code> returns the internal input element. If you don"t want the <code>form-group</code> class applied apply the prop named <code>standalone</code>.</p>
                  <ReactPlayground codeText={Samples.Input} />

                  <h3><Anchor id="input-types">Types</Anchor></h3>
                  <p>Supports <code>select</code>, <code>textarea</code>, as well as standard HTML input types. <code>getValue()</code> returns an array for multiple select.</p>
                  <ReactPlayground codeText={Samples.InputTypes} />

                  <h3><Anchor id="input-static">FormControls.Static</Anchor></h3>
                  <p>Static text can be added to your form controls through the use of the <code>FormControls.Static</code> component.</p>
                  <ReactPlayground codeText={Samples.StaticText} />

                  <h3><Anchor id="button-input-types">Button Input Types</Anchor></h3>
                  <p>Form buttons are encapsulated by <code>ButtonInput</code>. Pass in <code>type="reset"</code> or <code>type="submit"</code> to suit your needs. Styling is the same as <code>Button</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonInput} />

                  <h3><Anchor id="input-addons">Add-ons</Anchor></h3>
                  <p>Use <code>addonBefore</code> and <code>addonAfter</code> for normal addons, <code>buttonBefore</code> and <code>buttonAfter</code> for button addons.
                  Exotic configurations may require some css on your side.</p>
                  <ReactPlayground codeText={Samples.InputAddons} />

                  <h3><Anchor id="input-sizes">Sizes</Anchor></h3>
                  <p>Use <code>bsSize</code> to change the size of inputs. It also works with addons and most other options.</p>
                  <ReactPlayground codeText={Samples.InputSizes} />

                  <h3><Anchor id="input-validation">Validation</Anchor></h3>
                  <p>Set <code>bsStyle</code> to one of <code>success</code>, <code>warning</code> or <code>error</code>.
                  Add <code>hasFeedback</code> to show glyphicon. Glyphicon may need additional styling if there is an add-on or no label.</p>
                  <ReactPlayground codeText={Samples.InputValidation} />

                  <h3><Anchor id="input-horizontal">Horizontal forms</Anchor></h3>
                  <p>Use <code>labelClassName</code> and <code>wrapperClassName</code> properties to add col classes manually.
                  <code>checkbox</code> and <code>radio</code> types need special treatment because label wraps input.</p>
                  <ReactPlayground codeText={Samples.InputHorizontal} />

                  <h3><Anchor id="input-wrapper">Use as a wrapper</Anchor></h3>
                  <p>If <code>type</code> is not set, child element(s) will be rendered instead of an input element.
                  <code>getValue()</code> will not work when used this way.</p>
                  <ReactPlayground codeText={Samples.InputWrapper} />

                  <h3><Anchor id="input-props">Props</Anchor></h3>
                  <PropTable component="InputBase"/>
                </div>

                {/* Utilities */}
                <div className="bs-docs-section">
                  <h1 className="page-header"><Anchor id="utilities">Utilities</Anchor> <small>Portal, Position</small></h1>

                  <h2><Anchor id="utilities-portal">Portal</Anchor></h2>
                  <p>
                    A Component that renders its children into a new React "subtree" or <code>container</code>. The Portal component kind of like the React
                    equivalent to jQuery"s <code>.appendTo()</code>, which is helpful for components that need to be appended to a DOM node other than
                    the component"s direct parent. The Modal, and Overlay components use the Portal component internally.
                  </p>

                  <h3><Anchor id="utilities-portal-props">Props</Anchor></h3>
                  <PropTable component="Portal"/>

                  <h2 id="utilities-position"><Anchor id="utilities-position">Position</Anchor></h2>
                  <p>
                    A Component that absolutely positions its child to a <code>target</code> component or DOM node. Useful for creating custom
                    popups or tooltips. Used by the Overlay Components.
                  </p>

                  <h3><Anchor id="utilities-position-props">Props</Anchor></h3>
                  <PropTable component="Position"/>

                  <h2><Anchor id="utilities-transitions">Transitions</Anchor></h2>

                  <h3><Anchor id="utilities-collapse">Collapse</Anchor></h3>
                  <p>Add a collapse toggle animation to an element or component.</p>
                  <ReactPlayground codeText={Samples.Collapse} />

                  <h4><Anchor id="utilities-collapse-props">Props</Anchor></h4>
                  <PropTable component="Collapse"/>

                  <h3><Anchor id="utilities-fade">Fade</Anchor></h3>
                  <p>Add a fade animation to a child element or component.</p>
                  <ReactPlayground codeText={Samples.Fade} />

                  <h4><Anchor id="utilities-fade-props">Props</Anchor></h4>
                  <PropTable component="Fade"/>
                </div>
              </div>


              <div className="col-md-3">
                <Affix
                  className="bs-docs-sidebar hidden-print"
                  role="complementary"
                  offsetTop={this.state.navOffsetTop}
                  offsetBottom={this.state.navOffsetBottom}>
                  <Nav
                    className="bs-docs-sidenav"
                    activeHref={this.state.activeNavItemHref}
                    onSelect={this.handleNavItemSelect}
                    ref="sideNav">
                    <SubNav href="#buttons" key={1} text="Buttons">
                      <NavItem href="#btn-groups" key={2}>Button groups</NavItem>
                      <NavItem href="#btn-dropdowns" key={3}>Button dropdowns</NavItem>
                      <NavItem href="#menu-item" key={25}>Menu Item</NavItem>
                    </SubNav>
                    <NavItem href="#panels" key={4}>Panels</NavItem>
                    <NavItem href="#modals" key={5}>Modals</NavItem>
                    <NavItem href="#tooltips" key={6}>Tooltips</NavItem>
                    <NavItem href="#popovers" key={7}>Popovers</NavItem>
                    <NavItem href="#overlays" key={27}>Overlays</NavItem>
                    <NavItem href="#progress" key={8}>Progress bars</NavItem>
                    <NavItem href="#navs" key={9}>Navs</NavItem>
                    <NavItem href="#navbars" key={10}>Navbars</NavItem>
                    <NavItem href="#breadcrumbs" key={30}>Breadcrumbs</NavItem>
                    <NavItem href="#tabs" key={11}>Tabs</NavItem>
                    <NavItem href="#pager" key={12}>Pager</NavItem>
                    <NavItem href="#pagination" key={13}>Pagination</NavItem>
                    <NavItem href="#alerts" key={14}>Alerts</NavItem>
                    <NavItem href="#carousels" key={15}>Carousels</NavItem>
                    <NavItem href="#grids" key={16}>Grids</NavItem>
                    <NavItem href="#images" key={29}>Images</NavItem>
                    <NavItem href="#thumbnail" key={17}>Thumbnail</NavItem>
                    <NavItem href="#listgroup" key={18}>List group</NavItem>
                    <NavItem href="#labels" key={19}>Labels</NavItem>
                    <NavItem href="#badges" key={20}>Badges</NavItem>
                    <NavItem href="#jumbotron" key={21}>Jumbotron</NavItem>
                    <NavItem href="#page-header" key={22}>Page Header</NavItem>
                    <NavItem href="#responsive-embed" key={31}>Responsive embed</NavItem>
                    <NavItem href="#wells" key={23}>Wells</NavItem>
                    <NavItem href="#glyphicons" key={24}>Glyphicons</NavItem>
                    <NavItem href="#tables" key={25}>Tables</NavItem>
                    <NavItem href="#input" key={26}>Input</NavItem>
                    <NavItem href="#utilities" key={28}>Utilities</NavItem>
                  </Nav>
                  <a className="back-to-top" href="#top">
                  Back to top
                  </a>
                </Affix>
              </div>
            </div>
          </div>

          <PageFooter ref="footer" />
        </div>
      );
  }
});

export default ComponentsPage;
