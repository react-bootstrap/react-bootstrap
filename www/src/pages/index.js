import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Alert from 'react-bootstrap/lib/Alert';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Label from 'react-bootstrap/lib/Label';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <main className="bs-docs-masthead" id="content" role="main">
          <div className="container">
            <span className="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline"></span>
            <p className="lead">The most popular front-end framework, rebuilt for React.</p>
          </div>
        </main>

        <Grid>
          <Alert bsStyle="warning">
            <p><Glyphicon glyph="bullhorn" /> We are actively working to reach a 1.0.0 release, and we would love your help to get there.</p>
            <p><Glyphicon glyph="check" /> Check out the <a href="https://github.com/react-bootstrap/react-bootstrap/wiki#100-roadmap">1.0.0 roadmap</a> and <a href="https://github.com/react-bootstrap/react-bootstrap/blob/master/CONTRIBUTING.md">contributing guidelines</a> to see where you can help out.</p>
            <p><Glyphicon glyph="sunglasses" /> A great place to start is any <a target="_blank" href="https://github.com/react-bootstrap/react-bootstrap/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22">issue</a> with a <Label bsStyle="success">help-wanted</Label> label.</p>
            <p><Glyphicon glyph="ok" /> We are open to pull requests that address bugs, improve documentation, enhance accessibility, add test coverage, or bring us closer to feature parity with <a target="_blank" href="http://getbootstrap.com/">Bootstrap</a>.</p>
            <p><Glyphicon glyph="user" /> We actively seek to invite frequent pull request authors to join the organization. <Glyphicon glyph="thumbs-up" /></p>
          </Alert>
          <Alert bsStyle="danger">
            <p><Glyphicon glyph="warning-sign" /> The project is under active development, and APIs will change. </p>
            <p><Glyphicon glyph="bullhorn" /> Prior to the 1.0.0 release, breaking changes should result in a minor version bump.</p>
          </Alert>
        </Grid>
      </div>
    );
  }
}
