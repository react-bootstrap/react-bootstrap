import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import ExampleCarouselImage from '../components/ExampleCarouselImage';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...ReactBootstrap,
  formik,
  yup,
  ExampleCarouselImage,
};

delete (ReactLiveScope as any).default;

export default ReactLiveScope;
