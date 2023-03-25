import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function StackingExample() {
  // const [position, setPosition] = useState('top-start'); errased unused state call

  const codeExampleStylingFix = {
    zIndex: 1, // Fix Issue #6564 relative to the toasts presence when scrolling
    position: 'relative', // Fix Issue #6552 for the stacking toast position
  };
  return (
    <ToastContainer style={codeExampleStylingFix}>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>See? Just like this.</Toast.Body>
      </Toast>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">2 seconds ago</small>
        </Toast.Header>
        <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default StackingExample;
