import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import CarouselUncontrolled from '../../examples/CarouselUncontrolled';
import CarouselControlled from '../../examples/CarouselControlled';

export default function CarouselSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="carousels">Carousels</Anchor>{' '}
        <small>Carousel, Carousel.Item, Carousel.Caption</small>
      </h2>

      <h3>
        <Anchor id="carousels-uncontrolled">Uncontrolled</Anchor>
      </h3>
      <p>Allow the component to control its own state.</p>
      <ReactPlayground
        codeText={CarouselUncontrolled}
        exampleClassName="bs-example-tabs"
      />

      <h3>
        <Anchor id="carousels-controlled">Controlled</Anchor>
      </h3>
      <p>Pass down the active state on render via props.</p>
      <ReactPlayground
        codeText={CarouselControlled}
        exampleClassName="bs-example-tabs"
      />

      <h3>
        <Anchor id="carousels-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="carousels-props-carousel">Carousel</Anchor>
        <LinkToSource component={data.carousel.displayName} />
      </h4>
      <PropTable metadata={data.carousel} />

      <h4>
        <Anchor id="carousels-props-item">Carousel.Item</Anchor>
        <LinkToSource component={data.item.displayName} />
      </h4>
      <PropTable metadata={data.item} />

      <h4>
        <Anchor id="carousels-props-caption">Carousel.Caption</Anchor>
        <LinkToSource component={data.caption.displayName} />
      </h4>
      <PropTable metadata={data.caption} />
    </div>
  );
}

export const query = graphql`
  query CarouselQuery {
    carousel: componentMetadata(displayName: { eq: "Carousel" }) {
      ...PropTable_metadata
    }
    item: componentMetadata(displayName: { eq: "CarouselItem" }) {
      ...PropTable_metadata
    }
    caption: componentMetadata(displayName: { eq: "CarouselCaption" }) {
      ...PropTable_metadata
    }
  }
`;
