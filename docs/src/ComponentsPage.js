/* eslint no-path-concat: 0, react/no-did-mount-set-state: 0 */

import React from 'react';

import Affix from '../../src/Affix';
import Nav from '../../src/Nav';
import SubNav from '../../src/SubNav';
import NavItem from '../../src/NavItem';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
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
    let elem = React.findDOMNode(this.refs.sideNav),
        domUtils = Affix.domUtils,
        sideNavOffsetTop = domUtils.getOffset(elem).top,
        sideNavMarginTop = parseInt(domUtils.getComputedStyles(elem.firstChild).marginTop, 10),
        topNavHeight = React.findDOMNode(this.refs.topNav).offsetHeight;

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
                  <p>The DOM element tag is choosen automaticly for you based on the props you supply. Passing
                    a <code>href</code> will result in the button using a <code>{'<a />'}</code> element otherwise
                    a <code>{'<button />'}</code> element will be used.</p>
                  <ReactPlayground codeText={Samples.ButtonTagTypes} />

                  <h2 id='buttons-tags'>Button loading state</h2>
                  <p>When activating an asynchronous action from a button it is a good UX pattern to give the user
                    feedback as to the loading state, this can easily be done by updating
                    your <code>{'<Button />'}</code>&#8217;s props from a state change like below.</p>
                  <ReactPlayground codeText={Samples.ButtonLoading} />
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

                  <h3 id='btn-groups-justified'>Justified button groups</h3>
                  <p>Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.</p>
                  <div className='bs-callout bs-callout-warning'>
                    <h4>Style issues</h4>
                    <p>There are some issues and workarounds required when using this property, please see <a href='http://getbootstrap.com/components/#btn-groups-justified'>bootstrap&#8217;s button group docs</a> for more specifics.</p>
                  </div>
                  <p>Just add <code>justified</code> to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={Samples.ButtonGroupJustified} />
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
                </div>

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
                </div>

                {/* Tooltip */}
                <div className='bs-docs-section'>
                  <h1 id='tooltips' className='page-header'>Tooltips <small>Tooltip</small></h1>
                  <h2 id='tooltips-examples'>Example tooltips</h2>

                  <p>Tooltip component.</p>
                  <ReactPlayground codeText={Samples.TooltipBasic} />

                  <p>Positioned tooltip component.</p>
                  <ReactPlayground codeText={Samples.TooltipPositioned} />

                  <p>Positioned tooltip in copy.</p>
                  <ReactPlayground codeText={Samples.TooltipInCopy} />
                </div>

                {/* Popover */}
                <div className='bs-docs-section'>
                  <h1 id='popovers' className='page-header'>Popovers <small>Popover</small></h1>
                  <h2 id='popovers-examples'>Example popovers</h2>

                  <p>Popover component.</p>
                  <ReactPlayground codeText={Samples.PopoverBasic} />

                  <p>Positioned popover component.</p>
                  <ReactPlayground codeText={Samples.PopoverPositioned} />

                  <p>Trigger behaviors. It's inadvisable to use <code>"hover"</code> or <code>"focus"</code> triggers for popovers, because they have poor accessibility from keyboard and on mobile devices.</p>
                  <ReactPlayground codeText={Samples.PopoverTriggerBehaviors} />

                  <p>Popover component in container.</p>
                  <ReactPlayground codeText={Samples.PopoverContained} exampleClassName='bs-example-popover-contained' />

                  <p>Positioned popover components in scrolling container.</p>
                  <ReactPlayground codeText={Samples.PopoverPositionedScrolling} exampleClassName='bs-example-popover-scroll' />
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
                </div>

                {/* Grids */}
                <div className='bs-docs-section'>
                  <h1 id='grids' className='page-header'>Grids <small>Grid, Row, Col</small></h1>
                  <h2 id='grids-examples'>Example grids</h2>

                  <ReactPlayground codeText={Samples.GridBasic} exampleClassName='bs-example-tabs' />
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
                </div>

                {/* Jumbotron */}
                <div className='bs-docs-section'>
                  <h1 id='jumbotron' className='page-header'>Jumbotron</h1>
                  <p>A lightweight, flexible component that can optionally extend the entire viewport to showcase key content on your site.</p>
                  <h2 id='page-header-static'>Example</h2>
                  <ReactPlayground codeText={Samples.Jumbotron} />
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
                </div>

                {/* Glyphicons */}
                <div className='bs-docs-section'>
                  <h1 id='glyphicons' className='page-header'>Glyphicons</h1>
                  <p>Use them in buttons, button groups for a toolbar, navigation, or prepended form inputs.</p>
                  <h2 id='glyphicon-static'>Example</h2>
                  <ReactPlayground codeText={Samples.Glyphicon} />
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
                </div>

                {/* Input */}
                <div className='bs-docs-section'>
                  <h1 id='input' className='page-header'>Input</h1>
                  <p>Renders an input in bootstrap wrappers. Supports label, help, text input add-ons, validation and use as wrapper.
                  Use <code>getValue()</code> or <code>getChecked()</code> to get the current state.
                  The helper method <code>getInputDOMNode()</code> returns the internal input element. If you don't want the <code>form-group</code> class applied apply the prop named <code>standalone</code>.</p>
                  <ReactPlayground codeText={Samples.Input} />
                  <h2 id='input-types'>Types</h2>
                  <p>Supports <code>select</code>, <code>textarea</code>, <code>static</code> as well as standard HTML input types. <code>getValue()</code> returns an array for multiple select.</p>
                  <ReactPlayground codeText={Samples.InputTypes} />
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
                    </SubNav>
                    <NavItem href='#panels' key={4}>Panels</NavItem>
                    <NavItem href='#modals' key={5}>Modals</NavItem>
                    <NavItem href='#tooltips' key={6}>Tooltips</NavItem>
                    <NavItem href='#popovers' key={7}>Popovers</NavItem>
                    <NavItem href='#progress' key={8}>Progress bars</NavItem>
                    <NavItem href='#navs' key={9}>Navs</NavItem>
                    <NavItem href='#navbars' key={10}>Navbars</NavItem>
                    <NavItem href='#tabs' key={11}>Togglable tabs</NavItem>
                    <NavItem href='#pager' key={12}>Pager</NavItem>
                    <NavItem href='#alerts' key={13}>Alerts</NavItem>
                    <NavItem href='#carousels' key={14}>Carousels</NavItem>
                    <NavItem href='#grids' key={15}>Grids</NavItem>
                    <NavItem href='#thumbnail' key={16}>Thumbnail</NavItem>
                    <NavItem href='#listgroup' key={17}>List group</NavItem>
                    <NavItem href='#labels' key={18}>Labels</NavItem>
                    <NavItem href='#badges' key={19}>Badges</NavItem>
                    <NavItem href='#jumbotron' key={20}>Jumbotron</NavItem>
                    <NavItem href='#page-header' key={21}>Page Header</NavItem>
                    <NavItem href='#wells' key={22}>Wells</NavItem>
                    <NavItem href='#glyphicons' key={23}>Glyphicons</NavItem>
                    <NavItem href='#tables' key={24}>Tables</NavItem>
                    <NavItem href='#input' key={25}>Input</NavItem>
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
