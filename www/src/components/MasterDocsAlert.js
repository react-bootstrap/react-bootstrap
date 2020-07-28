import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function MasterDocsAlert() {
  const { netlify } = config;
  let deploymentDetails = null;
  if (netlify) {
    if (netlify.pullRequest) {
      deploymentDetails = (
        <span>
          a{' '}
          <Alert.Link
            href={`https://github.com/react-bootstrap/react-bootstrap/pull/${netlify.reviewId}`}
          >
            pull request
          </Alert.Link>
        </span>
      );
    } else {
      deploymentDetails = `the ${netlify.branch} branch`;
    }
  }
  return netlify && (
    <Container fluid>
      <Row>
        <Alert variant="warning" className="w-100">
          You are currently viewing the auto-generated docs from{' '}
          {deploymentDetails}. The docs for the current release are available at{' '}
          <Alert.Link href="https://react-bootstrap.github.io/">
            https://react-bootstrap.github.io/
          </Alert.Link>
        </Alert>
      </Row>
    </Container>
  );
}
