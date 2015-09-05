import React from 'react';
import Router from 'react-router';

const Root = React.createClass({
  statics: {

    /**
     * Get the list of pages that are renderable
     *
     * @returns {Array}
     */
    getPages() {
      return [
        'index.html',
        'introduction.html',
        'getting-started.html',
        'components.html',
        'support.html'
      ];
    }
  },

  getDefaultProps() {
    return {
      assetBaseUrl: ''
    };
  },

  childContextTypes: {
    metadata: React.PropTypes.object
  },

  getChildContext() {
    return { metadata: this.props.propData };
  },

  render() {
    // Dump out our current props to a global object via a script tag so
    // when initialising the browser environment we can bootstrap from the
    // same props as what each page was rendered with.
    let browserInitScriptObj = {
      __html:
        `window.INITIAL_PROPS = ${JSON.stringify(this.props)};
        // console noop shim for IE8/9
        (function (w) {
          var noop = function () {};
          if (!w.console) {
            w.console = {};
            ['log', 'info', 'warn', 'error'].forEach(function (method) {
              w.console[method] = noop;
            });
         }
        }(window));`
    };

    let head = {
      __html: `<title>React-Bootstrap</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${this.props.assetBaseUrl}/assets/bundle.css" rel="stylesheet">
        <link href="${this.props.assetBaseUrl}/assets/favicon.ico?v=2" type="image/x-icon" rel="shortcut icon">
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
        <![endif]-->`
    };

    return (
      <html>
        <head dangerouslySetInnerHTML={head} />

        <body>
          <Router.RouteHandler propData={this.props.propData} />

          <script dangerouslySetInnerHTML={browserInitScriptObj} />
          <script src={`${this.props.assetBaseUrl}/assets/bundle.js`} />
        </body>
      </html>
    );
  }
});


export default Root;
