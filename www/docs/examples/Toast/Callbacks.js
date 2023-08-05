import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function CallbacksExample() {
  const [show, setShow] = useState(false);

  const [count, setCount] = useState(1);
  const [histories, setHistories] = useState([]);

  const pushHistory = (state) => {
    histories.push({ state, k: count });
    setHistories(histories.splice(-6));
    setCount(count + 1);
  };

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            onEnter={() => pushHistory('enter')}
            onEntering={() => pushHistory('entering')}
            onEntered={() => pushHistory('entered')}
            onExit={() => pushHistory('exit')}
            onExiting={() => pushHistory('exiting')}
            onExited={() => pushHistory('exited')}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Callback Example</Toast.Body>
          </Toast>
        </Col>
        <Col xs={3}>
          <Button onClick={() => setShow(true)}>Show Toast</Button>
        </Col>
        <Col xs={3}>
          State history...
          <ul>
            {histories.map(({ state, k }) => (
              <li key={k}>
                {k}: {state}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default CallbacksExample;
