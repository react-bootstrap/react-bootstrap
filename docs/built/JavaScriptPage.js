/** @jsx React.DOM */

'use strict';

var React = require('react');
var fs = require('fs');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');
var ReactPlayground = require('./ReactPlayground');

var NavBasicText = fs.readFileSync(__dirname + '/../examples/NavBasic.js', {encoding: 'utf8'});
var AlertBasicText = fs.readFileSync(__dirname + '/../examples/AlertBasic.js', {encoding: 'utf8'});
var AlertDismissableText = fs.readFileSync(__dirname + '/../examples/AlertDismissable.js', {encoding: 'utf8'});
var AlertAutoDismissableText = fs.readFileSync(__dirname + '/../examples/AlertAutoDismissable.js', {encoding: 'utf8'});
var TabbedAreaUncontrolledText = fs.readFileSync(__dirname + '/../examples/TabbedAreaUncontrolled.js', {encoding: 'utf8'});
var TabbedAreaControlledText = fs.readFileSync(__dirname + '/../examples/TabbedAreaControlled.js', {encoding: 'utf8'});


var Page = React.createClass({displayName: 'Page',
  render: function () {
    return (
        React.DOM.div(null,
          NavMain( {activePage:"javascript"} ),

          PageHeader(
            {title:"JavaScript",
            subTitle:"Bring Bootstrap's components to life with over a dozen custom React components."} ),

          React.DOM.div( {className:"container bs-docs-container"},
            React.DOM.div( {className:"row"},
              React.DOM.div( {className:"col-md-9", role:"main"},

                /* Nav */
                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"navs", className:"page-header"}, "Navs ", React.DOM.small(null, "Nav, NavItem")),
                  React.DOM.h2( {id:"navs-examples"}, "Example navs"),

                  React.DOM.p(null, "Navs come in two styles, pills and tabs."),
                  ReactPlayground( {codeText:NavBasicText} )
                ),

                /* Tabbed Areas */
                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"tabs", className:"page-header"}, "Togglable tabs ", React.DOM.small(null, "TabbedArea, TabPane")),
                  React.DOM.h2( {id:"tabs-examples"}, "Example tabs"),
                  React.DOM.p(null, "Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus."),

                  React.DOM.h3(null, "Uncontrolled"),
                  React.DOM.p(null, "Allow the component to control its own state."),
                  ReactPlayground( {codeText:TabbedAreaUncontrolledText, exampleClassName:"bs-example-tabs"} ),

                  React.DOM.h3(null, "Controlled"),
                  React.DOM.p(null, "Pass down the active state on render via props."),
                  ReactPlayground( {codeText:TabbedAreaControlledText, exampleClassName:"bs-example-tabs"} ),

                  React.DOM.div( {className:"bs-callout bs-callout-info"},
                    React.DOM.h4(null, "Extends tabbed navigation"),
                    React.DOM.p(null, "This plugin extends the ", React.DOM.a( {href:"#navs"}, "tabbed navigation component"), " to add tabbable areas.")
                  )
                ),

                /* Alerts */
                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"alerts", className:"page-header"}, "Alert messages ", React.DOM.small(null, "Alert")),
                  React.DOM.h2( {id:"alerts-examples"}, "Example alerts"),

                  React.DOM.p(null, "Basic alert styles."),
                  ReactPlayground( {codeText:AlertBasicText} ),

                  React.DOM.p(null, "Closeable alerts, just pass in a ", React.DOM.code(null, "onDismiss"), " function."),
                  ReactPlayground( {codeText:AlertDismissableText} ),

                  React.DOM.p(null, "Auto close after a set time with ", React.DOM.code(null, "dismissAfter"), " prop."),
                  ReactPlayground( {codeText:AlertAutoDismissableText} )
                )
              ),

              React.DOM.div( {className:"col-md-3"},
                React.DOM.div( {className:"bs-docs-sidebar hidden-print affix-top", role:"complementary"},
                  React.DOM.ul( {className:"nav bs-docs-sidenav"},
                    React.DOM.li(null,
                      React.DOM.a( {href:"#navs"}, "Navs"),
                      React.DOM.ul( {className:"nav"},
                        React.DOM.li(null, React.DOM.a( {href:"#navs-examples"}, "Examples"))
                      )
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#tabs"}, "Togglable Tabs"),
                      React.DOM.ul( {className:"nav"},
                        React.DOM.li(null, React.DOM.a( {href:"#tabs-examples"}, "Examples"))
                      )
                    ),
                    React.DOM.li(null,
                      React.DOM.a( {href:"#alerts"}, "Alerts"),
                      React.DOM.ul( {className:"nav"},
                        React.DOM.li(null, React.DOM.a( {href:"#alerts-examples"}, "Examples"))
                      )
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
  },

  shouldComponentUpdate: function() {
    return false;
  }
});

module.exports = Page;
