import React from 'react';

import CodeExample from './CodeExample';
import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

const IntroductionPage = React.createClass({
  render() {
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
                <p className="lead">
                  React-Bootstrap is a library of reuseable front-end components.
                  You'll get the look-and-feel of Twitter Bootstrap,
                  but with much cleaner code, via Facebook's React.js framework.
                </p>

                <p>
                  Let's say you want a small button that says "Something",
                  to trigger the function someCallback.
                  If you were writing a native application,
                  you might write something like:
                </p>

                <div className="highlight">
                  <CodeExample
                    mode="javascript"
                    codeText={
`button(size=SMALL, color=GREEN, text="Something", onClick=someCallback)`
                    }
                  />
                </div>

                <p>
                  With the most popular web front-end framework,
                  Twitter Bootstrap, you'd write this in your HTML:
                </p>

                <div className="highlight">
                  <CodeExample
                    mode="htmlmixed"
                    codeText={
`<button id="something-btn" type="button" class="btn btn-success btn-sm">
  Something
</button>`
                    }
                  />
                </div>

                <p>
                  And something like
                  <code className="js">
                    $('#something-btn').click(someCallback);
                  </code>
                  in your Javascript.
                </p>

                <p>
                  By web standards this is quite nice,
                  but it's still quite nasty.
                  React-Bootstrap lets you write this:
                </p>

                <div className="highlight">
                  <CodeExample
                    mode="javascript"
                    codeText={
`<Button bsStyle="success" bsSize="small" onClick={someCallback}>
  Something
</Button>`
                    }
                  />
                </div>

                <p>
                  The HTML/CSS implementation details are abstracted away,
                  leaving you with an interface that more closely resembles
                  what you would expect to write in other programming languages.
                </p>

                <h2>A better Bootstrap API using React.js</h2>

                <p>
                  The Bootstrap code is so repetitive because HTML and CSS
                  do not support the abstractions necessary for a nice library
                  of components. That's why we have to write <code>btn</code>
                  three times, within an element called <code>button</code>.
                </p>

                <p>
                  <strong>
                    The React.js solution is to write directly in Javascript.
                  </strong> React takes over the page-rendering entirely.
                  You just give it a tree of Javascript objects,
                  and tell it how state is transmitted between them.
                </p>

                <p>
                  For instance, we might tell React to render a page displaying
                  a single button, styled using the handy Bootstrap CSS:
                </p>

                <div className="highlight">
                  <CodeExample
                    mode="javascript"
                    codeText={
`var button = React.DOM.button({
  className: "btn btn-lg btn-success",
  children: "Register"
});

React.render(button, mountNode);`
                    }
                  />
                </div>

                <p>
                  But now that we're in Javascript, we can wrap the HTML/CSS,
                  and provide a much better API:
                </p>

                <div className="highlight">
                  <CodeExample
                    mode="javascript"
                    codeText={
`var button = ReactBootstrap.Button({
  bsStyle: "success",
  bsSize: "large",
  children: "Register"
});

React.render(button, mountNode);`
                    }
                  />
                </div>

                <p>
                  React-Bootstrap is a library of such components,
                  which you can also easily extend and enhance
                  with your own functionality.
                </p>

                <h3>JSX Syntax</h3>

                <p>
                  While each React component is really just a Javascript object,
                  writing tree-structures that way gets tedious.
                  React encourages the use of a syntactic-sugar called JSX,
                   which lets you write the tree in an HTML-like syntax:
                </p>

                <div className="highlight">
                  <CodeExample
                    mode="javascript"
                    codeText={
`var buttonGroupInstance = (
  <ButtonGroup>
    <DropdownButton bsStyle="success" title="Dropdown">
      <MenuItem key="1">Dropdown link</MenuItem>
      <MenuItem key="2">Dropdown link</MenuItem>
    </DropdownButton>
    <Button bsStyle="info">Middle</Button>
    <Button bsStyle="info">Right</Button>
  </ButtonGroup>
);

React.render(buttonGroupInstance, mountNode);`
                    }
                  />
                </div>

                <p>
                  Some people's first impression of React.js is that it seems
                  messy to mix Javascript and HTML in this way.
                  However, compare the code required to add
                  a dropdown button in the example above to the <a
                  href="http://getbootstrap.com/javascript/#dropdowns">
                  Bootstrap Javascript</a> and <a
                  href="http://getbootstrap.com/components/#btn-dropdowns">
                  Components</a> documentation for creating a dropdown button.
                  The documentation is split in two because
                  you have to implement the component in two places
                  in your code: first you must add the HTML/CSS elements,
                  and then you must call some Javascript setup
                  code to wire the component together.
                </p>

                <p>
                  The React-Bootstrap component library tries to follow
                  the React.js philosophy that a single piece of functionality
                  should be defined in a single place.
                  View the current React-Bootstrap library on the <a
                  href="/components.html">components page</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }
});

export default IntroductionPage;
