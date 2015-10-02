import React from 'react';

import NavMain from './NavMain';
import PageFooter from './PageFooter';
import Grid from '../../src/Grid';
import Alert from '../../src/Alert';
import Glyphicon from '../../src/Glyphicon';
import Label from '../../src/Label';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <NavMain activePage="home" />

        <main className="bs-docs-masthead" id="content" role="main">
          <div className="container">
            <span className="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline"></span>
            <p className="lead">The most popular front-end framework, rebuilt for React.</p>
          </div>
        </main>

        <Grid>
          <Alert bsStyle="warning">
            <p><Glyphicon glyph="bullhorn" /> We are actively working to reach a 1.0.0 release, and we would love your help to get there.</p>
            <p><Glyphicon glyph="check" /> Check out the <a href="https://github.com/react-bootstrap/react-bootstrap/wiki#100-roadmap">1.0.0 Roadmap</a> and <a href="https://github.com/react-bootstrap/react-bootstrap/blob/master/CONTRIBUTING.md">Contributing Guidelines</a> to see where you can help out.</p>
            <p><Glyphicon glyph="sunglasses" /> A great place to start is any <a target="_blank" href="https://github.com/react-bootstrap/react-bootstrap/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22">issues</a> with a <Label bsStyle="success">help-wanted</Label> label.</p>
            <p><Glyphicon glyph="ok" /> We are open to pull requests that address bugs, improve documentation, enhance accessibility,</p>
            <p>add test coverage, or bring us closer to feature parity with <a target="_blank" href="http://getbootstrap.com/">Bootstrap</a>.</p>
            <p><Glyphicon glyph="user" /> We actively seek to invite frequent pull request authors to join the organization. <Glyphicon glyph="thumbs-up" /></p>
          </Alert>
          <Alert bsStyle="danger">
            <p><Glyphicon glyph="warning-sign" /> The project is under active development, and APIs will change. </p>
            <p><Glyphicon glyph="bullhorn" /> Prior to the 1.0.0 release, breaking changes should result in a Minor version bump.</p>
          </Alert>
          <Alert bsStyle="info">
            <p><Glyphicon glyph="bullhorn" /> If you want to try / play with <b>React-0.14</b> betas, we cut releases from the <b>react-14</b> branch. They're on the <b>react-pre</b> tag.</p>
            <p><kbd>$ npm install react-bootstrap@react-pre</kbd></p>
          </Alert>
        </Grid>

        <PageFooter />
      </div>
    );
  }
}
