import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function MasterDocsAlert() {
  let deploymentDetails = null;
  if (process.env.NETLIFY) {
    if (process.env.PULL_REQUEST === 'true') {
      deploymentDetails = (
        <span>
          a{' '}
          <Alert.Link
            href={`https://github.com/react-bootstrap/react-bootstrap/pull/${process.env.REVIEW_ID}`}
          >
            pull request
          </Alert.Link>
        </span>
      );
    } else {
      deploymentDetails = `the ${process.env.BRANCH} branch`;
    }
  }
  return process.env.NETLIFY ? (
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
  ) : null;
}

export default MasterDocsAlert;
