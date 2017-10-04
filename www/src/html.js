import React from 'react';
import Helmet from 'react-helmet';

module.exports = class HTML extends React.Component {
  static propTypes = {
    body: React.PropTypes.string,
  };

  render() {
    const head = Helmet.rewind();

    let css;
    if (process.env.NODE_ENV === 'production') {
      let html = require('!raw-loader!../public/styles.css'); // eslint-disable-line
      css = <style dangerouslySetInnerHTML={{ __html: html }} />;
    }

    // Dump out our current props to a global object via a script tag so
    // when initialising the browser environment we can bootstrap from the
    // same props as what each page was rendered with.
    let browserInitScriptObj = {
      __html:
        `window.ASSET_BASE_URL = ${JSON.stringify('')};
        // console noop shim for IE8/9
        (function (w) {
          var noop = function () {};
          if (!w.console) {
            w.console = {};
            ['log', 'info', 'warn', 'error'].forEach(function (method) {
              w.console[method] = noop;
            });
         }
        }(window));`,
    };

    // let head = {
    //   __html: `<title>React-Bootstrap</title>
    //     <!--[if lt IE 9]>
    //     <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    //     <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    //     <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
    //     <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
    //     <![endif]-->`
    // };

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {this.props.headComponents}
          {css}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
        </head>

        <body>
          <div id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />

          <script dangerouslySetInnerHTML={browserInitScriptObj} />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
};
