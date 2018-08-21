import React from 'react';

import Heading from '../../components/Heading';
import Callout from '../../components/Callout';
import CodeBlock from '../../components/CodeBlock';
import withLayout from '../../withLayout';

export default withLayout(
  class Page extends React.Component {
    shouldComponentUpdate() {
      return false;
    }

    render() {
      return (
        <>
          <Heading h="1" id="getting-started">
            Introduction
          </Heading>
          <p className="lead">
            Learn how to include React Bootstrap in your project
          </p>
          <Heading h="2" id="javascript">
            JavaScript
          </Heading>

          <p>
            React-Bootstrap is a complete re-implementation of the Bootstrap
            components using React. It has{' '}
            <strong>
              no dependency on either <code>bootstrap.js</code> or jQuery
            </strong>. If you have React setup and React-Bootstrap installed you
            have everything you need.
          </p>
          <Heading h="3" id="javascript-install">
            Installation
          </Heading>
          <p>
            The best way to consume React Bootstrap is via the npm package which
            you can install with <code>npm</code> (or yarn if you prefer).
          </p>

          <p>
            If you plan on customizing the Bootstrap Sass files, or don't want
            to use a CDN for the stylesheet, it may helpful to install{' '}
            <a href="https://getbootstrap.com/docs/4.1/getting-started/download/#npm">
              vanilla Bootstrap
            </a>{' '}
            as well.
          </p>
          <CodeBlock codeText="npm install react-bootstrap bootstrap" />

          <Heading h="3" id="javascript-Importing">
            Importing
          </Heading>
          <p>
            You should import individual components from{' '}
            <code>react-bootstrap/lib</code> rather than the entire library.
            Doing so pulls in only the specific components that you use, which
            can significantly reduce the amount of code you end up sending to
            the client.
          </p>

          <CodeBlock
            codeText={`
              import Button from 'react-bootstrap/lib/Button';

              // or less ideally
              import { Button } from 'react-bootstrap';`}
          />
          <Heading h="3" id="browser-globals">
            Browser globals
          </Heading>
          <p>
            We provide <code>react-bootstrap.js</code> and{' '}
            <code>react-bootstrap.min.js</code> bundles with all components
            exported on the <code>window.ReactBootstrap</code> object. These
            bundles are available on{' '}
            <a href="https://cdnjs.com/libraries/react-bootstrap">CDNJS</a>, as
            well as in the npm package.
          </p>
          <CodeBlock
            mode="html"
            codeText={`
              <script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react-dom.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/<version>/react-bootstrap.min.js"></script>
              <script>
                var Alert = ReactBootstrap.Alert;
              </script>`}
          />

          <Heading h="2" id="stylesheets">
            Stylesheets
          </Heading>
          <p>
            Because React-Bootstrap doesn't depend on a very precise version of
            Bootstrap, we don't ship with any included css. However, some
            stylesheet <strong>is required</strong> to use these components. How
            and which bootstrap styles you include is up to you, but the
            simplest way is to include the latest styles from the CDN.
          </p>
          <CodeBlock
            mode="html"
            codeText={`
                <!-- Latest compiled and minified CSS -->
                <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
                  integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                  crossorigin="anonymous"
                >
            `}
          />
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
          <Heading h="3" id="theming">
            Themes
          </Heading>
          <p>
            React-Bootstrap is compatible with existing Bootstrap themes. Just
            follow the installation instructions for your theme of choice.
          </p>
          <Callout theme="danger" title="Watchout!">
            Because React-Bootstrap completely reimplements Bootstrap's
            JavaScript, it's not automatically compatible with themes that
            extend the default JavaScript behaviors.
          </Callout>

          <Heading h="2" id="browser-support">
            Browser support
          </Heading>
          <p>
            We aim to support all browsers supported by both{' '}
            <a href="http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills">
              React
            </a>{' '}
            and{' '}
            <a href="http://getbootstrap.com/getting-started/#support">
              Bootstrap
            </a>.
          </p>
        </>
      );
    }
  },
);
