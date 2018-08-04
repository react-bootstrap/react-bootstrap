import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import CarouselControlled from '../../examples/Carousel/Controlled';
import CarouselUncontrolled from '../../examples/Carousel/Uncontrolled';
import withLayout from '../../withLayout';

export default withLayout(function CarouselSection({ data }) {
  return (
    <>
      <Heading h="1" id="carousels">
        Carousels
      </Heading>
      <p className="lead">
        A slideshow component for cycling through elements—images or slides of
        text—like a carousel.
      </p>
      <Heading h="2" id="carousels-uncontrolled">
        Example
      </Heading>
      <p>
        Carousels don’t automatically normalize slide dimensions. As such, you
        may need to use additional utilities or custom styles to appropriately
        size content. While carousels support previous/next controls and
        indicators, they’re not explicitly required. Add and customize as you
        see fit.
      </p>
      <ReactPlayground codeText={CarouselUncontrolled} />

      <Heading h="2" id="carousels-controlled">
        Controlled
      </Heading>
      <p>
        You can can also <em>control</em> the Carousel state, via the{' '}
        <code>activeIndex</code> prop and <code>onSelect</code> handler.
      </p>
      <ReactPlayground codeText={CarouselControlled} />

      <Heading h="2" id="carousels-props">
        API
      </Heading>

      <ComponentApi metadata={data.carousel} />

      <ComponentApi metadata={data.item} exportedBy={data.carousel} />
      <ComponentApi metadata={data.caption} exportedBy={data.carousel} />
    </>
  );
});

export const query = graphql`
  query CarouselQuery {
    carousel: componentMetadata(displayName: { eq: "Carousel" }) {
      displayName
      ...ComponentApi_metadata
    }
    item: componentMetadata(displayName: { eq: "CarouselItem" }) {
      displayName
      ...ComponentApi_metadata
    }
    caption: componentMetadata(displayName: { eq: "CarouselCaption" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`;
