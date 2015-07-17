import React from 'react';

import CodeExample from './CodeExample';
import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

export default class Page extends React.Component {
  render() {
    return (
        <div>
          <NavMain activePage="getting-started" />

          <PageHeader
            title="Getting started"
            subTitle="An overview of React-Bootstrap and how to install and use." />

          <div className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">
                <div className="bs-docs-section">
                  <h2 id="setup" className="page-header">Setup</h2>
                  <p className="lead">You can import the lib as AMD modules, CommonJS modules, or as a global JS script.</p>

                  <p>First add the Bootstrap CSS to your project; check <a href="http://getbootstrap.com/getting-started/" name="Bootstrap Docs">here</a> if you have not already done that. Note that:</p>
                  <ul>
                    <li>Because many folks use custom Bootstrap themes, we do not directly depend on Bootstrap. It is up to you to to determine how you get and link to the Bootstrap CSS and fonts.</li>
                    <li>React-Bootstrap doesn't depend on a very precise version of Bootstrap. Just pull the latest and, in case of trouble, take hints on the version used by this documentation page. Then, have Bootstrap in your dependencies and ensure your build can read your Less/Sass/SCSS entry point.</li>
                  </ul>
                  <p>Then:</p>

                  <h3>CommonJS</h3>
                  <div className="highlight">
                    <CodeExample
                      codeText={
`$ npm install react
$ npm install react-bootstrap`
                      }
                    />
                    <br />
                    <CodeExample
                      mode="javascript"
                      codeText={
`var Alert = require('react-bootstrap/lib/Alert');
// or
var Alert = require('react-bootstrap').Alert;

// with ES6 modules
import Alert from 'react-bootstrap/lib/Alert';
// or
import {Alert} from 'react-bootstrap';`
                      }
                    />
                  </div>

                  <h3>AMD</h3>
                  <div className="highlight">
                    <CodeExample
                      codeText={
`$ bower install react
$ bower install react-bootstrap`
                      }
                    />
                    <br />
                    <CodeExample
                      mode="javascript"
                      codeText={
`define(['react-bootstrap/lib/Alert'], function(Alert) { ... });
// or
define(['react-bootstrap'], function(ReactBootstrap) { var Alert = ReactBootstrap.Alert; ... });`
                      }
                    />
                  </div>

                  <h3>Browser globals</h3>
                  <p>The bower repo contains <code>react-bootstrap.js</code> and <code>react-bootstrap.min.js</code> with all components exported in the <code>window.ReactBootstrap</code> object.</p>
                  <div className="highlight">
                    <CodeExample
                      mode="htmlmixed"
                      codeText={
`<script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react.js"></script>
<script src="path/to/react-bootstrap-bower/react-bootstrap.min.js"></script>
<script>
  var Alert = ReactBootstrap.Alert;
</script>`
                      }
                    />
                  </div>

                  <h3>Without JSX</h3>
                  <p>If you do not use JSX and just call components as functions, you must explicitly <a href="https://facebook.github.io/react/blog/2014/10/14/introducing-react-elements.html#deprecated-auto-generated-factories">create a factory before calling it</a>. React-bootstrap provides factories for you in <code>lib/factories</code>:</p>
                  <div className="highlight">
                    <CodeExample
                      mode="javascript"
                      codeText={
`var Alert = require('react-bootstrap/lib/factories').Alert;
// or
var Alert = require('react-bootstrap/lib/factories/Alert');`
                      }
                    />
                  </div>
                </div>
                <div className="bs-docs-section">
                  <h2 id="browser-support" className="page-header">Browser support</h2>
                  <p>We aim to support all browsers supported by both <a href="http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills">React</a> and <a href="http://getbootstrap.com/getting-started/#support">Bootstrap</a>.</p>

                  <p>React requires <a href="http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills">polyfills for non-ES5 capable browsers.</a></p>

                  <p><a href="http://jquery.com">jQuery</a> is currently required only for IE8 support for components which require reading element positions from the DOM: <code>Popover</code> and <code>Tooltip</code> when launched with <code>OverlayTrigger</code>. We would like to remove this dependency in future versions but for now, including the following snippet in your page should have you covered:</p>

                  <div className="highlight">
                    <CodeExample
                      mode="htmlmixed"
                      codeText={

`<!--[if lt IE 9]>
  <script>
    (function(){
      var ef = function(){};
      window.console = window.console || {log:ef,warn:ef,error:ef,dir:ef};
    }());
  </script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
<![endif]-->`
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PageFooter />
        </div>
      );
  }

  shouldComponentUpdate() {
    return false;
  }
}
