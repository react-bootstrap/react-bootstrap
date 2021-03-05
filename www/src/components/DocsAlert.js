import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function DocsAlert() {
  const { netlify } = config;
  return (
    netlify && (
      <Container fluid>
        <Row>
          <Alert variant="warning" className="w-100">
            You are currently viewing the auto-generated docs from{' '}
            {netlify.pullRequest === 'true' ? (
              <span>
                a{' '}
                <Alert.Link
                  href={`https://github.com/react-bootstrap/react-bootstrap/pull/${netlify.reviewId}`}
                >
                  pull request
                </Alert.Link>
              </span>
            ) : (
              <span>
                the <b>{netlify.branch}</b> branch
              </span>
            )}
            . The docs for the current release are available at{' '}
            <Alert.Link href="https://react-bootstrap.github.io/">
              https://react-bootstrap.github.io/
            </Alert.Link>
          </Alert>
        </Row>
      </Container>
    )
  );
}
