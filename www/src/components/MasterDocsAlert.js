import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function MasterDocsAlert() {
  return (
    typeof window !== 'undefined' &&
    window.location.host.substr(window.location.host.indexOf('.') + 1) ===
      'netlify.com' && (
      <Container fluid>
        <Row>
          <Alert variant="warning" className="w-100">
            You are currently viewing the auto-generated docs from the
            master-branch. The docs for the current release are available at{' '}
            <Alert.Link href="https://react-bootstrap.github.io/">
              https://react-bootstrap.github.io/
            </Alert.Link>
          </Alert>
        </Row>
      </Container>
    )
  );
}

export default MasterDocsAlert;
