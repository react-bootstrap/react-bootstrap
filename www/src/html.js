import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

module.exports = class HTML extends React.Component {
  static propTypes = {
    body: PropTypes.string
  };

  render() {
    const head = Helmet.rewind();

    let css;
    if (process.env.NODE_ENV === 'production') {
      let html = require('!raw-loader!../public/styles.css'); // eslint-disable-line
      css = <style dangerouslySetInnerHTML={{ __html: html }} />;
    }

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
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />

          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
};
