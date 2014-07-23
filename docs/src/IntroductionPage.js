/** @jsx React.DOM */

'use strict';

var React = require('react');
var fs = require('fs');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');
var StaticExample = require('./StaticExample');
var ReactPlayground = require('./ReactPlayground')


var TabbedArea = require('../../cjs/TabbedArea');
var TabPane = require('../../cjs/TabPane');
var preStyles = {"overflow": true};

var Page = React.createClass({
  render: function () {
    return (
        <div>
          <NavMain activePage="introduction" />

          <PageHeader
            title="Introduction"
            subTitle="The most popular front-end framework, rebuilt for React."/>

          <div className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">
                <div className="bs-docs-section">
                  <p className="lead">React-Bootstrap is a library of reuseable front-end components.  You'll get the look-and-feel of Twitter Bootstrap, but with much cleaner code, via Facebook's React.js framework.
                  </p>
                  <p>
                    Let's say you want a small button that says "Something", to trigger the function someCallback. If were writing a native application, you might write something like:
                  </p>
                   {StaticExample({codeText: 'button(size=SMALL, color=GREEN, text="Something", onClick=someCallback)'})}
                  <p>
                    With the most popular web front-end framework, Twitter Bootstrap, you'd write this in your HTML:
                  </p>
                  {StaticExample({codeText: '<button id="something-btn" type="button" class="btn btn-success btn-sm">\n\tSomething\n</button>'})}
                  <p>
                    And something like <code>$('#something-btn').click(someCallback);</code> in your Javascript.
                    By web standards this is quite nice, but it's still quite nasty.  React-Bootstrap lets you write this:
                  </p>
                    {StaticExample({codeText: '<Button bsStyle="success" bsSize="small" onClick={someCallback}>\n\tSomething\n</Button>'})}

                  <p>
                  The HTML/CSS implementation details are abstracted away, leaving you with an interface that more closely resembles what you would expect to write in other programming languages.
                  </p>
                  <p>
                    Here's a more complicated example: a tabbed navigation area, showing the implementation with Bootstrap, and React-Bootstrap:
                  </p>

                  <TabbedArea defaultActiveKey={2}>
                    <TabPane key={1} tab="With Bootstrap">               
                      <pre>{fs.readFileSync(__dirname + '/../comparisons/TabbedAreaBS.html', 'utf8')}</pre>
                   </TabPane>
                   <TabPane key={2} tab="With React-Bootstrap">
                      <pre>{fs.readFileSync(__dirname + '/../comparisons/TabbedAreaRBS.jsx', 'utf8')}</pre>
                   </TabPane>
                  </TabbedArea>

                  <h2>A better Bootstrap API using React.js</h2>
                  <p>
                    The Bootstrap code is so repetitive because HTML and CSS do not support the abstractions necessary for a nice library of components. That's why we have to write <small>btn</small> three times, within an element called <small>button</small>. 
                  </p>
          
                  <p><strong>The React.js solution is to write directly in Javascript.</strong>   React takes over the page-rendering entirely; you just give it a tree of Javascript objects, and tell it how state is transmitted between them.</p> 

                  <p>For instance, we might tell React to render a page displaying a single button, styled using the handy Bootstrap CSS:
                  </p>
                  <StaticExample codeText={fs.readFileSync(__dirname + '/../comparisons/vanillaButton.js', 'utf8')} />
                  <p>
                    But now that we're in Javascript, we can wrap the HTML/CSS, and provide a much better API:
                  </p>
                    <StaticExample codeText={fs.readFileSync(__dirname + '/../comparisons/noJSXButton.js', 'utf8')} />

                  React-Bootstrap is a library of such components, which you can also easily extend and enhance with your own functionality. 
                  <h3>JSX Syntax</h3>
                  <p>
                    While each React component is really just a Javascript object, writing tree-structures that way gets tedious. React encourages the use of a syntactic-sugar called JSX, which lets you write the tree in an HTML-like syntax:
                  </p>
                  <ReactPlayground show={true} codeText={fs.readFileSync(__dirname + '/../comparisons/ButtonToolbarDropdown.js', 'utf8')} />

                  <p>
                   Some people's first impression of React.js is that it seems messy to mix Javascript and HTML in this way. 
                     However, compare the code required to add

                      a dropdown button in the example above to the <a href="http://getbootstrap.com/javascript/#dropdowns">
                        Bootstrap Javascript</a> and <a href="http://getbootstrap.com/components/#btn-dropdowns">Components</a> documentation for creating a dropdown button. 
                          The documentation is split in two because you have to implement the component in two places in your code: first you must add the HTML/CSS elements, and then you must call some Javascript setup code to wire the component together.
                  </p>
                  <p>
                  The React-Bootstrap component library tries to follow the React.js philosophy that a single piece of functionality should be defined in a single place.
                  View the current React-Bootstrap library on the <a href="/components.html">components page</a>.
                  </p>
                  <p>
                  The project is under active development --- APIs will change, and the documentation is far from complete. Contributions are encouraged!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <PageFooter />
        </div>
      );
  },

  shouldComponentUpdate: function() {
    return false;
  }
});

module.exports = Page;
