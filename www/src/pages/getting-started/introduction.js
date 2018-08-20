import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

import Anchor from '../../components/Anchor';

export default class Page extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <div className="bs-docs-section">
          <h2 className="page-header">
            <Anchor id="install">Install</Anchor>
          </h2>
          <Row>
            <Col sm={6}>
              <Panel header="npm (recommended)" className="bs-docs-code-panel">
                <pre>
                  <code>
                    $ npm install --save react react-dom $ npm install --save
                    react-bootstrap
                  </code>
                </pre>
              </Panel>
            </Col>
            <Col sm={6}>
              <Panel header="bower" className="bs-docs-code-panel">
                <pre>
                  <code>
                    $ bower install react $ bower install react-bootstrap
                  </code>
                </pre>
              </Panel>
            </Col>
          </Row>
          <h2>Stylesheets</h2>
          <p>
            Because React-Bootstrap doesn't depend on a very precise version of
            Bootstrap, we don't ship with any included css. However, some
            stylesheet <strong>is required</strong> to use these components. How
            and which bootstrap styles you include is up to you, but the
            simplest way is to include the latest styles from the CDN.
          </p>
          <div className="bs-callout bs-callout-warning">
            <p>
              React-Bootstrap currently targets Bootstrap v3. To use
              React-Bootstrap, include the CSS for Bootstrap v3 instead of
              Bootstrap v4.
            </p>
          </div>
          <pre>
            <code>
              {`
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
          `}
            </code>
          </pre>
          <p>
            For more advanced use cases you can also use a bundler like Webpack
            or Browserify to include the css files for you as part of your build
            process but that is beyond the scope of this guide. Also see{' '}
            <a href="http://getbootstrap.com/customize/">
              http://getbootstrap.com/customize/
            </a>{' '}
            for details about customizing stylesheets to match your component
            use.
          </p>
          <h3>Themes</h3>
          <p>
            React-Bootstrap is compatible with existing Bootstrap themes. Just
            follow the installation instructions for your theme of choice.
          </p>
          <div className="bs-callout bs-callout-warning">
            <p>
              Because React-Bootstrap completely reimplements Bootstrap's
              JavaScript, it's not automatically compatible with themes that
              extend the default JavaScript behaviors.
            </p>
          </div>
          <h2 className="page-header">
            <Anchor id="commonjs">Javascript</Anchor>
          </h2>
          <p>
            React-Bootstrap is a complete re-implementation of the Bootstrap
            components using React. It has no dependency on either{' '}
            <code>bootstrap.js</code> or jQuery. If you have React setup and
            React-Bootstrap installed you have everything you need.
          </p>
          <p>
            You can consume the library as CommonJS modules, ES6 modules via
            Babel, AMD, or as a global JS script.
          </p>
          <div className="bs-callout bs-callout-info">
            <h4>Bundle size optimization</h4>
            <p>
              If you install React-Bootstrap using <strong>npm</strong>, you can
              import individual components from <code>react-bootstrap/lib</code>{' '}
              rather than the entire library. Doing so pulls in only the
              specific components that you use, which can significantly reduce
              the size of your client bundle.
            </p>
          </div>
          <h3>
            <Anchor id="commonjs">CommonJS</Anchor>
          </h3>
          <pre>
            <code>
              var Alert = require('react-bootstrap/lib/Alert'); // or var Alert
              = require('react-bootstrap').Alert;
            </code>
          </pre>
          />
          <h3>
            <Anchor id="es6">ES6</Anchor>
          </h3>
          <p>
            Es6 modules aren't supported natively yet, but you can use the
            syntax now with the help of a transpiler like Babel.
          </p>
          <pre>
            <code>
              {`
import Button from 'react-bootstrap/lib/Button';
// or
import { Button } from 'react-bootstrap';`}
            </code>
          </pre>
          <h3>
            <Anchor id="amd">AMD</Anchor>
          </h3>
          <div className="bs-callout bs-callout-danger">
            <p>
              AMD support is limited to requiring the entire package. If you
              only want to consume specific components, consider using npm and
              CommonJS modules instead.
            </p>
          </div>
          <pre>
            <code>
              {`
define(['react-bootstrap'], function(ReactBootstrap) {
var Alert = ReactBootstrap.Alert;
...
});`}
            </code>
          </pre>
          <h3>
            <Anchor id="browser-globals">Browser globals</Anchor>
          </h3>
          <p>
            We provide <code>react-bootstrap.js</code> and{' '}
            <code>react-bootstrap.min.js</code> bundles with all components
            exported on the <code>window.ReactBootstrap</code> object. These
            bundles are available on{' '}
            <a href="https://cdnjs.com/libraries/react-bootstrap">CDNJS</a>, and
            in both the Bower and NPM packages.
          </p>
          <pre>
            <code>
              {`
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/<version>/react-bootstrap.min.js"></script>
<script>
var Alert = ReactBootstrap.Alert;
</script>`}
            </code>
          </pre>
        </div>
        <div className="bs-docs-section">
          <h2 className="page-header">
            <Anchor id="browser-support">Browser support</Anchor>
          </h2>
          <p>
            We aim to support all browsers supported by both{' '}
            <a href="http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills">
              React
            </a>{' '}
            and{' '}
            <a href="http://getbootstrap.com/getting-started/#support">
              Bootstrap
            </a>
            .
          </p>
          <p>
            Unfortunately, due to the lack of resources and the will of
            dedicating the efforts to modern browsers and getting closer to
            Bootstrap's features, we will not be testing{' '}
            <code>react-bootstrap</code> against IE8 anymore.
            <br />
            We will however continue supporting IE8 as long as people submit PRs
            addressing compatibility issues with it.
          </p>

          <p>
            React requires{' '}
            <a href="http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills">
              polyfills for non-ES5 capable browsers.
            </a>
          </p>

          <div className="highlight">
            <pre>
              <code>
                {`
<!--[if lt IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
<![endif]-->`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}
