import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function CarouselSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="carousels">Carousels</Anchor> <small>Carousel, Carousel.Item, Carousel.Caption</small>
      </h2>

      <h3><Anchor id="carousels-uncontrolled">Uncontrolled</Anchor></h3>
      <p>Allow the component to control its own state.</p>
      <ReactPlayground codeText={Samples.CarouselUncontrolled} exampleClassName="bs-example-tabs" />

      <h3><Anchor id="carousels-controlled">Controlled</Anchor></h3>
      <p>Pass down the active state on render via props.</p>
      <ReactPlayground codeText={Samples.CarouselControlled} exampleClassName="bs-example-tabs" />

      <h3><Anchor id="carousels-props">Props</Anchor></h3>

      <h4><Anchor id="carousels-props-carousel">Carousel</Anchor></h4>
      <PropTable component="Carousel"/>

      <h4><Anchor id="carousels-props-item">Carousel.Item</Anchor></h4>
      <PropTable component="CarouselItem"/>

      <h4><Anchor id="carousels-props-caption">Carousel.Caption</Anchor></h4>
      <PropTable component="Carousel.Caption"/>
    </div>
  );
}
