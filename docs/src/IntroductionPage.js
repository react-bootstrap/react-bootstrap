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

                  <p>
                    Let's say you want a small button that says "Something". Bootstrap lets you write this:
                  </p>
                  {StaticExample({codeText: '<button id="something-btn" type="button" class="btn btn-success btn-sm">\n\tSome Text\n</button>'})}
                  <p className="lead">
                    Compared to other HTML/CSS solutions, this is quite nice; but compared to what's possible in any other language, it's quite nasty. With React-Bootstrap, you can write:
                  </p>
                    {StaticExample({codeText: '<Button bsStyle="success" bsSize="small" onClick={someHandler}>\n\tSomething\n</Button>'})}
                  <p>
                    This is rendered by React into an element with the same markup as the Bootstrap example, and the click event is handled with React's virtual event system.
                  </p>

                  <h2>A better Bootstrap API using React.js</h2>
                  <p>
                    The Bootstrap code is so repetetive because HTML and CSS do not support the abstractions you need to write a nice library of components. That's why we have to write <small>btn</small> three times, within an element called <small>button</small>. 
                  </p>
          
                  <p><strong>The React.js solution is to write directly in Javascript.</strong>   React takes over the page-rendering entirely; you just give it a tree of Javascript objects, and tell it how state is transmitted between them.</p> 

                  <p>For instance, we might tell React to render a page displaying a single button, styled using the handy Bootstrap CSS:
                  </p>
                  <ReactPlayground show={true} codeText={fs.readFileSync(__dirname + '/../comparisons/vanillaButton.js', 'utf8')} />
                  <p>
                    But now that we're in Javascript, we can wrap the HTML/CSS, and provide a much better API:
                  </p>
                    <StaticExample codeText={fs.readFileSync(__dirname + '/../comparisons/noJSXButton.js', 'utf8')} />

                  React-Bootstrap is a library of such components, which you can also easily extend and enhance with your own functionality. 
                  <h3>JSX Syntax</h3>
                  <p>
                    While each React component is really just a Javascript object, writing tree-structures that way gets tedious. React encourages the use of a syntactic-sugar called JSX, which lets you write the tree in an HTML-like syntax:
                  </p>
                  <ReactPlayground show={true} codeText={fs.readFileSync(__dirname + '/../examples/ButtonGroupJustified.js', 'utf8')} />
                  <h3>No More DOM Selectors</h3>
                  <p>
                    React-Bootstrap really shines on components that require some Javascript functionality.  In Bootstrap, this is achieved either through data attributes, or in Javascript, defined separately from the HTML code it references via arbitrary ID strings.
                      For instance, here is a simple tabbed navigation area, displaying the difference in implementation:
                  </p>
                  <TabbedArea defaultActiveKey={2}>
                    <TabPane key={1} tab="With Bootstrap">               
                      <pre>{fs.readFileSync(__dirname + '/../comparisons/TabbedAreaBS.html', 'utf8')}</pre>
                   </TabPane>
                   <TabPane key={2} tab="With React-Bootstrap">
                      <StaticExample codeText={fs.readFileSync(__dirname + '/../examples/TabbedAreaUncontrolled.js', 'utf8')} />
                   </TabPane>
                  </TabbedArea>
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
