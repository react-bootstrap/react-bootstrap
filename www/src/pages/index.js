import React from 'react';

import Button from 'react-bootstrap/lib/Button';

export default class HomePage extends React.Component {
  render() {
    return (
      <main className="bs-docs-masthead" id="content" role="main">
        <div className="container">
          <span className="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline" />
          <p className="lead">
            The most popular front-end framework, rebuilt for React.
          </p>
          <Button>
            <a href="/components/alerts/">Discover Components</a>
          </Button>
        </div>
      </main>
    );
  }
}
