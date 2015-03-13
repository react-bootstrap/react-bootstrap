'use strict';

var React = require('react');
var fs = require('fs');

var Affix = require('../../lib/Affix');
var Nav = require('../../lib/Nav');
var SubNav = require('../../lib/SubNav');
var NavItem = require('../../lib/NavItem');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');
var ReactPlayground = require('./ReactPlayground');

var ComponentsPage = React.createClass({
  getInitialState: function () {
    return {
      activeNavItemHref: null,
      navOffsetTop: null
    };
  },

  handleNavItemSelect: function (key, href) {
    this.setState({
      activeNavItemHref: href
    });

    window.location = href;
  },

  componentDidMount: function () {
    var elem = this.refs.sideNav.getDOMNode(),
        domUtils = Affix.domUtils,
        sideNavOffsetTop = domUtils.getOffset(elem).top,
        sideNavMarginTop = parseInt(domUtils.getComputedStyles(elem.firstChild).marginTop, 10),
        topNavHeight = this.refs.topNav.getDOMNode().offsetHeight;

    this.setState({
      navOffsetTop: sideNavOffsetTop - topNavHeight - sideNavMarginTop,
      navOffsetBottom: this.refs.footer.getDOMNode().offsetHeight
    });
  },

  render: function () {
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
                  <h1 id="buttons" className="page-header">Buttons <small>Button</small></h1>
                  <h2 id="buttons-options">Options</h2>
                  <p>Use any of the available button style types to quickly create a styled button. Just modify the
                    <code>bsStyle</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonTypes.js', 'utf8')} />
                  <div className="bs-callout bs-callout-warning">
                    <h4>Button spacing</h4>
                    <p>Because React doesn't output newlines between elements, buttons on the same line are displayed
                    flush against each other. To preserve the spacing between multiple inline buttons, wrap your
                    button group in <code>{'<ButtonToolbar />'}</code>.</p>
                  </div>
                  <h2 id="buttons-sizes">Sizes</h2>
                  <p>Fancy larger or smaller buttons? Add <code>bsSize="large"</code>, <code>bsSize="small"</code>, or <code>bsSize="xsmall"</code> for additional sizes.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonSizes.js', 'utf8')} />

                  <p>Create block level buttons—those that span the full width of a parent— by adding the
                      <code>block</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonBlock.js', 'utf8')} />

                  <h2 id="buttons-active">Active state</h2>
                  <p>To set a buttons active state simply set the components <code>active</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonActive.js', 'utf8')} />

                  <h2 id="buttons-disabled">Disabled state</h2>
                  <p>Make buttons look unclickable by fading them back 50%. To do this add the <code>disabled</code>
                    attribute to buttons.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonDisabled.js', 'utf8')} />

                  <div className="bs-callout bs-callout-warning">
                    <h4>Event handler functionality not impacted</h4>
                    <p>This prop will only change the <code>{'<Button />'}</code>&#8217;s appearance, not its
                      functionality. Use custom logic to disable the effect of the <code>onClick</code> handlers.</p>
                  </div>

                  <h2 id="buttons-tags">Button tags</h2>
                  <p>The DOM element tag is choosen automaticly for you based on the props you supply. Passing a
                    <code>href</code> will result in the button using a <code>{'<a />'}</code> element otherwise a
                    <code>{'<button />'}</code> element will be used.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonTagTypes.js', 'utf8')} />

                  <h2 id="buttons-tags">Button loading state</h2>
                  <p>When activating an asynchronous action from a button it is a good UX pattern to give the user
                    feedback as to the loading state, this can easily be done by updating your
                    <code>{'<Button />'}</code>&#8217;s props from a state change like below.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonLoading.js', 'utf8')} />
                </div>

                {/* Button Groups */}
                <div className="bs-docs-section">
                  <h1 id="btn-groups" className="page-header">Button groups <small>ButtonGroup, ButtonToolbar</small></h1>
                  <p className="lead">Group a series of buttons together on a single line with the button group.</p>

                  <h3 id="btn-groups-single">Basic example</h3>
                  <p>Wrap a series of <code>{'<Button />'}</code>&#8217;s in a <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonGroupBasic.js', 'utf8')} />

                  <h3 id="btn-groups-toolbar">Button toolbar</h3>
                  <p>Combine sets of <code>{'<ButtonGroup />'}</code>&#8217;s into a <code>{'<ButtonToolbar />'}</code>
                    for more complex components.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonToolbarBasic.js', 'utf8')} />

                  <h3 id="btn-groups-sizing">Sizing</h3>
                  <p>Instead of applying button sizing props to every button in a group, just add <code>bsSize</code>
                    prop to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonGroupSizes.js', 'utf8')} />

                  <h3 id="btn-groups-nested">Nesting</h3>
                  <p>You can place other button types within the <code>{'<ButtonGroup />'}</code> like
                    <code>{'<DropdownButton />'}</code>&#8217;s.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonGroupNested.js', 'utf8')} />

                  <h3 id="btn-groups-vertical">Vertical variation</h3>
                  <p>Make a set of buttons appear vertically stacked rather than horizontally.
                    <strong className="text-danger">Split button dropdowns are not supported here.</strong></p>
                  <p>Just add <code>vertical</code> to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonGroupVertical.js', 'utf8')} />

                  <h3 id="btn-groups-justified">Justified button groups</h3>
                  <p>Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.</p>
                  <div className="bs-callout bs-callout-warning">
                    <h4>Style issues</h4>
                    <p>There are some issues and workarounds required when using this property, please see <a href="http://getbootstrap.com/components/#btn-groups-justified">bootstrap&#8217;s button group docs</a> for more specifics.</p>
                  </div>
                  <p>Just add <code>justified</code> to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ButtonGroupJustified.js', 'utf8')} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="btn-dropdowns" className="page-header">Button dropdowns</h1>
                  <p className="lead">Use <code>{'<DropdownButton />'}</code> or <code>{'<SplitButton />'}</code> components to display a button with a dropdown menu.</p>

                  <h3 id="btn-dropdowns-single">Single button dropdowns</h3>
                  <p>Create a dropdown button with the <code>{'<DropdownButton />'}</code> component.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/DropdownButtonBasic.js', 'utf8')} />

                  <h3 id="btn-dropdowns-split">Split button dropdowns</h3>
                  <p>Similarly, create split button dropdowns with the <code>{'<SplitButton />'}</code> component.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/SplitButtonBasic.js', 'utf8')} />

                  <h3 id="btn-dropdowns-sizing">Sizing</h3>
                  <p>Button dropdowns work with buttons of all sizes.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/DropdownButtonSizes.js', 'utf8')} />

                  <h3 id="btn-dropdown-nocaret">No caret variation</h3>
                  <p>Remove the caret using the <code>noCaret</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/DropdownButtonNoCaret.js', 'utf8')} />

                  <h3 id="btn-dropdowns-dropup">Dropup variation</h3>
                  <p>Trigger dropdown menus that site above the button by adding the <code>dropup</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/SplitButtonDropup.js', 'utf8')} />

                  <h3 id="btn-dropdowns-right">Dropdown right variation</h3>
                  <p>Trigger dropdown menus that align to the right of the button using the <code>pullRight</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/SplitButtonRight.js', 'utf8')} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="panels" className="page-header">Panels <small>Panel, PanelGroup, Accordion</small></h1>

                  <h3 id="panels-basic">Basic example</h3>
                  <p>By default, all the <code>&lt;Panel /&gt;</code> does is apply some basic border and padding to contain some content.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PanelBasic.js', 'utf8')} />

                  <h3 id="panels-heading">Panel with heading</h3>
                  <p>Easily add a heading container to your panel with the <code>header</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PanelWithHeading.js', 'utf8')} />

                  <h3 id="panels-footer">Panel with footer</h3>
                  <p>Pass buttons or secondary text in the <code>footer</code> prop. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PanelWithFooter.js', 'utf8')} />

                  <h3 id="panels-contextual">Contextual alternatives</h3>
                  <p>Like other components, easily make a panel more meaningful to a particular context by adding a <code>bsStyle</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PanelContextual.js', 'utf8')} />

                  <h3 id="panels-contextual">With tables and list groups</h3>
                  <p>Add the <code>fill</code> prop to <code>&lt;Table /&gt;</code> or <code>&lt;ListGroup /&gt;</code> elements to make them fill the panel.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PanelListGroupFill.js', 'utf8')} />

                  <h3 id="panels-controlled">Controlled PanelGroups</h3>
                  <p><code>PanelGroup</code>s can be controlled by a parent component. The <code>activeKey</code> prop dictates which panel is open.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PanelGroupControlled.js', 'utf8')} />

                  <h3 id="panels-uncontrolled">Uncontrolled PanelGroups</h3>
                  <p><code>PanelGroup</code>s can also be uncontrolled where they manage their own state. The <code>defaultActiveKey</code> prop dictates which panel is open when initially.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PanelGroupUncontrolled.js', 'utf8')} />

                  <h3 id="panels-accordion">Accordions</h3>
                  <p><code>&lt;Accordion /&gt;</code> aliases <code>&lt;PanelGroup accordion /&gt;</code>.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PanelGroupAccordion.js', 'utf8')} />

                  <h3 id="panels-collapsable">Collapsable Mixin</h3>
                  <p><code>CollapsableMixin</code> can be used to create your own components with collapse functionality.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/CollapsableParagraph.js', 'utf8')} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="modals" className="page-header">Modals <small>Modal</small></h1>

                  <h3 id="modals-static">A static example</h3>
                  <p>A rendered modal with header, body, and set of actions in the footer.</p>
                  <p>The header is added automatically if you pass in a <code>title</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ModalStatic.js', 'utf8')} />

                  <h3 id="modals-live">Live demo</h3>
                  <p>Use <code>&lt;ModalTrigger /&gt;</code> to create a real modal that's added to the document body when opened.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ModalTrigger.js', 'utf8')} />

                  <h3 id="modals-custom">Custom trigger</h3>
                  <p>Use <code>&lt;OverlayMixin /&gt;</code> in a custom component to manage the modal's state yourself.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ModalOverlayMixin.js', 'utf8')} />

                  <h3 id="modals-custom">Contained Modal</h3>
                  <p>You will need to add the following css to your project and ensure that your container has the <code>modal-container</code> class.</p>
                  <pre>
                    {React.DOM.code(null,
                      ".modal-container {\n" +
                      "  position: relative;\n" +
                      "}\n" +
                      ".modal-container .modal, .modal-container .modal-backdrop {\n" +
                      "  position: absolute;\n" +
                      "}\n"
                    )}
                  </pre>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ModalContained.js', 'utf8')} />
                </div>

                {/* Tooltip */}
                <div className="bs-docs-section">
                  <h1 id="tooltips" className="page-header">Tooltips <small>Tooltip</small></h1>
                  <h2 id="tooltips-examples">Example tooltips</h2>

                  <p>Tooltip component.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/TooltipBasic.js', 'utf8')} />

                  <p>Positioned tooltip component.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/TooltipPositioned.js', 'utf8')} />

                  <p>Positioned tooltip in copy.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/TooltipInCopy.js', 'utf8')} />
                </div>

                {/* Popover */}
                <div className="bs-docs-section">
                  <h1 id="popovers" className="page-header">Popovers <small>Popover</small></h1>
                  <h2 id="popovers-examples">Example popovers</h2>

                  <p>Popovers component.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PopoverBasic.js', 'utf8')} />

                  <p>Popovers component.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PopoverPositioned.js', 'utf8')} />

                  <p>Popovers scrolling.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PopoverPositionedContained.js', 'utf8')} exampleClassName="bs-example-scroll" />
                </div>

                {/* Progress Bar */}
                <div className="bs-docs-section">
                  <h1 id="progress" className="page-header">Progress bars <small>ProgressBar</small></h1>

                  <p className="lead">Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.</p>

                  <h2 id="progress-basic">Basic example</h2>
                  <p>Default progress bar.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ProgressBarBasic.js', 'utf8')} />

                  <h2 id="progress-label">With label</h2>
                  <p>Add a <code>label</code> prop to show a visible percentage. For low percentages, consider adding a min-width to ensure the label's text is fully visible.</p>
                  <p>The following keys are interpolated with the current values: <code>%(min)s</code>, <code>%(max)s</code>, <code>%(now)s</code>, <code>%(percent)s</code>, <code>%(bsStyle)s</code></p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ProgressBarWithLabel.js', 'utf8')} />

                  <h2 id="progress-screenreader-label">Screenreader only label</h2>
                  <p>Add a <code>srOnly</code> prop to hide the label visually.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ProgressBarScreenreaderLabel.js', 'utf8')} />

                  <h2 id="progress-contextual">Contextual alternatives</h2>
                  <p>Progress bars use some of the same button and alert classes for consistent styles.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ProgressBarContextual.js', 'utf8')} />

                  <h2 id="progress-striped">Striped</h2>
                  <p>Uses a gradient to create a striped effect. Not available in IE8.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ProgressBarStriped.js', 'utf8')} />

                  <h2 id="progress-animated">Animated</h2>
                  <p>Add <code>active</code> prop to animate the stripes right to left. Not available in IE9 and below.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ProgressBarAnimated.js', 'utf8')} />

                  <h2 id="progress-stacked">Stacked</h2>
                  <p>Nest <code>&lt;ProgressBar /&gt;</code>s to stack them.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ProgressBarStacked.js', 'utf8')} />
                </div>

                {/* Nav */}
                <div className="bs-docs-section">
                  <h1 id="navs" className="page-header">Navs <small>Nav, NavItem</small></h1>
                  <h2 id="navs-examples">Example navs</h2>

                  <p>Navs come in two styles, <code>pills</code> and <code>tabs</code>. Disable a tab by adding <code>disabled</code>.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/NavBasic.js', 'utf8')} />

                  <h3>Dropdown</h3>
                  <p>Add dropdowns using the <code>DropdownButton</code> component. Just make sure to set <code>navItem</code> property to true.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/NavDropdown.js', 'utf8')} />

                  <h3>Stacked</h3>
                  <p>They can also be <code>stacked</code> vertically.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/NavStacked.js', 'utf8')} />

                  <h3>Justified</h3>
                  <p>They can be <code>justified</code> to take the full width of their parent.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/NavJustified.js', 'utf8')} />
                </div>

                {/* Navbar */}
                <div className="bs-docs-section">
                  <h1 id="navbars" className="page-header">Navbars <small>Navbar, Nav, NavItem</small></h1>
                  <h2 id="navbars-examples">Example navbars</h2>
                  <p>You can specify a brand by passing a renderable component or string in <code>brand</code></p>
                  <p>Navbars are by default accessible and will provide <code>role="navigation"</code>.</p>
                  <p>They also supports all the different Bootstrap classes as properties. Just camelCase the css class and remove navbar from it. For example <code>navbar-fixed-top</code> becomes the property <code>fixedTop</code>. The different properties are <code>fixedTop</code>, <code>fixedBottom</code>, <code>staticTop</code>, <code>inverse</code>, <code>fluid</code>.</p>
                  <p>You can drag elements to the right by specifying the <code>right</code> property on a nav group.</p>

                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/NavbarBasic.js', 'utf8')} />

                  <h3>Mobile Friendly</h3>
                  <p>To have a mobile friendly Navbar, specify the property <code>toggleNavKey</code> on the Navbar with a value corresponding to an <code>eventKey</code> of one of his <code>Nav</code> children. This child will be the one collapsed.</p>
                  <p>By setting the property {React.DOM.code(null, "defaultNavExpanded={true}")} the Navbar will start expanded by default.</p>
                  <div className="bs-callout bs-callout-info">
                    <h4>Scrollbar overflow</h4>
                    <p>The height of the collapsable is slightly smaller than the real height. To hide the scroll bar, add the following css to your style files.</p>
                    <pre>
                      {React.DOM.code(null,
                        ".navbar-collapse {\n" +
                        "  overflow: hidden;\n" +
                        "}\n"
                      )}
                    </pre>
                  </div>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/NavbarCollapsable.js', 'utf8')} />

                  <h3>Mobile Friendly (Multiple Nav Components)</h3>
                  <p>To have a mobile friendly Navbar that handles multiple <code>Nav</code> components use <code>CollapsableNav</code>. The <code>toggleNavKey</code> must still be set, however, the corresponding <code>eventKey</code> must now be on the <code>CollapsableNav</code> component.</p>
                  <div className="bs-callout bs-callout-info">
                    <h4>Div collapse</h4>
                    <p>The <code>navbar-collapse</code> div gets created as the collapsable element which follows the <a href="http://getbootstrap.com/components/#navbar-default">bootstrap</a> collapsable navbar documentation.</p>
                    <pre>&lt;div class="collapse navbar-collapse"&gt;&lt;/div&gt;</pre>
                  </div>

                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/CollapsableNav.js', 'utf8')} />
                </div>

                {/* Tabbed Areas */}
                <div className="bs-docs-section">
                  <h1 id="tabs" className="page-header">Togglable tabs <small>TabbedArea, TabPane</small></h1>
                  <h2 id="tabs-examples">Example tabs</h2>
                  <p>Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus.</p>

                  <h3>Uncontrolled</h3>
                  <p>Allow the component to control its own state.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/TabbedAreaUncontrolled.js', 'utf8')} exampleClassName="bs-example-tabs" />

                  <h3>Controlled</h3>
                  <p>Pass down the active state on render via props.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/TabbedAreaControlled.js', 'utf8')} exampleClassName="bs-example-tabs" />

                  <h3>No animation</h3>
                  <p>Set the <code>animation</code> prop to <code>false</code></p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/TabbedAreaNoAnimation.js', 'utf8')} exampleClassName="bs-example-tabs" />

                  <div className="bs-callout bs-callout-info">
                    <h4>Extends tabbed navigation</h4>
                    <p>This plugin extends the <a href="#navs">tabbed navigation component</a> to add tabbable areas.</p>
                  </div>
                </div>

                {/* Pager */}
                <div className="bs-docs-section">
                  <h1 id="pager" className="page-header">Pager<small> Pager, PageItem</small></h1>
                  <p>Quick previous and next links.</p>

                  <h3>Default</h3>
                  <p>Centers by default.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PagerDefault.js', 'utf8')} />

                  <h3>Aligned</h3>
                  <p>Set the <code>previous</code> or <code>next</code> prop to <code>true</code>, to align left or right.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PagerAligned.js', 'utf8')} />

                  <h3>Disabled</h3>
                  <p>Set the <code>disabled</code> prop to <code>true</code> to disable the link.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PagerDisabled.js', 'utf8')} />
                </div>

                {/* Alerts */}
                <div className="bs-docs-section">
                  <h1 id="alerts" className="page-header">Alert messages <small>Alert</small></h1>
                  <h2 id="alerts-examples">Example alerts</h2>

                  <p>Basic alert styles.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/AlertBasic.js', 'utf8')} />

                  <p>Closeable alerts, just pass in a <code>onDismiss</code> function.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/AlertDismissable.js', 'utf8')} />

                  <p>Auto close after a set time with <code>dismissAfter</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/AlertAutoDismissable.js', 'utf8')} />
                </div>

                {/* Carousels */}
                <div className="bs-docs-section">
                  <h1 id="carousels" className="page-header">Carousels <small>Carousel, CarouselItem</small></h1>
                  <h2 id="carousels-examples">Example carousels</h2>

                  <h3>Uncontrolled</h3>
                  <p>Allow the component to control its own state.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/CarouselUncontrolled.js', 'utf8')} exampleClassName="bs-example-tabs" />

                  <h3>Controlled</h3>
                  <p>Pass down the active state on render via props.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/CarouselControlled.js', 'utf8')} exampleClassName="bs-example-tabs" />
                </div>

                {/* Grids */}
                <div className="bs-docs-section">
                  <h1 id="grids" className="page-header">Grids <small>Grid, Row, Col</small></h1>
                  <h2 id="grids-examples">Example grids</h2>

                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/GridBasic.js', 'utf8')} exampleClassName="bs-example-tabs" />
                </div>

                {/* ListGroup */}
                <div className="bs-docs-section">
                  <h1 id="listgroup" className="page-header">List group<small> ListGroup, ListGroupItem</small></h1>
                  <p>Quick previous and next links.</p>

                  <h3>Default</h3>
                  <p>Centers by default.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ListGroupDefault.js', 'utf8')} />

                  <h3>Linked</h3>
                  <p>Set the <code>href</code> or <code>onClick</code> prop on <code>ListGroupItem</code>, to create a linked or clickable element.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ListGroupLinked.js', 'utf8')} />

                  <h3>Styling</h3>
                  <p>Set the <code>active</code> or <code>disabled</code> prop to <code>true</code> to mark or disable the item.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ListGroupActive.js', 'utf8')} />
                  <p>Set the <code>bsStyle</code> prop to style the item</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ListGroupStyle.js', 'utf8')} />

                  <h3>With header</h3>
                  <p>Set the <code>header</code> prop to create a structured item, with a heading and a body area.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/ListGroupHeader.js', 'utf8')} />
                </div>

                {/* Labels */}
                <div className="bs-docs-section">
                  <h1 id="labels" className="page-header">Labels</h1>

                  <h2 id="label-static">Example</h2>
                  <p>Create a <code>{'<Label>label</Label>'}</code> show highlight information</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/Label.js', 'utf8')} />
                  <h2 id="label-static">Available variations</h2>
                  <p>Add any of the below mentioned modifier classes to change the appearance of a label.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/LabelVariations.js', 'utf8')} />
                </div>

                {/* Badges */}
                <div className="bs-docs-section">
                  <h1 id="badges" className="page-header">Badges</h1>
                  <p>Easily highlight new or unread items by adding a <code>{'<Badge>'}</code> to links, Bootstrap navs, and more.</p>
                  <h2 id="badge-static">Example</h2>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/Badge.js', 'utf8')} />
                  <div className="bs-callout bs-callout-info">
                    <h4>Cross-browser compatibility</h4>
                    <p>Unlike regular Bootstrap badges self collapse even in Internet Explorer 8.</p>
                  </div>
                </div>

                {/* Jumbotron */}
                <div className="bs-docs-section">
                  <h1 id="jumbotron" className="page-header">Jumbotron</h1>
                  <p>A lightweight, flexible component that can optionally extend the entire viewport to showcase key content on your site.</p>
                  <h2 id="page-header-static">Example</h2>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/Jumbotron.js', 'utf8')} />
                </div>

                {/* Page Header */}
                <div className="bs-docs-section">
                  <h1 id="page-header" className="page-header">Page Header</h1>
                  <p>A simple shell for an <code>h1</code> to appropriately space out and segment sections of content on a page. It can utilize the <code>h1</code>&#8217;s default <code>small</code> element, as well as most other components (with additional styles).</p>
                  <h2 id="page-header-static">Example</h2>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/PageHeader.js', 'utf8')} />
                </div>

                {/* Wells */}
                <div className="bs-docs-section">
                  <h1 id="wells" className="page-header">Wells</h1>
                  <p>Use the well as a simple effect on an element to give it an inset effect.</p>
                  <h2 id="well-static">Default Wells</h2>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/Well.js', 'utf8')} />
                  <h2 id="well-optins-static">Optional classes</h2>
                  <p>Control padding and rounded corners with two optional modifier classes.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/WellSizes.js', 'utf8')} />
                </div>

                {/* Glyphicons */}
                <div className="bs-docs-section">
                  <h1 id="glyphicons" className="page-header">Glyphicons</h1>
                  <p>Use them in buttons, button groups for a toolbar, navigation, or prepended form inputs.</p>
                  <h2 id="glyphicon-static">Example</h2>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/Glyphicon.js', 'utf8')} />
                </div>

                {/* Tables */}
                <div className="bs-docs-section">
                  <h1 id="tables" className="page-header">Tables</h1>

                  <h2 id="table-basic">Example</h2>
                  <p>Use the <code>striped</code>, <code>bordered</code>, <code>condensed</code> and <code>hover</code> props to customise the table.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/TableBasic.js', 'utf8')} />
                  <h2 id="table-responsive">Responsive</h2>
                  <p>Add <code>responsive</code> prop to make them scroll horizontally up to small devices (under 768px). When viewing on anything larger than 768px wide, you will not see any difference in these tables.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/TableResponsive.js', 'utf8')} />
                </div>

                {/* Input */}
                <div className="bs-docs-section">
                  <h1 id="input" className="page-header">Input</h1>
                  <p>Renders an input in bootstrap wrappers. Supports label, help, text input add-ons, validation and use as wrapper.
                  Use <code>getValue()</code> or <code>getChecked()</code> to get the current state.
                  The helper method <code>getInputDOMNode()</code> returns the internal input element.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/Input.js', 'utf8')} />
                  <h2 id="input-types">Types</h2>
                  <p>Supports <code>select</code>, <code>textarea</code>, <code>static</code> as well as standard HTML input types. <code>getValue()</code> returns an array for multiple select.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/InputTypes.js', 'utf8')} />
                  <h2 id="input-addons">Add-ons</h2>
                  <p>Use <code>addonBefore</code> and <code>addonAfter</code> for normal addons, <code>buttonBefore</code> and <code>buttonAfter</code> for button addons.
                  Exotic configurations may require some css on your side.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/InputAddons.js', 'utf8')} />
                  <h2 id="input-validation">Validation</h2>
                  <p>Set <code>bsStyle</code> to one of <code>success</code>, <code>warning</code> or <code>error</code>.
                  Add <code>hasFeedback</code> to show glyphicon. Glyphicon may need additional styling if there is an add-on or no label.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/InputValidation.js', 'utf8')} />
                  <h2 id="input-horizontal">Horizontal forms</h2>
                  <p>Use <code>labelClassName</code> and <code>wrapperClassName</code> properties to add col classes manually.
                  <code>checkbox</code> and <code>radio</code> types need special treatment because label wraps input.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/InputHorizontal.js', 'utf8')} />
                  <h2 id="input-wrapper">Use as a wrapper</h2>
                  <p>If <code>type</code> is not set, child element(s) will be rendered instead of an input element.
                  <code>getValue()</code> will not work when used this way.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/InputWrapper.js', 'utf8')} />
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
                    </SubNav>
                    <NavItem href="#panels" key={4}>Panels</NavItem>
                    <NavItem href="#modals" key={5}>Modals</NavItem>
                    <NavItem href="#tooltips" key={6}>Tooltips</NavItem>
                    <NavItem href="#popovers" key={7}>Popovers</NavItem>
                    <NavItem href="#progress" key={8}>Progress bars</NavItem>
                    <NavItem href="#navs" key={9}>Navs</NavItem>
                    <NavItem href="#navbars" key={10}>Navbars</NavItem>
                    <NavItem href="#tabs" key={11}>Togglable tabs</NavItem>
                    <NavItem href="#pager" key={12}>Pager</NavItem>
                    <NavItem href="#alerts" key={13}>Alerts</NavItem>
                    <NavItem href="#carousels" key={14}>Carousels</NavItem>
                    <NavItem href="#grids" key={15}>Grids</NavItem>
                    <NavItem href="#listgroup" key={16}>List group</NavItem>
                    <NavItem href="#labels" key={17}>Labels</NavItem>
                    <NavItem href="#badges" key={18}>Badges</NavItem>
                    <NavItem href="#jumbotron" key={19}>Jumbotron</NavItem>
                    <NavItem href="#page-header" key={20}>Page Header</NavItem>
                    <NavItem href="#wells" key={21}>Wells</NavItem>
                    <NavItem href="#glyphicons" key={22}>Glyphicons</NavItem>
                    <NavItem href="#tables" key={23}>Tables</NavItem>
                    <NavItem href="#input" key={24}>Input</NavItem>
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

module.exports = ComponentsPage;
