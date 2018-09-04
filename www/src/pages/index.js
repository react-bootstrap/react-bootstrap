import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Badge from 'react-bootstrap/lib/Badge';
import Container from 'react-bootstrap/lib/Container';

import withLayout from '../withLayout';

export default withLayout(
  class HomePage extends React.Component {
    render() {
      return (
        <div>
          <main className="bs-docs-masthead" id="content" role="main">
            <div className="container">
              <span className="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline" />
              <p className="lead">
                The most popular front-end framework, rebuilt for React.
              </p>
            </div>
          </main>

          <Container>
            <Alert bsStyle="warning">
              <p>
                We are actively working to reach a 1.0.0 release, and we would
                love your help to get there.
              </p>
              <p>
                Check out the{' '}
                <a href="https://github.com/react-bootstrap/react-bootstrap/wiki#100-roadmap">
                  1.0.0 roadmap
                </a>{' '}
                and{' '}
                <a href="https://github.com/react-bootstrap/react-bootstrap/blob/master/CONTRIBUTING.md">
                  contributing guidelines
                </a>{' '}
                to see where you can help out.
              </p>
              <p>
                A great place to start is any{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/react-bootstrap/react-bootstrap/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22"
                >
                  issue
                </a>{' '}
                with a <Badge bsStyle="success">help-wanted</Badge> label.
              </p>
              <p>
                We are open to pull requests that address bugs, improve
                documentation, enhance accessibility, add test coverage, or
                bring us closer to feature parity with{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://getbootstrap.com/"
                >
                  Bootstrap
                </a>
                .
              </p>
              <p>
                We actively seek to invite frequent pull request authors to join
                the organization.{' '}
              </p>
            </Alert>
            <Alert bsStyle="danger">
              <p>
                The project is under active development, and APIs will change.{' '}
              </p>
              <p>
                Prior to the 1.0.0 release, breaking changes should result in a
                minor version bump.
              </p>
            </Alert>
          </Container>
        </div>
      );
    }
  },
);
