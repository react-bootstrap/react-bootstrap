import React from 'react';

import NavMain from './NavMain';
import PageFooter from './PageFooter';
import Grid from '../../src/Grid';
import Alert from '../../src/Alert';
import Glyphicon from '../../src/Glyphicon';

export default class HomePage extends React.Component{
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
          <Alert bsStyle='danger'>
            <Glyphicon glyph='warning-sign' /> The project is under active
            development, and APIs will change. Check out the <a
            href='https://github.com/react-bootstrap/react-bootstrap/wiki#100-roadmap'>1.0.0
            Roadmap</a> and <a
            href='https://github.com/react-bootstrap/react-bootstrap/blob/master/CONTRIBUTING.md'>Contributing
            Guidelines</a> to see where you can help out. Prior to the 1.0.0 release, breaking changes should
            result in a Minor version bump.
          </Alert>
        </Grid>

        <PageFooter />
      </div>
    );
  }
}
