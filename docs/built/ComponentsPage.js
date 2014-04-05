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

var ComponentsPage = React.createClass({displayName: 'ComponentsPage',
  render: function () {
    return (
        React.DOM.div(null,
          NavMain( {activePage:"components"} ),

          DocsPageHeader(
            {title:"Components",
            subTitle:""} ),

          React.DOM.div( {className:"container bs-docs-container"},
            React.DOM.div( {className:"row"},
              React.DOM.div( {className:"col-md-9", role:"main"},

                /* Buttons */
                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"buttons", className:"page-header"}, "Buttons ", React.DOM.small(null, "Button")),
                  React.DOM.h2( {id:"buttons-options"}, "Options"),
                  React.DOM.p(null, "Use any of the available button style types to quickly create a styled button. Just modify the ",
                    React.DOM.code(null, "bsStyle"), " prop."),
                  ReactPlayground( {codeText:ButtonTypesText} ),

                  React.DOM.h2( {id:"buttons-sizes"}, "Sizes"),
                  React.DOM.p(null, "Fancy larger or smaller buttons? Add ", React.DOM.code(null, "bsSize=\"large\""),", ", React.DOM.code(null, "bsSize=\"small\""),", or ", React.DOM.code(null, "bsSize=\"xsmall\""), " for additional sizes."),
                  ReactPlayground( {codeText:ButtonSizesText} ),

                  React.DOM.p(null, "Create block level buttons—those that span the full width of a parent— by adding the ",
                      React.DOM.code(null, "block"), " prop."),
                  ReactPlayground( {codeText:ButtonBlockText} ),

                  React.DOM.h2( {id:"buttons-active"}, "Active state"),
                  React.DOM.p(null, "To set a buttons active state simply set the components ", React.DOM.code(null, "active"), " prop."),
                  ReactPlayground( {codeText:ButtonActiveText} ),

                  React.DOM.h2( {id:"buttons-disabled"}, "Disabled state"),
                  React.DOM.p(null, "Make buttons look unclickable by fading them back 50%. To do this add the ", React.DOM.code(null, "disabled"),
                    " attribute to buttons."),
                  ReactPlayground( {codeText:ButtonDisabledText} ),

                  React.DOM.div( {className:"bs-callout bs-callout-warning"},
                    React.DOM.h4(null, "Event handler functionality not impacted"),
                    React.DOM.p(null, "This prop will only change the ", React.DOM.code(null, '<Button />'),"’s appearance, not its "+
                      "functionality. Use custom logic to disable the effect of the ", React.DOM.code(null, "onClick"), " handlers.")
                  ),

                  React.DOM.h2( {id:"buttons-tags"}, "Button tags"),
                  React.DOM.p(null, "The DOM element tag is choosen automaticly for you based on the props you supply. Passing a ",
                    React.DOM.code(null, "href"), " will result in the button using a ", React.DOM.code(null, '<a />'), " element otherwise a ",
                    React.DOM.code(null, '<button />'), " element will be used."),
                  ReactPlayground( {codeText:ButtonTagTypesText} ),

                  React.DOM.h2( {id:"buttons-tags"}, "Button loading state"),
                  React.DOM.p(null, "When activating an asynchronous action from a button it is a good UX pattern to give the user "+
                    "feedback as to the loading state, this can easily be done by updating your ",
                    React.DOM.code(null, '<Button />'),"’s props from a state change like below."),
                  ReactPlayground( {codeText:ButtonLoadingText} )
                ),

                /* Button Groups */
                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"btn-groups", className:"page-header"}, "Button groups ", React.DOM.small(null, "ButtonGroup, ButtonToolbar")),
                  React.DOM.p( {className:"lead"}, "Group a series of buttons together on a single line with the button group."),

                  React.DOM.h3( {id:"btn-groups-single"}, "Basic example"),
                  React.DOM.p(null, "Wrap a series of ", React.DOM.code(null, '<Button />'),"’s in a ", React.DOM.code(null, '<ButtonGroup />'),"."),
                  ReactPlayground( {codeText:ButtonGroupBasicText} ),

                  React.DOM.h3( {id:"btn-groups-toolbar"}, "Button toolbar"),
                  React.DOM.p(null, "Combine sets of ", React.DOM.code(null, '<ButtonGroup />'),"’s into a ", React.DOM.code(null, '<ButtonToolbar />'),
                    " for more complex components."),
                  ReactPlayground( {codeText:ButtonToolbarBasicText} ),

                  React.DOM.h3( {id:"btn-groups-sizing"}, "Sizing"),
                  React.DOM.p(null, "Instead of applying button sizing props to every button in a group, just add ", React.DOM.code(null, "bsSize"),
                    " prop to the ", React.DOM.code(null, '<ButtonGroup />'),"."),
                  ReactPlayground( {codeText:ButtonGroupSizesText} ),

                  React.DOM.h3( {id:"btn-groups-nested"}, "Nesting"),
                  React.DOM.p(null, "You can place other button types within the ", React.DOM.code(null, '<ButtonGroup />'), " like ",
                    React.DOM.code(null, '<DropdownButton />'),"’s."),
                  ReactPlayground( {codeText:ButtonGroupNestedText} ),

                  React.DOM.h3( {id:"btn-groups-vertical"}, "Vertical variation"),
                  React.DOM.p(null, "Make a set of buttons appear vertically stacked rather than horizontally. ",
                    React.DOM.strong( {className:"text-danger"}, "Split button dropdowns are not supported here.")),
                  React.DOM.p(null, "Just add ", React.DOM.code(null, "vertical"), " to the ", React.DOM.code(null, '<ButtonGroup />'),"."),
                  ReactPlayground( {codeText:ButtonGroupVerticalText} ),

                  React.DOM.h3( {id:"btn-groups-justified"}, "Justified button groups"),
                  React.DOM.p(null, "Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group."),
                  React.DOM.div( {className:"bs-callout bs-callout-warning"},
                    React.DOM.h4(null, "Style issues"),
                    React.DOM.p(null, "There are some issues and workarounds required when using this property, please see ", React.DOM.a( {href:"http://getbootstrap.com/components/#btn-groups-justified"}, "bootstrap’s button group docs"), " for more specifics.")
                  ),
                  React.DOM.p(null, "Just add ", React.DOM.code(null, "justified"), " to the ", React.DOM.code(null, '<ButtonGroup />'),"."),
                  ReactPlayground( {codeText:ButtonGroupJustifiedText} )
                ),

                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"btn-dropdowns", className:"page-header"}, "Button dropdowns"),
                  React.DOM.p( {className:"lead"}, "Use ", React.DOM.code(null, '<DropdownButton />'), " or ", React.DOM.code(null, '<SplitButton />'), " components to display a button with a dropdown menu."),

                  React.DOM.h3( {id:"btn-dropdowns-single"}, "Single button dropdowns"),
                  React.DOM.p(null, "Create a dropdown button with the ", React.DOM.code(null, '<DropdownButton />'), " component."),
                  ReactPlayground( {codeText:DropdownButtonBasicText} ),

                  React.DOM.h3( {id:"btn-dropdowns-split"}, "Split button dropdowns"),
                  React.DOM.p(null, "Similarly, create split button dropdowns with the ", React.DOM.code(null, '<SplitButton />'), " component."),
                  ReactPlayground( {codeText:SplitButtonBasicText} ),

                  React.DOM.h3( {id:"btn-dropdowns-sizing"}, "Sizing"),
                  React.DOM.p(null, "Button dropdowns work with buttons of all sizes."),
                  ReactPlayground( {codeText:DropdownButtonSizesText} ),

                  React.DOM.h3( {id:"btn-dropdowns-dropup"}, "Dropup variation"),
                  React.DOM.p(null, "Trigger dropdown menus that site above the button by adding the ", React.DOM.code(null, "dropup"), " prop."),
                  ReactPlayground( {codeText:SplitButtonDropupText} ),

                  React.DOM.h3( {id:"btn-dropdowns-right"}, "Dropdown right variation"),
                  React.DOM.p(null, "Trigger dropdown menus that align to the right of the button using the ", React.DOM.code(null, "pullRight"), " prop."),
                  ReactPlayground( {codeText:SplitButtonRightText} )
                ),

                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"panels", className:"page-header"}, "Panels ", React.DOM.small(null, "Panel, PanelGroup, Accordion")),

                  React.DOM.h3( {id:"panels-basic"}, "Basic example"),
                  React.DOM.p(null, "By default, all the ", React.DOM.code(null, "<Panel />"), " does is apply some basic border and padding to contain some content."),
                  ReactPlayground( {codeText:PanelBasic} ),

                  React.DOM.h3( {id:"panels-heading"}, "Panel with heading"),
                  React.DOM.p(null, "Easily add a heading container to your panel with the ", React.DOM.code(null, "header"), " prop."),
                  ReactPlayground( {codeText:PanelWithHeading} ),

                  React.DOM.h3( {id:"panels-footer"}, "Panel with footer"),
                  React.DOM.p(null, "Pass buttons or secondary text in the ", React.DOM.code(null, "footer"), " prop. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground."),
                  ReactPlayground( {codeText:PanelWithFooter} ),

                  React.DOM.h3( {id:"panels-contextual"}, "Contextual alternatives"),
                  React.DOM.p(null, "Like other components, easily make a panel more meaningful to a particular context by adding a ", React.DOM.code(null, "bsStyle"), " prop."),
                  ReactPlayground( {codeText:PanelContextual} ),

                  React.DOM.h3( {id:"panels-controlled"}, "Controlled PanelGroups"),
                  React.DOM.p(null, React.DOM.code(null, "PanelGroup"),"s can be controlled by a parent component. The ", React.DOM.code(null, "activeKey"), " prop dictates which panel is open."),
                  ReactPlayground( {codeText:PanelGroupControlled} ),

                  React.DOM.h3( {id:"panels-uncontrolled"}, "Uncontrolled PanelGroups"),
                  React.DOM.p(null, React.DOM.code(null, "PanelGroup"),"s can also be uncontrolled where they manage their own state. The ", React.DOM.code(null, "defualtActiveKey"), " prop dictates which panel is open when initially."),
                  ReactPlayground( {codeText:PanelGroupUncontrolled} ),

                  React.DOM.h3( {id:"panels-accordion"}, "Accordions"),
                  React.DOM.p(null, React.DOM.code(null, "<Accordion />"), " aliases ", React.DOM.code(null, "<PanelGroup isAccordion />"),"."),
                  ReactPlayground( {codeText:PanelGroupAccordion} )
                ),

                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"modals", className:"page-header"}, "Modals ", React.DOM.small(null, "Modal")),

                  React.DOM.h3( {id:"modals-static"}, "A static example"),
                  React.DOM.p(null, "A rendered modal with header, body, and set of actions in the footer."),
                  React.DOM.p(null, "The header is added automatically if you pass in a ", React.DOM.code(null, "title"), " prop."),
                  ReactPlayground( {codeText:ModalStatic} ),

                  React.DOM.h3( {id:"modals-static"}, "Live demo"),
                  React.DOM.p(null, "Use ", React.DOM.code(null, "<OverlayTrigger />"), " to create a real modal that's added to the document body when opened."),
                  ReactPlayground( {codeText:ModalOverlayTrigger} ),

                  React.DOM.h3( {id:"modals-static"}, "Custom trigger"),
                  React.DOM.p(null, "Use ", React.DOM.code(null, "<OverlayTriggerMixin />"), " in a custom component to manage the modal's state yourself."),
                  ReactPlayground( {codeText:ModalOverlayTriggerMixin} )
                ),

                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"progress", className:"page-header"}, "Progress bars ", React.DOM.small(null, "ProgressBar")),

                  React.DOM.p( {className:"lead"}, "Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars."),

                  React.DOM.h2( {id:"modals-static"}, "Basic example"),
                  React.DOM.p(null, "Default progress bar."),
                  ReactPlayground( {codeText:ProgressBarBasic} ),

                  React.DOM.h2( {id:"modals-label"}, "With label"),
                  React.DOM.p(null, "Add a ", React.DOM.code(null, "label"), " prop to show a visible percentage. For low percentages, consider adding a min-width to ensure the label's text is fully visible."),
                  React.DOM.p(null, "The following keys are interpolated with the current values: ", React.DOM.code(null, "%(min)s"),", ", React.DOM.code(null, "%(max)s"),", ", React.DOM.code(null, "%(now)s"),", ", React.DOM.code(null, "%(percent)s"),", ", React.DOM.code(null, "%(bsStyle)s")),
                  ReactPlayground( {codeText:ProgressBarWithLabel} ),

                  React.DOM.h2( {id:"modals-label"}, "Screenreader only label"),
                  React.DOM.p(null, "Add a ", React.DOM.code(null, "srOnly"), " prop to hide the label visually."),
                  ReactPlayground( {codeText:ProgressBarScreenreaderLabel} ),

                  React.DOM.h2( {id:"modals-label"}, "Contextual alternatives"),
                  React.DOM.p(null, "Progress bars use some of the same button and alert classes for consistent styles."),
                  ReactPlayground( {codeText:ProgressBarContextual} ),

                  React.DOM.h2( {id:"modals-label"}, "Striped"),
                  React.DOM.p(null, "Uses a gradient to create a striped effect. Not available in IE8."),
                  ReactPlayground( {codeText:ProgressBarStriped} ),

                  React.DOM.h2( {id:"modals-label"}, "Animated"),
                  React.DOM.p(null, "Add ", React.DOM.code(null, "active"), " prop to animate the stripes right to left. Not available in IE9 and below."),
                  ReactPlayground( {codeText:ProgressBarAnimated} ),

                  React.DOM.h2( {id:"modals-label"}, "Stacked"),
                  React.DOM.p(null, "Nest ", React.DOM.code(null, "<ProgressBar />"),"s to stack them."),
                  ReactPlayground( {codeText:ProgressBarStacked} )
                ),

                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"labels", className:"page-header"}, "Labels"),
                  React.DOM.h2( {id:"label-static"}, "Example"),
                  React.DOM.p(null, "Create a ", React.DOM.code(null, '<Label>label</Label>'), " show highlight information"),
                  ReactPlayground( {codeText:Label} ),
                  React.DOM.h2( {id:"label-static"}, "Available variations"),
                  React.DOM.p(null, "Add any of the below mentioned modifier classes to change the appearance of a label."),
                  ReactPlayground( {codeText:LabelVariations} )
                ),

                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"badges", className:"page-header"}, "Badges"),
                  React.DOM.p(null, "Easily highlight new or unread items by adding a ", React.DOM.code(null, '<Badge>badge</Badge>'), " to links, Bootstrap navs, and more."),
                  ReactPlayground( {codeText:Badge} )
                ),

                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"jumbotron", className:"page-header"}, "Jumbotron"),
                  React.DOM.p(null, "A lightweight, flexible component that can optionally extend the entire viewport to showcase key content on your site."),
                  React.DOM.p(null, "To make the jumbotron full width, and without rounded corners, place it outside all .containers and instead add a .container within."),
                  ReactPlayground( {codeText:Jumbotron} )
                ),

                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"page-header", className:"page-header"}, "Page Header"),
                  React.DOM.p(null, "A simple shell for an ", React.DOM.code(null, "h1"), " to appropriately space out and segment sections of content on a page. It can utilize the ", React.DOM.code(null, "h1"),"’s default ", React.DOM.code(null, "small"), " element, as well as most other components (with additional styles)."),
                  ReactPlayground( {codeText:PageHeader} )
                ),

                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"wells", className:"page-header"}, "Wells"),
                  React.DOM.h2( {id:"well-static"}, "Default Wells"),
                  React.DOM.p(null, "Use the well as a simple effect on an element to give it an inset effect."),
                  ReactPlayground( {codeText:Well} ),
                  React.DOM.h2( {id:"well-optins-static"}, "Optional classes"),
                  React.DOM.p(null, "Control padding and rounded corners with two optional modifier classes."),
                    ReactPlayground( {codeText:WellSizes} )
                ),

                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"glyphicons", className:"page-header"}, "Glyphicons"),
                  React.DOM.p(null, "Use them in buttons, button groups for a toolbar, navigation, or prepended form inputs."),
                    ReactPlayground( {codeText:Glyphicon} )
                )
              ),

              React.DOM.div( {className:"col-md-3"},
                React.DOM.div( {className:"bs-docs-sidebar hidden-print affix-top", role:"complementary"},
                  React.DOM.ul( {className:"nav bs-docs-sidenav"},
                    React.DOM.li(null,
                      React.DOM.a( {href:"#buttons"}, "Buttons")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#btn-groups"}, "Button groups")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#btn-dropdowns"}, "Button dropdowns")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#panels"}, "Panels")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#modals"}, "Modals")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#progress"}, "Progress bars")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#labels"}, "Labels")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#badges"}, "Badges")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#jumbotron"}, "Jumbotron")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#page-header"}, "Page Header")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#wells"}, "Wells")
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#glyphicons"}, "Glyphicons")
                    )
                  ),
                  React.DOM.a( {className:"back-to-top", href:"#top"},
                  " Back to top "
                  )
                )
              )
            )
          ),

          PageFooter(null )
        )
      );
  }
});

module.exports = ComponentsPage;