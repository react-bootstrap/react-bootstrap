/* eslint react/no-did-mount-set-state: 0 */

import React from 'react';

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
    let domUtils = Affix.domUtils;
    let sideNavOffsetTop = domUtils.getOffset(elem).top;
    let sideNavMarginTop = parseInt(domUtils.getComputedStyles(elem.firstChild).marginTop, 10);
    let topNavHeight = React.findDOMNode(this.refs.topNav).offsetHeight;

    this.setState({
      navOffsetTop: sideNavOffsetTop - topNavHeight - sideNavMarginTop,
      navOffsetBottom: React.findDOMNode(this.refs.footer).offsetHeight
    });
  },

  render() {
    return (
        <div>
          <NavMain activePage='components' ref='topNav' />

          <PageHeader
            title='Components'
            subTitle='' />

          <div className='container bs-docs-container'>
            <div className='row'>
              <div className='col-md-9' role='main'>

                {/* Buttons */}
                <div className='bs-docs-section'>
                  <h1 id='buttons' className='page-header'>Buttons <small>Button</small></h1>
                  <h2 id='buttons-options'>Options</h2>
                  <p>Use any of the available button style types to quickly create a styled button. Just modify the <code>bsStyle</code> prop.</p>
                  <ReactPlayground codeText={Samples.ButtonTypes} />
                  <div className='bs-callout bs-callout-warning'>
                    <h4>Button spacing</h4>
                    <p>Because React doesn't output newlines between elements, buttons on the same line are displayed
                    flush against each other. To preserve the spacing between multiple inline buttons, wrap your
                    button group in <code>{'<ButtonToolbar />'}</code>.</p>
                  </div>

                  <h2 id='buttons-sizes'>Sizes</h2>
                  <p>Fancy larger or smaller buttons? Add <code>bsSize="large"</code>, <code>bsSize="small"</code>, or <code>bsSize="xsmall"</code> for additional sizes.</p>
                  <ReactPlayground codeText={Samples.ButtonSizes} />

                  <p>Create block level buttons—those that span the full width of a parent— by adding the <code>block</code> prop.</p>
                  <ReactPlayground codeText={Samples.ButtonBlock} />

                  <h2 id='buttons-active'>Active state</h2>
                  <p>To set a buttons active state simply set the components <code>active</code> prop.</p>
                  <ReactPlayground codeText={Samples.ButtonActive} />

                  <h2 id='buttons-disabled'>Disabled state</h2>
                  <p>Make buttons look unclickable by fading them back 50%. To do this add the <code>disabled</code> attribute to buttons.</p>
                  <ReactPlayground codeText={Samples.ButtonDisabled} />

                  <div className='bs-callout bs-callout-warning'>
                    <h4>Event handler functionality not impacted</h4>
                    <p>This prop will only change the <code>{'<Button />'}</code>&#8217;s appearance, not its
                      functionality. Use custom logic to disable the effect of the <code>onClick</code> handlers.</p>
                  </div>

                  <h2 id='buttons-tags'>Button tags</h2>
                  <p>The DOM element tag is choosen automatically for you based on the props you supply. Passing
                    a <code>href</code> will result in the button using a <code>{'<a />'}</code> element otherwise
                    a <code>{'<button />'}</code> element will be used.</p>
                  <ReactPlayground codeText={Samples.ButtonTagTypes} />

                  <h2 id='buttons-tags'>Button loading state</h2>
                  <p>When activating an asynchronous action from a button it is a good UX pattern to give the user
                    feedback as to the loading state, this can easily be done by updating
                    your <code>{'<Button />'}</code>&#8217;s props from a state change like below.</p>
                  <ReactPlayground codeText={Samples.ButtonLoading} />

                  <h3 id='buttons-props'>Props</h3>
                  <PropTable component='Button'/>

                </div>

                {/* Button Groups */}
                <div className='bs-docs-section'>
                  <h1 id='btn-groups' className='page-header'>Button groups <small>ButtonGroup, ButtonToolbar</small></h1>
                  <p className='lead'>Group a series of buttons together on a single line with the button group.</p>

                  <h3 id='btn-groups-single'>Basic example</h3>
                  <p>Wrap a series of <code>{'<Button />'}</code>s in a <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupBasic} />

                  <h3 id='btn-groups-toolbar'>Button toolbar</h3>
                  <p>Combine sets of <code>{'<ButtonGroup />'}</code>s into a <code>{'<ButtonToolbar />'}</code> for more complex components.</p>
                  <ReactPlayground codeText={Samples.ButtonToolbarBasic} />

                  <h3 id='btn-groups-sizing'>Sizing</h3>
                  <p>Instead of applying button sizing props to every button in a group, just add <code>bsSize</code> prop to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupSizes} />

                  <h3 id='btn-groups-nested'>Nesting</h3>
                  <p>You can place other button types within the <code>{'<ButtonGroup />'}</code> like <code>{'<DropdownButton />'}</code>s.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupNested} />

                  <h3 id='btn-groups-vertical'>Vertical variation</h3>
                  <p>Make a set of buttons appear vertically stacked rather than horizontally. <strong
                    className='text-danger'>Split button dropdowns are not supported here.</strong></p>
                  <p>Just add <code>vertical</code> to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupVertical} />
                  <br />
                  <p>Moreover, you can have buttons be block level elements so they take the full width of their container, just add <code>block</code> to the <code>{'<ButtonGroup />'}</code>, in addition to the <code>vertical</code> you just added.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupBlock} />

                  <h3 id='btn-groups-justified'>Justified button groups</h3>
                  <p>Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.</p>
                  <div className='bs-callout bs-callout-warning'>
                    <h4>Style issues</h4>
                    <p>There are some issues and workarounds required when using this property, please see <a href='http://getbootstrap.com/components/#btn-groups-justified'>bootstrap&#8217;s button group docs</a> for more specifics.</p>
                  </div>
                  <p>Just add <code>justified</code> to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupJustified} />

                  <h3 id='btn-groups-props'>Props</h3>
                  <PropTable component='ButtonGroup'/>
                </div>

                <div className='bs-docs-section'>
                  <h1 id='btn-dropdowns' className='page-header'>Button dropdowns</h1>
                  <p className='lead'>Use <code>{'<DropdownButton />'}</code> or <code>{'<SplitButton />'}</code> components to display a button with a dropdown menu.</p>

                  <h3 id='btn-dropdowns-single'>Single button dropdowns</h3>
                  <p>Create a dropdown button with the <code>{'<DropdownButton />'}</code> component.</p>
                  <ReactPlayground codeText={Samples.DropdownButtonBasic} />

                  <h3 id='btn-dropdowns-split'>Split button dropdowns</h3>
                  <p>Similarly, create split button dropdowns with the <code>{'<SplitButton />'}</code> component.</p>
                  <ReactPlayground codeText={Samples.SplitButtonBasic} />

                  <h3 id='btn-dropdowns-sizing'>Sizing</h3>
                  <p>Button dropdowns work with buttons of all sizes.</p>
                  <ReactPlayground codeText={Samples.DropdownButtonSizes} />

                  <h3 id='btn-dropdown-nocaret'>No caret variation</h3>
                  <p>Remove the caret using the <code>noCaret</code> prop.</p>
                  <ReactPlayground codeText={Samples.DropdownButtonNoCaret} />

                  <h3 id='btn-dropdowns-dropup'>Dropup variation</h3>
                  <p>Trigger dropdown menus that site above the button by adding the <code>dropup</code> prop.</p>
                  <ReactPlayground codeText={Samples.SplitButtonDropup} />

                  <h3 id='btn-dropdowns-right'>Dropdown right variation</h3>
                  <p>Trigger dropdown menus that align to the right of the button using the <code>pullRight</code> prop.</p>
                  <ReactPlayground codeText={Samples.SplitButtonRight} />

                  <h3 id='btn-dropdowns-props'>Props</h3>

                  <h4>DropdownButton</h4>
                  <PropTable component='DropdownButton'/>

                  <h4>SplitButton</h4>
                  <PropTable component='SplitButton'/>
                </div>

                {/* Menu Item */}
                <div className='bs-docs-section'>
                  <h1 id='menu-item' className='page-header'>Menu Item <small> MenuItem</small></h1>
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

                  <h3 id='menu-item-props'>Props</h3>
                  <PropTable component='MenuItem'/>
                </div>

              {/* Panels */}
                <div className='bs-docs-section'>
                  <h1 id='panels' className='page-header'>Panels <small>Panel, PanelGroup, Accordion</small></h1>

                  <h3 id='panels-basic'>Basic example</h3>
                  <p>By default, all the <code>&lt;Panel /&gt;</code> does is apply some basic border and padding to contain some content.</p>
                  <ReactPlayground codeText={Samples.PanelBasic} />

                  <h3 id='panels-heading'>Panel with heading</h3>
                  <p>Easily add a heading container to your panel with the <code>header</code> prop.</p>
                  <ReactPlayground codeText={Samples.PanelWithHeading} />

                  <h3 id='panels-footer'>Panel with footer</h3>
                  <p>Pass buttons or secondary text in the <code>footer</code> prop. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground.</p>
                  <ReactPlayground codeText={Samples.PanelWithFooter} />

                  <h3 id='panels-contextual'>Contextual alternatives</h3>
                  <p>Like other components, easily make a panel more meaningful to a particular context by adding a <code>bsStyle</code> prop.</p>
                  <ReactPlayground codeText={Samples.PanelContextual} />

                  <h3 id='panels-contextual'>With tables and list groups</h3>
                  <p>Add the <code>fill</code> prop to <code>&lt;Table /&gt;</code> or <code>&lt;ListGroup /&gt;</code> elements to make them fill the panel.</p>
                  <ReactPlayground codeText={Samples.PanelListGroupFill} />

                  <h3 id='panels-controlled'>Controlled PanelGroups</h3>
                  <p><code>PanelGroup</code>s can be controlled by a parent component. The <code>activeKey</code> prop dictates which panel is open.</p>
                  <ReactPlayground codeText={Samples.PanelGroupControlled} />

                  <h3 id='panels-uncontrolled'>Uncontrolled PanelGroups</h3>
                  <p><code>PanelGroup</code>s can also be uncontrolled where they manage their own state. The <code>defaultActiveKey</code> prop dictates which panel is open when initially.</p>
                  <ReactPlayground codeText={Samples.PanelGroupUncontrolled} />

                  <h3 id='panels-accordion'>Accordions</h3>
                  <p><code>&lt;Accordion /&gt;</code> aliases <code>&lt;PanelGroup accordion /&gt;</code>.</p>
                  <ReactPlayground codeText={Samples.PanelGroupAccordion} />

                  <h3 id='panels-collapsible'>Collapsible Mixin</h3>
                  <p><code>CollapsibleMixin</code> can be used to create your own components with collapse functionality.</p>
                  <ReactPlayground codeText={Samples.CollapsibleParagraph} />

                  <h3 id='panels-props'>Props</h3>

                  <h4>Panels, Accordion</h4>
                  <PropTable component='Panel'/>

                  <h4>PanelGroup</h4>
                  <PropTable component='PanelGroup'/>

                </div>

                <div className='bs-docs-section'>
                  <h1 id='modals' className='page-header'>Modals <small>Modal</small></h1>

                  <h3 id='modals-static'>A static example</h3>
                  <p>A rendered modal with header, body, and set of actions in the footer.</p>
                  <p>The header is added automatically if you pass in a <code>title</code> prop.</p>
                  <ReactPlayground codeText={Samples.ModalStatic} />

                  <h3 id='modals-live'>Live demo</h3>
                  <p>Use <code>&lt;ModalTrigger /&gt;</code> to create a real modal that's added to the document body when opened.</p>
                  <ReactPlayground codeText={Samples.ModalTrigger} />

                  <h3 id='modals-custom'>Custom trigger</h3>
                  <p>Use <code>OverlayMixin</code> in a custom component to manage the modal's state yourself.</p>
                  <ReactPlayground codeText={Samples.ModalOverlayMixin} />

                  <h3 id='modals-custom'>Contained Modal</h3>
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

                  <h3 id='modal-default-sizing'>Sizing modals using standard Bootstrap props</h3>
                  <p>You can specify a bootstrap large or small modal by using the "bsSize" prop.</p>
                  <ReactPlayground codeText={Samples.ModalDefaultSizing} />

                  <h3 id='modal-custom-sizing'>Sizing modals using custom css</h3>
                  <p>You can apply custom css to the modal dialog div using the "dialogClassName" prop. Example is using a custom css class with width set to 90%.</p>
                  <ReactPlayground codeText={Samples.ModalCustomSizing} />

                  <h3 id='modals-props'>Props</h3>

                  <h4>Modal</h4>
                  <PropTable component='Modal'/>

                  <h4>ModalTrigger</h4>
                  <PropTable component='ModalTrigger'/>

                </div>

                {/* overlays */}
                <div className='bs-docs-section'>
                  <h1 id='overlays' className='page-header'>Overlays <small>Overlay, Tooltip, Popover</small></h1>

                  <h2 id='overlays-examples'>Overlay</h2>
                  <p>
                    Overlays allow components to be rendered and positioned to the left, right, top, or bottom of another component.
                    They are perfect for simple tooltips or even more complicated popups.
                  </p>
                  <ReactPlayground codeText={Samples.Overlay} />

                  <h2 id='overlays-examples'>Overlay Trigger</h2>
                  <p>
                    Often you will want to show or hide and Overlay in response to an action by its target, such as hovering over a link.
                    Since this is such a common pattern we provide the <code>OverlayTrigger</code> component to reduce the amount of boilerplate
                    you need to write to implement this pattern.
                  </p>
                  <ReactPlayground codeText={Samples.OverlayTrigger} />

                  <h3 id='overlays-props'>Props</h3>

                  <h4>Overlay</h4>
                  <PropTable component='Overlay'/>

                  <h4>OverlayTrigger</h4>
                  <PropTable component='OverlayTrigger'/>

                  {/* Tooltip */}
                  <div className='bs-docs-section'>
                    <h2 id='tooltips' >Tooltip</h2>
                    <p>
                      You don't always need to create custom styling for your overlays. Bootstrap provides two great options out of the box.
                      Tooltips can be used inside an <code>Overlay</code> Component, or an <code>OverlayTrigger</code>
                    </p>
                    <ReactPlayground codeText={Samples.TooltipBasic} exampleClassName='tooltip-static'/>

                    <p>Positioned tooltip component.</p>
                    <ReactPlayground codeText={Samples.TooltipPositioned} />

                    <p>Positioned tooltip in copy.</p>
                    <ReactPlayground codeText={Samples.TooltipInCopy} />

                    <h3 id='tooltips-props'>Props</h3>
                    <PropTable component='Tooltip'/>

                  </div>

                  {/* Popover */}
                  <div className='bs-docs-section'>
                    <h2 id='popovers'>Popovers</h2>

                    <p>
                      The Popover component, like the Tooltip can be used with an <code>Overlay</code> Component, or an <code>OverlayTrigger</code>.
                      Unlike the Tooltip popovers are designed to display more reobust information about their targets.
                    </p>
                    <ReactPlayground codeText={Samples.PopoverBasic}/>

                    <p>Positioned popover component.</p>
                    <ReactPlayground codeText={Samples.PopoverPositioned} />

                    <p>Trigger behaviors. It's inadvisable to use <code>"hover"</code> or <code>"focus"</code> triggers for popovers, because they have poor accessibility from keyboard and on mobile devices.</p>
                    <ReactPlayground codeText={Samples.PopoverTriggerBehaviors} />

                    <p>Popover component in container.</p>
                    <ReactPlayground codeText={Samples.PopoverContained} exampleClassName='bs-example-popover-contained' />

                    <p>Positioned popover components in scrolling container.</p>
                    <ReactPlayground codeText={Samples.PopoverPositionedScrolling} exampleClassName='bs-example-popover-scroll' />

                    <h3 id='popover-props'>Props</h3>

                    <PropTable component='Popover'/>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className='bs-docs-section'>
                  <h1 id='progress' className='page-header'>Progress bars <small>ProgressBar</small></h1>

                  <p className='lead'>Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.</p>

                  <h2 id='progress-basic'>Basic example</h2>
                  <p>Default progress bar.</p>
                  <ReactPlayground codeText={Samples.ProgressBarBasic} />

                  <h2 id='progress-label'>With label</h2>
                  <p>Add a <code>label</code> prop to show a visible percentage. For low percentages, consider adding a min-width to ensure the label's text is fully visible.</p>
                  <p>The following keys are interpolated with the current values: <code>%(min)s</code>, <code>%(max)s</code>, <code>%(now)s</code>, <code>%(percent)s</code>, <code>%(bsStyle)s</code></p>
                  <ReactPlayground codeText={Samples.ProgressBarWithLabel} />

                  <h2 id='progress-screenreader-label'>Screenreader only label</h2>
                  <p>Add a <code>srOnly</code> prop to hide the label visually.</p>
                  <ReactPlayground codeText={Samples.ProgressBarScreenreaderLabel} />

                  <h2 id='progress-contextual'>Contextual alternatives</h2>
                  <p>Progress bars use some of the same button and alert classes for consistent styles.</p>
                  <ReactPlayground codeText={Samples.ProgressBarContextual} />

                  <h2 id='progress-striped'>Striped</h2>
                  <p>Uses a gradient to create a striped effect. Not available in IE8.</p>
                  <ReactPlayground codeText={Samples.ProgressBarStriped} />

                  <h2 id='progress-animated'>Animated</h2>
                  <p>Add <code>active</code> prop to animate the stripes right to left. Not available in IE9 and below.</p>
                  <ReactPlayground codeText={Samples.ProgressBarAnimated} />

                  <h2 id='progress-stacked'>Stacked</h2>
                  <p>Nest <code>&lt;ProgressBar /&gt;</code>s to stack them.</p>
                  <ReactPlayground codeText={Samples.ProgressBarStacked} />

                  <h3 id='progress-props'>ProgressBar</h3>

                  <PropTable component='ProgressBar'/>
                </div>

                {/* Nav */}
                <div className='bs-docs-section'>
                  <h1 id='navs' className='page-header'>Navs <small>Nav, NavItem</small></h1>
                  <h2 id='navs-examples'>Example navs</h2>

                  <p>Navs come in two styles, <code>pills</code> and <code>tabs</code>. Disable a tab by adding <code>disabled</code>.</p>
                  <ReactPlayground codeText={Samples.NavBasic} />

                  <h3>Dropdown</h3>
                  <p>Add dropdowns using the <code>DropdownButton</code> component. Just make sure to set <code>navItem</code> property to true.</p>
                  <ReactPlayground codeText={Samples.NavDropdown} />

                  <h3>Stacked</h3>
                  <p>They can also be <code>stacked</code> vertically.</p>
                  <ReactPlayground codeText={Samples.NavStacked} />

                  <h3>Justified</h3>
                  <p>They can be <code>justified</code> to take the full width of their parent.</p>
                  <ReactPlayground codeText={Samples.NavJustified} />

                  <h3 id='navs-props'>Props</h3>

                  <h4>Nav</h4>
                  <PropTable component='Nav'/>

                  <h4>NavItem</h4>
                  <PropTable component='NavItem'/>

                </div>

                {/* Navbar */}
                <div className='bs-docs-section'>
                  <h1 id='navbars' className='page-header'>Navbars <small>Navbar, Nav, NavItem</small></h1>
                  <h2 id='navbars-examples'>Example navbars</h2>
                  <p>Navbars are by default accessible and will provide <code>role="navigation"</code>.</p>
                  <p>They also supports all the different Bootstrap classes as properties. Just camelCase the css class and remove navbar from it. For example <code>navbar-fixed-top</code> becomes the property <code>fixedTop</code>. The different properties are <code>fixedTop</code>, <code>fixedBottom</code>, <code>staticTop</code>, <code>inverse</code>, <code>fluid</code>.</p>
                  <p>You can drag elements to the right by specifying the <code>right</code> property on a nav group.</p>

                  <h3>Navbar Basic Example</h3>
                  <ReactPlayground codeText={Samples.NavbarBasic} />

                  <h3>Navbar Brand Example</h3>
                  <p>You can specify a brand by passing in a string to <code>brand</code>, or you can pass in a renderable component.</p>
                  <ReactPlayground codeText={Samples.NavbarBrand} />

                  <h3>Mobile Friendly</h3>
                  <p>To have a mobile friendly Navbar, specify the property <code>toggleNavKey</code> on the Navbar with a value corresponding to an <code>eventKey</code> of one of his <code>Nav</code> children. This child will be the one collapsed.</p>
                  <p>By setting the property {React.DOM.code(null, 'defaultNavExpanded={true}')} the Navbar will start expanded by default.</p>
                  <div className='bs-callout bs-callout-info'>
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

                  <h3>Mobile Friendly (Multiple Nav Components)</h3>
                  <p>To have a mobile friendly Navbar that handles multiple <code>Nav</code> components use <code>CollapsibleNav</code>. The <code>toggleNavKey</code> must still be set, however, the corresponding <code>eventKey</code> must now be on the <code>CollapsibleNav</code> component.</p>
                  <div className="bs-callout bs-callout-info">
                    <h4>Div collapse</h4>
                    <p>The <code>navbar-collapse</code> div gets created as the collapsible element which follows the <a href="http://getbootstrap.com/components/#navbar-default">bootstrap</a> collapsible navbar documentation.</p>
                    <pre>&lt;div class="collapse navbar-collapse"&gt;&lt;/div&gt;</pre>
                  </div>

                  <ReactPlayground codeText={Samples.CollapsibleNav} />
                  <h3 id='navbar-props'>Props</h3>

                  <h4>Navbar</h4>
                  <PropTable component='Navbar'/>
                </div>

                {/* Tabbed Areas */}
                <div className='bs-docs-section'>
                  <h1 id='tabs' className='page-header'>Togglable tabs <small>TabbedArea, TabPane</small></h1>
                  <h2 id='tabs-examples'>Example tabs</h2>
                  <p>Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus.</p>

                  <h3>Uncontrolled</h3>
                  <p>Allow the component to control its own state.</p>
                  <ReactPlayground codeText={Samples.TabbedAreaUncontrolled} exampleClassName='bs-example-tabs' />

                  <h3>Controlled</h3>
                  <p>Pass down the active state on render via props.</p>
                  <ReactPlayground codeText={Samples.TabbedAreaControlled} exampleClassName='bs-example-tabs' />

                  <h3>No animation</h3>
                  <p>Set the <code>animation</code> prop to <code>false</code></p>
                  <ReactPlayground codeText={Samples.TabbedAreaNoAnimation} exampleClassName='bs-example-tabs' />

                  <div className='bs-callout bs-callout-info'>
                    <h4>Extends tabbed navigation</h4>
                    <p>This plugin extends the <a href='#navs'>tabbed navigation component</a> to add tabbable areas.</p>
                  </div>

                  <h3 id='tabs-props'>Tabs</h3>

                  <h4>TabbedArea</h4>
                  <PropTable component='TabbedArea'/>

                  <h4>TabPane</h4>
                  <PropTable component='TabPane'/>
                </div>

                {/* Pager */}
                <div className='bs-docs-section'>
                  <h1 id='pager' className='page-header'>Pager<small> Pager, PageItem</small></h1>
                  <p>Quick previous and next links.</p>

                  <h3>Default</h3>
                  <p>Centers by default.</p>
                  <ReactPlayground codeText={Samples.PagerDefault} />

                  <h3>Aligned</h3>
                  <p>Set the <code>previous</code> or <code>next</code> prop to <code>true</code>, to align left or right.</p>
                  <ReactPlayground codeText={Samples.PagerAligned} />

                  <h3>Disabled</h3>
                  <p>Set the <code>disabled</code> prop to <code>true</code> to disable the link.</p>
                  <ReactPlayground codeText={Samples.PagerDisabled} />

                  <h3 id='pager-props'>Pager</h3>

                  <h4>Pager</h4>
                  <PropTable component='Pager'/>

                  <h4>PageItem</h4>
                  <PropTable component='PageItem'/>
                </div>

                {/* Pagination */}
                <div className='bs-docs-section'>
                  <h1 id='pagination' className='page-header'>Pagination <small>Pagination</small></h1>
                  <h2 id='pagination-examples'>Example pagination</h2>

                  <p>Provide pagination links for your site or app with the multi-page pagination component. Set <code>items</code> to the number of pages. <code>activePage</code> prop dictates which page is active</p>
                  <ReactPlayground codeText={Samples.PaginationBasic} />

                  <p>More options such as <code>first</code>, <code>last</code>, <code>previous</code>, <code>next</code> and <code>ellipsis</code>.</p>
                  <ReactPlayground codeText={Samples.PaginationAdvanced} />

                  <h3 id='pagination-props'>Pagination</h3>

                  <PropTable component='Pagination'/>
                </div>

                {/* Alerts */}
                <div className='bs-docs-section'>
                  <h1 id='alerts' className='page-header'>Alert messages <small>Alert</small></h1>
                  <h2 id='alerts-examples'>Example alerts</h2>

                  <p>Basic alert styles.</p>
                  <ReactPlayground codeText={Samples.AlertBasic} />

                  <p>Closeable alerts, just pass in a <code>onDismiss</code> function.</p>
                  <ReactPlayground codeText={Samples.AlertDismissable} />

                  <p>Auto close after a set time with <code>dismissAfter</code> prop.</p>
                  <ReactPlayground codeText={Samples.AlertAutoDismissable} />

                  <h3 id='alert-props'>Alert</h3>

                  <PropTable component='Alert'/>
                </div>

                {/* Carousels */}
                <div className='bs-docs-section'>
                  <h1 id='carousels' className='page-header'>Carousels <small>Carousel, CarouselItem</small></h1>
                  <h2 id='carousels-examples'>Example carousels</h2>

                  <h3>Uncontrolled</h3>
                  <p>Allow the component to control its own state.</p>
                  <ReactPlayground codeText={Samples.CarouselUncontrolled} exampleClassName='bs-example-tabs' />

                  <h3>Controlled</h3>
                  <p>Pass down the active state on render via props.</p>
                  <ReactPlayground codeText={Samples.CarouselControlled} exampleClassName='bs-example-tabs' />

                  <h3 id='carousels-props'>Props</h3>

                  <h4>Carousel</h4>
                  <PropTable component='Carousel'/>

                  <h4>CarouselItem</h4>
                  <PropTable component='CarouselItem'/>

                </div>

                {/* Grids */}
                <div className='bs-docs-section'>
                  <h1 id='grids' className='page-header'>Grids <small>Grid, Row, Col</small></h1>
                  <h2 id='grids-examples'>Example grids</h2>

                  <ReactPlayground codeText={Samples.GridBasic} exampleClassName='bs-example-tabs' />

                  <h3 id='grids-props'>Props</h3>

                  <h4>Grid</h4>
                  <PropTable component='Grid'/>

                  <h4>Row</h4>
                  <PropTable component='Row'/>

                  <h4>Col</h4>
                  <PropTable component='Col'/>
                </div>

                {/* Thumbnail */}
                <div className='bs-docs-section'>
                <h1 id='thumbnail' className='page-header'>Thumbnail</h1>
                <p>Thumbnails are designed to showcase linked images with minimal required markup. You can extend the grid component with thumbnails.</p>

                  <h3>Anchor Thumbnail</h3>
                  <p>Creates an anchor wrapping an image.</p>
                  <ReactPlayground codeText={Samples.ThumbnailAnchor} />

                  <h3>Divider Thumbnail</h3>
                  <p>Creates a divider wrapping an image and other children elements.</p>
                  <ReactPlayground codeText={Samples.ThumbnailDiv} />

                  <h3 id='grids-props'>Props</h3>

                  <PropTable component='Thumbnail'/>

                </div>

                {/* ListGroup */}
                <div className='bs-docs-section'>
                  <h1 id='listgroup' className='page-header'>List group<small> ListGroup, ListGroupItem</small></h1>
                  <p>Quick previous and next links.</p>

                  <h3>Default</h3>
                  <p>Centers by default.</p>
                  <ReactPlayground codeText={Samples.ListGroupDefault} />

                  <h3>Linked</h3>
                  <p>Set the <code>href</code> or <code>onClick</code> prop on <code>ListGroupItem</code>, to create a linked or clickable element.</p>
                  <ReactPlayground codeText={Samples.ListGroupLinked} />

                  <h3>Styling</h3>
                  <p>Set the <code>active</code> or <code>disabled</code> prop to <code>true</code> to mark or disable the item.</p>
                  <ReactPlayground codeText={Samples.ListGroupActive} />
                  <p>Set the <code>bsStyle</code> prop to style the item</p>
                  <ReactPlayground codeText={Samples.ListGroupStyle} />

                  <h3>With header</h3>
                  <p>Set the <code>header</code> prop to create a structured item, with a heading and a body area.</p>
                  <ReactPlayground codeText={Samples.ListGroupHeader} />

                  <h3 id='listgroup-props'>Props</h3>

                  <h4>ListGroup</h4>
                  <PropTable component='ListGroup'/>

                  <h4>ListGroupItem</h4>
                  <PropTable component='ListGroupItem'/>
                </div>

                {/* Labels */}
                <div className='bs-docs-section'>
                  <h1 id='labels' className='page-header'>Labels</h1>

                  <h2 id='label-static'>Example</h2>
                  <p>Create a <code>{'<Label>label</Label>'}</code> show highlight information</p>
                  <ReactPlayground codeText={Samples.Label} />
                  <h2 id='label-static'>Available variations</h2>
                  <p>Add any of the below mentioned modifier classes to change the appearance of a label.</p>
                  <ReactPlayground codeText={Samples.LabelVariations} />

                  <h3 id='label-props'>Props</h3>

                  <PropTable component='Label'/>
                </div>

                {/* Badges */}
                <div className='bs-docs-section'>
                  <h1 id='badges' className='page-header'>Badges</h1>
                  <p>Easily highlight new or unread items by adding a <code>{'<Badge>'}</code> to links, Bootstrap navs, and more.</p>
                  <h2 id='badge-static'>Example</h2>
                  <ReactPlayground codeText={Samples.Badge} />
                  <div className='bs-callout bs-callout-info'>
                    <h4>Cross-browser compatibility</h4>
                    <p>Unlike regular Bootstrap badges self collapse even in Internet Explorer 8.</p>
                  </div>

                  <h3 id='badges-props'>Props</h3>

                  <PropTable component='Badge'/>
                </div>

                {/* Jumbotron */}
                <div className='bs-docs-section'>
                  <h1 id='jumbotron' className='page-header'>Jumbotron</h1>
                  <p>A lightweight, flexible component that can optionally extend the entire viewport to showcase key content on your site.</p>
                  <h2 id='page-header-static'>Example</h2>
                  <ReactPlayground codeText={Samples.Jumbotron} />

                  <h3 id='jumbotron-props'>Props</h3>

                  <PropTable component='Jumbotron'/>
                </div>

                {/* Page Header */}
                <div className='bs-docs-section'>
                  <h1 id='page-header' className='page-header'>Page Header</h1>
                  <p>A simple shell for an <code>h1</code> to appropriately space out and segment sections of content on a page. It can utilize the <code>h1</code>&#8217;s default <code>small</code> element, as well as most other components (with additional styles).</p>
                  <h2 id='page-header-static'>Example</h2>
                  <ReactPlayground codeText={Samples.PageHeader} />
                </div>

                {/* Wells */}
                <div className='bs-docs-section'>
                  <h1 id='wells' className='page-header'>Wells</h1>
                  <p>Use the well as a simple effect on an element to give it an inset effect.</p>
                  <h2 id='well-static'>Default Wells</h2>
                  <ReactPlayground codeText={Samples.Well} />
                  <h2 id='well-optins-static'>Optional classes</h2>
                  <p>Control padding and rounded corners with two optional modifier classes.</p>
                  <ReactPlayground codeText={Samples.WellSizes} />

                  <h3 id='wells-props'>Props</h3>

                  <PropTable component='Well'/>
                </div>

                {/* Glyphicons */}
                <div className='bs-docs-section'>
                  <h1 id='glyphicons' className='page-header'>Glyphicons</h1>
                  <p>Use them in buttons, button groups for a toolbar, navigation, or prepended form inputs.</p>
                  <h2 id='glyphicon-static'>Example</h2>
                  <ReactPlayground codeText={Samples.Glyphicon} />

                  <h3 id='glyphicons-props'>Props</h3>

                  <PropTable component='Glyphicon'/>
                </div>

                {/* Tables */}
                <div className='bs-docs-section'>
                  <h1 id='tables' className='page-header'>Tables</h1>

                  <h2 id='table-basic'>Example</h2>
                  <p>Use the <code>striped</code>, <code>bordered</code>, <code>condensed</code> and <code>hover</code> props to customise the table.</p>
                  <ReactPlayground codeText={Samples.TableBasic} />
                  <h2 id='table-responsive'>Responsive</h2>
                  <p>Add <code>responsive</code> prop to make them scroll horizontally up to small devices (under 768px). When viewing on anything larger than 768px wide, you will not see any difference in these tables.</p>
                  <ReactPlayground codeText={Samples.TableResponsive} />

                  <h3 id='table-props'>Props</h3>

                  <PropTable component='Table'/>
                </div>

                {/* Input */}
                <div className='bs-docs-section'>
                  <h1 id='input' className='page-header'>Input</h1>
                  <p>Renders an input in bootstrap wrappers. Supports label, help, text input add-ons, validation and use as wrapper.
                  Use <code>getValue()</code> or <code>getChecked()</code> to get the current state.
                  The helper method <code>getInputDOMNode()</code> returns the internal input element. If you don't want the <code>form-group</code> class applied apply the prop named <code>standalone</code>.</p>
                  <ReactPlayground codeText={Samples.Input} />
                  <h2 id='input-types'>Types</h2>
                  <p>Supports <code>select</code>, <code>textarea</code>, as well as standard HTML input types. <code>getValue()</code> returns an array for multiple select.</p>
                  <ReactPlayground codeText={Samples.InputTypes} />
                  <p>Static text can be added to your form controls through the use of the <code>FormControls.Static</code> component.</p>
                  <ReactPlayground codeText={Samples.StaticText} />
                  <h2 id='button-input-types'>Button Input Types</h2>
                  <p>Form buttons are encapsulated by <code>ButtonInput</code>. Pass in <code>type="reset"</code> or <code>type="submit"</code> to suit your needs. Styling is the same as <code>Button</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonInput} />
                  <h2 id='input-addons'>Add-ons</h2>
                  <p>Use <code>addonBefore</code> and <code>addonAfter</code> for normal addons, <code>buttonBefore</code> and <code>buttonAfter</code> for button addons.
                  Exotic configurations may require some css on your side.</p>
                  <ReactPlayground codeText={Samples.InputAddons} />
                  <h2 id='input-sizes'>Sizes</h2>
                  <p>Use <code>bsSize</code> to change the size of inputs. It also works with addons and most other options.</p>
                  <ReactPlayground codeText={Samples.InputSizes} />
                  <h2 id='input-validation'>Validation</h2>
                  <p>Set <code>bsStyle</code> to one of <code>success</code>, <code>warning</code> or <code>error</code>.
                  Add <code>hasFeedback</code> to show glyphicon. Glyphicon may need additional styling if there is an add-on or no label.</p>
                  <ReactPlayground codeText={Samples.InputValidation} />
                  <h2 id='input-horizontal'>Horizontal forms</h2>
                  <p>Use <code>labelClassName</code> and <code>wrapperClassName</code> properties to add col classes manually.
                  <code>checkbox</code> and <code>radio</code> types need special treatment because label wraps input.</p>
                  <ReactPlayground codeText={Samples.InputHorizontal} />
                  <h2 id='input-wrapper'>Use as a wrapper</h2>
                  <p>If <code>type</code> is not set, child element(s) will be rendered instead of an input element.
                  <code>getValue()</code> will not work when used this way.</p>
                  <ReactPlayground codeText={Samples.InputWrapper} />

                  <h3 id='input-props'>Props</h3>

                  <PropTable component='InputBase'/>
                </div>

                {/* Utilities */}
                <div className='bs-docs-section'>
                  <h1 id='utilities' className='page-header'>Utilities <small>Portal</small></h1>

                  <h2 id='utilities-portal'>Portal</h2>
                  <p>
                    A Component that renders its children into a new React "subtree" or <code>container</code>. The Portal component kind of like the React
                    equivillent to jQuery's <code>.appendTo()</code>, which is helpful for components that need to be appended to a DOM node other than
                    the component's direct parent. The Modal, and Overlay components use the Portal component internally.
                  </p>
                  <h3 id='utilities-props'>Props</h3>

                  <PropTable component='Portal'/>

                  <h2 id='utilities-position'>Position</h2>
                  <p>
                    A Component that absolutely positions its child to a <code>target</code> component or DOM node. Useful for creating custom
                    popups or tooltips. Used by the Overlay Components.
                  </p>
                  <h3 id='utilities-props'>Props</h3>

                  <PropTable component='Position'/>
                </div>
              </div>



              <div className='col-md-3'>
                <Affix
                  className='bs-docs-sidebar hidden-print'
                  role='complementary'
                  offsetTop={this.state.navOffsetTop}
                  offsetBottom={this.state.navOffsetBottom}>
                  <Nav
                    className='bs-docs-sidenav'
                    activeHref={this.state.activeNavItemHref}
                    onSelect={this.handleNavItemSelect}
                    ref='sideNav'>
                    <SubNav href='#buttons' key={1} text='Buttons'>
                      <NavItem href='#btn-groups' key={2}>Button groups</NavItem>
                      <NavItem href='#btn-dropdowns' key={3}>Button dropdowns</NavItem>
                      <NavItem href='#menu-item' key={25}>Menu Item</NavItem>
                    </SubNav>
                    <NavItem href='#panels' key={4}>Panels</NavItem>
                    <NavItem href='#modals' key={5}>Modals</NavItem>
                    <NavItem href='#overlays' key={27}>Overlays</NavItem>
                    <NavItem href='#tooltips' key={6}>Tooltips</NavItem>
                    <NavItem href='#popovers' key={7}>Popovers</NavItem>
                    <NavItem href='#progress' key={8}>Progress bars</NavItem>
                    <NavItem href='#navs' key={9}>Navs</NavItem>
                    <NavItem href='#navbars' key={10}>Navbars</NavItem>
                    <NavItem href='#tabs' key={11}>Togglable tabs</NavItem>
                    <NavItem href='#pager' key={12}>Pager</NavItem>
                    <NavItem href='#pagination' key={13}>Pagination</NavItem>
                    <NavItem href='#alerts' key={14}>Alerts</NavItem>
                    <NavItem href='#carousels' key={15}>Carousels</NavItem>
                    <NavItem href='#grids' key={16}>Grids</NavItem>
                    <NavItem href='#thumbnail' key={17}>Thumbnail</NavItem>
                    <NavItem href='#listgroup' key={18}>List group</NavItem>
                    <NavItem href='#labels' key={19}>Labels</NavItem>
                    <NavItem href='#badges' key={20}>Badges</NavItem>
                    <NavItem href='#jumbotron' key={21}>Jumbotron</NavItem>
                    <NavItem href='#page-header' key={22}>Page Header</NavItem>
                    <NavItem href='#wells' key={23}>Wells</NavItem>
                    <NavItem href='#glyphicons' key={24}>Glyphicons</NavItem>
                    <NavItem href='#tables' key={25}>Tables</NavItem>
                    <NavItem href='#input' key={26}>Input</NavItem>

                    <NavItem href='#utilities' key={26}>Utilities</NavItem>
                  </Nav>
                  <a className='back-to-top' href='#top'>
                  Back to top
                  </a>
                </Affix>
              </div>
            </div>
          </div>

          <PageFooter ref='footer' />
        </div>
      );
  }
});

export default ComponentsPage;
