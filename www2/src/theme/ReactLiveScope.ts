import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...ReactBootstrap,
};

delete (ReactLiveScope as any).default;

export default ReactLiveScope;
