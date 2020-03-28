import React from 'react';
import Alert from 'react-bootstrap/Alert';

function MasterDocsAlert() {
  return (
    typeof window !== 'undefined' &&
    window.location.host.substr(window.location.host.indexOf('.') + 1) ===
      'netlify.com' && (
      <Alert variant="warning">
        You are currently viewing the auto-generated docs from the
        master-branch. The docs for the current release are available at{' '}
        <Alert.Link href="https://react-bootstrap.github.io/">
          https://react-bootstrap.github.io/
        </Alert.Link>
      </Alert>
    )
  );
}

export default MasterDocsAlert;
