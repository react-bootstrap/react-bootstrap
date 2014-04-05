/** @jsx React.DOM */

'use strict';

var React = require('react');
var fs = require('fs');

var NavMain = require('./NavMain');
var DocsPageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');
var ReactPlayground = require('./ReactPlayground');

var ButtonTypesText = fs.readFileSync(__dirname + '/../examples/ButtonTypes.js', {encoding: 'utf8'});
var ButtonSizesText = fs.readFileSync(__dirname + '/../examples/ButtonSizes.js', {encoding: 'utf8'});
var ButtonBlockText = fs.readFileSync(__dirname + '/../examples/ButtonBlock.js', {encoding: 'utf8'});
var ButtonActiveText = fs.readFileSync(__dirname + '/../examples/ButtonActive.js', {encoding: 'utf8'});
var ButtonDisabledText = fs.readFileSync(__dirname + '/../examples/ButtonDisabled.js', {encoding: 'utf8'});
var ButtonTagTypesText = fs.readFileSync(__dirname + '/../examples/ButtonTagTypes.js', {encoding: 'utf8'});
var ButtonLoadingText = fs.readFileSync(__dirname + '/../examples/ButtonLoading.js', {encoding: 'utf8'});
var ButtonGroupBasicText = fs.readFileSync(__dirname + '/../examples/ButtonGroupBasic.js', {encoding: 'utf8'});
var ButtonToolbarBasicText = fs.readFileSync(__dirname + '/../examples/ButtonToolbarBasic.js', {encoding: 'utf8'});
var ButtonGroupSizesText = fs.readFileSync(__dirname + '/../examples/ButtonGroupSizes.js', {encoding: 'utf8'});
var ButtonGroupNestedText = fs.readFileSync(__dirname + '/../examples/ButtonGroupNested.js', {encoding: 'utf8'});
var ButtonGroupVerticalText = fs.readFileSync(__dirname + '/../examples/ButtonGroupVertical.js', {encoding: 'utf8'});
var ButtonGroupJustifiedText = fs.readFileSync(__dirname + '/../examples/ButtonGroupJustified.js', {encoding: 'utf8'});
var DropdownButtonBasicText = fs.readFileSync(__dirname + '/../examples/DropdownButtonBasic.js', {encoding: 'utf8'});
var SplitButtonBasicText = fs.readFileSync(__dirname + '/../examples/SplitButtonBasic.js', {encoding: 'utf8'});
var DropdownButtonSizesText = fs.readFileSync(__dirname + '/../examples/DropdownButtonSizes.js', {encoding: 'utf8'});
var SplitButtonDropupText = fs.readFileSync(__dirname + '/../examples/SplitButtonDropup.js', {encoding: 'utf8'});
var SplitButtonRightText = fs.readFileSync(__dirname + '/../examples/SplitButtonRight.js', {encoding: 'utf8'});

var PanelBasic = fs.readFileSync(__dirname + '/../examples/PanelBasic.js', {encoding: 'utf8'});
var PanelWithHeading = fs.readFileSync(__dirname + '/../examples/PanelWithHeading.js', {encoding: 'utf8'});
var PanelWithFooter = fs.readFileSync(__dirname + '/../examples/PanelWithFooter.js', {encoding: 'utf8'});
var PanelContextual = fs.readFileSync(__dirname + '/../examples/PanelContextual.js', {encoding: 'utf8'});
var PanelGroupControlled = fs.readFileSync(__dirname + '/../examples/PanelGroupControlled.js', {encoding: 'utf8'});
var PanelGroupUncontrolled = fs.readFileSync(__dirname + '/../examples/PanelGroupUncontrolled.js', {encoding: 'utf8'});
var PanelGroupAccordion = fs.readFileSync(__dirname + '/../examples/PanelGroupAccordion.js', {encoding: 'utf8'});

var ModalStatic = fs.readFileSync(__dirname + '/../examples/ModalStatic.js', {encoding: 'utf8'});
var ModalOverlayTrigger = fs.readFileSync(__dirname + '/../examples/ModalOverlayTrigger.js', {encoding: 'utf8'});
var ModalOverlayTriggerMixin = fs.readFileSync(__dirname + '/../examples/ModalOverlayTriggerMixin.js', {encoding: 'utf8'});

var ProgressBarBasic = fs.readFileSync(__dirname + '/../examples/ProgressBarBasic.js', {encoding: 'utf8'});
var ProgressBarWithLabel = fs.readFileSync(__dirname + '/../examples/ProgressBarWithLabel.js', {encoding: 'utf8'});
var ProgressBarScreenreaderLabel = fs.readFileSync(__dirname + '/../examples/ProgressBarScreenreaderLabel.js', {encoding: 'utf8'});
var ProgressBarContextual = fs.readFileSync(__dirname + '/../examples/ProgressBarContextual.js', {encoding: 'utf8'});
var ProgressBarStriped = fs.readFileSync(__dirname + '/../examples/ProgressBarStriped.js', {encoding: 'utf8'});
var ProgressBarAnimated = fs.readFileSync(__dirname + '/../examples/ProgressBarAnimated.js', {encoding: 'utf8'});
var ProgressBarStacked = fs.readFileSync(__dirname + '/../examples/ProgressBarStacked.js', {encoding: 'utf8'});

var Label = fs.readFileSync(__dirname + '/../examples/Label.js', {encoding: 'utf8'});
var LabelVariations = fs.readFileSync(__dirname + '/../examples/LabelVariations.js', {encoding: 'utf8'});
var Badge = fs.readFileSync(__dirname + '/../examples/Badge.js', {encoding: 'utf8'});
var Jumbotron = fs.readFileSync(__dirname + '/../examples/Jumbotron.js', {encoding: 'utf8'});
var PageHeader = fs.readFileSync(__dirname + '/../examples/PageHeader.js', {encoding: 'utf8'});
var Well = fs.readFileSync(__dirname + '/../examples/Well.js', {encoding: 'utf8'});
var WellSizes = fs.readFileSync(__dirname + '/../examples/WellSizes.js', {encoding: 'utf8'});
var Glyphicon = fs.readFileSync(__dirname + '/../examples/Glyphicon.js', {encoding: 'utf8'});

var ComponentsPage = React.createClass({
  render: function () {
    return (
        <div>
          <NavMain activePage="components" />

          <DocsPageHeader
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
                  <ReactPlayground codeText={ButtonTypesText} />

                  <h2 id="buttons-sizes">Sizes</h2>
                  <p>Fancy larger or smaller buttons? Add <code>bsSize="large"</code>, <code>bsSize="small"</code>, or <code>bsSize="xsmall"</code> for additional sizes.</p>
                  <ReactPlayground codeText={ButtonSizesText} />

                  <p>Create block level buttons—those that span the full width of a parent— by adding the
                      <code>block</code> prop.</p>
                  <ReactPlayground codeText={ButtonBlockText} />

                  <h2 id="buttons-active">Active state</h2>
                  <p>To set a buttons active state simply set the components <code>active</code> prop.</p>
                  <ReactPlayground codeText={ButtonActiveText} />

                  <h2 id="buttons-disabled">Disabled state</h2>
                  <p>Make buttons look unclickable by fading them back 50%. To do this add the <code>disabled</code>
                    attribute to buttons.</p>
                  <ReactPlayground codeText={ButtonDisabledText} />

                  <div className="bs-callout bs-callout-warning">
                    <h4>Event handler functionality not impacted</h4>
                    <p>This prop will only change the <code>{'<Button />'}</code>&#8217;s appearance, not its
                      functionality. Use custom logic to disable the effect of the <code>onClick</code> handlers.</p>
                  </div>

                  <h2 id="buttons-tags">Button tags</h2>
                  <p>The DOM element tag is choosen automaticly for you based on the props you supply. Passing a
                    <code>href</code> will result in the button using a <code>{'<a />'}</code> element otherwise a
                    <code>{'<button />'}</code> element will be used.</p>
                  <ReactPlayground codeText={ButtonTagTypesText} />

                  <h2 id="buttons-tags">Button loading state</h2>
                  <p>When activating an asynchronous action from a button it is a good UX pattern to give the user
                    feedback as to the loading state, this can easily be done by updating your
                    <code>{'<Button />'}</code>&#8217;s props from a state change like below.</p>
                  <ReactPlayground codeText={ButtonLoadingText} />
                </div>

                {/* Button Groups */}
                <div className="bs-docs-section">
                  <h1 id="btn-groups" className="page-header">Button groups <small>ButtonGroup, ButtonToolbar</small></h1>
                  <p className="lead">Group a series of buttons together on a single line with the button group.</p>

                  <h3 id="btn-groups-single">Basic example</h3>
                  <p>Wrap a series of <code>{'<Button />'}</code>&#8217;s in a <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={ButtonGroupBasicText} />

                  <h3 id="btn-groups-toolbar">Button toolbar</h3>
                  <p>Combine sets of <code>{'<ButtonGroup />'}</code>&#8217;s into a <code>{'<ButtonToolbar />'}</code>
                    for more complex components.</p>
                  <ReactPlayground codeText={ButtonToolbarBasicText} />

                  <h3 id="btn-groups-sizing">Sizing</h3>
                  <p>Instead of applying button sizing props to every button in a group, just add <code>bsSize</code>
                    prop to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={ButtonGroupSizesText} />

                  <h3 id="btn-groups-nested">Nesting</h3>
                  <p>You can place other button types within the <code>{'<ButtonGroup />'}</code> like
                    <code>{'<DropdownButton />'}</code>&#8217;s.</p>
                  <ReactPlayground codeText={ButtonGroupNestedText} />

                  <h3 id="btn-groups-vertical">Vertical variation</h3>
                  <p>Make a set of buttons appear vertically stacked rather than horizontally.
                    <strong className="text-danger">Split button dropdowns are not supported here.</strong></p>
                  <p>Just add <code>vertical</code> to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={ButtonGroupVerticalText} />

                  <h3 id="btn-groups-justified">Justified button groups</h3>
                  <p>Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.</p>
                  <div className="bs-callout bs-callout-warning">
                    <h4>Style issues</h4>
                    <p>There are some issues and workarounds required when using this property, please see <a href="http://getbootstrap.com/components/#btn-groups-justified">bootstrap&#8217;s button group docs</a> for more specifics.</p>
                  </div>
                  <p>Just add <code>justified</code> to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={ButtonGroupJustifiedText} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="btn-dropdowns" className="page-header">Button dropdowns</h1>
                  <p className="lead">Use <code>{'<DropdownButton />'}</code> or <code>{'<SplitButton />'}</code> components to display a button with a dropdown menu.</p>

                  <h3 id="btn-dropdowns-single">Single button dropdowns</h3>
                  <p>Create a dropdown button with the <code>{'<DropdownButton />'}</code> component.</p>
                  <ReactPlayground codeText={DropdownButtonBasicText} />

                  <h3 id="btn-dropdowns-split">Split button dropdowns</h3>
                  <p>Similarly, create split button dropdowns with the <code>{'<SplitButton />'}</code> component.</p>
                  <ReactPlayground codeText={SplitButtonBasicText} />

                  <h3 id="btn-dropdowns-sizing">Sizing</h3>
                  <p>Button dropdowns work with buttons of all sizes.</p>
                  <ReactPlayground codeText={DropdownButtonSizesText} />

                  <h3 id="btn-dropdowns-dropup">Dropup variation</h3>
                  <p>Trigger dropdown menus that site above the button by adding the <code>dropup</code> prop.</p>
                  <ReactPlayground codeText={SplitButtonDropupText} />

                  <h3 id="btn-dropdowns-right">Dropdown right variation</h3>
                  <p>Trigger dropdown menus that align to the right of the button using the <code>pullRight</code> prop.</p>
                  <ReactPlayground codeText={SplitButtonRightText} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="panels" className="page-header">Panels <small>Panel, PanelGroup, Accordion</small></h1>

                  <h3 id="panels-basic">Basic example</h3>
                  <p>By default, all the <code>&lt;Panel /&gt;</code> does is apply some basic border and padding to contain some content.</p>
                  <ReactPlayground codeText={PanelBasic} />

                  <h3 id="panels-heading">Panel with heading</h3>
                  <p>Easily add a heading container to your panel with the <code>header</code> prop.</p>
                  <ReactPlayground codeText={PanelWithHeading} />

                  <h3 id="panels-footer">Panel with footer</h3>
                  <p>Pass buttons or secondary text in the <code>footer</code> prop. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground.</p>
                  <ReactPlayground codeText={PanelWithFooter} />

                  <h3 id="panels-contextual">Contextual alternatives</h3>
                  <p>Like other components, easily make a panel more meaningful to a particular context by adding a <code>bsStyle</code> prop.</p>
                  <ReactPlayground codeText={PanelContextual} />

                  <h3 id="panels-controlled">Controlled PanelGroups</h3>
                  <p><code>PanelGroup</code>s can be controlled by a parent component. The <code>activeKey</code> prop dictates which panel is open.</p>
                  <ReactPlayground codeText={PanelGroupControlled} />

                  <h3 id="panels-uncontrolled">Uncontrolled PanelGroups</h3>
                  <p><code>PanelGroup</code>s can also be uncontrolled where they manage their own state. The <code>defualtActiveKey</code> prop dictates which panel is open when initially.</p>
                  <ReactPlayground codeText={PanelGroupUncontrolled} />

                  <h3 id="panels-accordion">Accordions</h3>
                  <p><code>&lt;Accordion /&gt;</code> aliases <code>&lt;PanelGroup isAccordion /&gt;</code>.</p>
                  <ReactPlayground codeText={PanelGroupAccordion} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="modals" className="page-header">Modals <small>Modal</small></h1>

                  <h3 id="modals-static">A static example</h3>
                  <p>A rendered modal with header, body, and set of actions in the footer.</p>
                  <p>The header is added automatically if you pass in a <code>title</code> prop.</p>
                  <ReactPlayground codeText={ModalStatic} />

                  <h3 id="modals-static">Live demo</h3>
                  <p>Use <code>&lt;OverlayTrigger /&gt;</code> to create a real modal that's added to the document body when opened.</p>
                  <ReactPlayground codeText={ModalOverlayTrigger} />

                  <h3 id="modals-static">Custom trigger</h3>
                  <p>Use <code>&lt;OverlayTriggerMixin /&gt;</code> in a custom component to manage the modal's state yourself.</p>
                  <ReactPlayground codeText={ModalOverlayTriggerMixin} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="progress" className="page-header">Progress bars <small>ProgressBar</small></h1>

                  <p className="lead">Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.</p>

                  <h2 id="modals-static">Basic example</h2>
                  <p>Default progress bar.</p>
                  <ReactPlayground codeText={ProgressBarBasic} />

                  <h2 id="modals-label">With label</h2>
                  <p>Add a <code>label</code> prop to show a visible percentage. For low percentages, consider adding a min-width to ensure the label's text is fully visible.</p>
                  <p>The following keys are interpolated with the current values: <code>%(min)s</code>, <code>%(max)s</code>, <code>%(now)s</code>, <code>%(percent)s</code>, <code>%(bsStyle)s</code></p>
                  <ReactPlayground codeText={ProgressBarWithLabel} />

                  <h2 id="modals-label">Screenreader only label</h2>
                  <p>Add a <code>srOnly</code> prop to hide the label visually.</p>
                  <ReactPlayground codeText={ProgressBarScreenreaderLabel} />

                  <h2 id="modals-label">Contextual alternatives</h2>
                  <p>Progress bars use some of the same button and alert classes for consistent styles.</p>
                  <ReactPlayground codeText={ProgressBarContextual} />

                  <h2 id="modals-label">Striped</h2>
                  <p>Uses a gradient to create a striped effect. Not available in IE8.</p>
                  <ReactPlayground codeText={ProgressBarStriped} />

                  <h2 id="modals-label">Animated</h2>
                  <p>Add <code>active</code> prop to animate the stripes right to left. Not available in IE9 and below.</p>
                  <ReactPlayground codeText={ProgressBarAnimated} />

                  <h2 id="modals-label">Stacked</h2>
                  <p>Nest <code>&lt;ProgressBar /&gt;</code>s to stack them.</p>
                  <ReactPlayground codeText={ProgressBarStacked} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="labels" className="page-header">Labels</h1>
                  <h2 id="label-static">Example</h2>
                  <p>Create a <code>{'<Label>label</Label>'}</code> show highlight information</p>
                  <ReactPlayground codeText={Label} />
                  <h2 id="label-static">Available variations</h2>
                  <p>Add any of the below mentioned modifier classes to change the appearance of a label.</p>
                  <ReactPlayground codeText={LabelVariations} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="badges" className="page-header">Badges</h1>
                  <p>Easily highlight new or unread items by adding a <code>{'<Badge>badge</Badge>'}</code> to links, Bootstrap navs, and more.</p>
                  <ReactPlayground codeText={Badge} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="jumbotron" className="page-header">Jumbotron</h1>
                  <p>A lightweight, flexible component that can optionally extend the entire viewport to showcase key content on your site.</p>
                  <p>To make the jumbotron full width, and without rounded corners, place it outside all .containers and instead add a .container within.</p>
                  <ReactPlayground codeText={Jumbotron} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="page-header" className="page-header">Page Header</h1>
                  <p>A simple shell for an <code>h1</code> to appropriately space out and segment sections of content on a page. It can utilize the <code>h1</code>&#8217;s default <code>small</code> element, as well as most other components (with additional styles).</p>
                  <ReactPlayground codeText={PageHeader} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="wells" className="page-header">Wells</h1>
                  <h2 id="well-static">Default Wells</h2>
                  <p>Use the well as a simple effect on an element to give it an inset effect.</p>
                  <ReactPlayground codeText={Well} />
                  <h2 id="well-optins-static">Optional classes</h2>
                  <p>Control padding and rounded corners with two optional modifier classes.</p>
                    <ReactPlayground codeText={WellSizes} />
                </div>

                <div className="bs-docs-section">
                  <h1 id="glyphicons" className="page-header">Glyphicons</h1>
                  <p>Use them in buttons, button groups for a toolbar, navigation, or prepended form inputs.</p>
                    <ReactPlayground codeText={Glyphicon} />
                </div>
              </div>

              <div className="col-md-3">
                <div className="bs-docs-sidebar hidden-print affix-top" role="complementary">
                  <ul className="nav bs-docs-sidenav">
                    <li>
                      <a href="#buttons">Buttons</a>
                    </li>
                    <li>
                      <a href="#btn-groups">Button groups</a>
                    </li>
                    <li>
                      <a href="#btn-dropdowns">Button dropdowns</a>
                    </li>
                    <li>
                      <a href="#panels">Panels</a>
                    </li>
                    <li>
                      <a href="#modals">Modals</a>
                    </li>
                    <li>
                      <a href="#progress">Progress bars</a>
                    </li>
                    <li>
                      <a href="#labels">Labels</a>
                    </li>
                    <li>
                      <a href="#badges">Badges</a>
                    </li>
                    <li>
                      <a href="#jumbotron">Jumbotron</a>
                    </li>
                    <li>
                      <a href="#page-header">Page Header</a>
                    </li>
                    <li>
                      <a href="#wells">Wells</a>
                    </li>
                    <li>
                      <a href="#glyphicons">Glyphicons</a>
                    </li>
                  </ul>
                  <a className="back-to-top" href="#top">
                  Back to top
                  </a>
                </div>
              </div>
            </div>
          </div>

          <PageFooter />
        </div>
      );
  }
});

module.exports = ComponentsPage;