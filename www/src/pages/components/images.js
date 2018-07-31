import { graphql } from 'gatsby';
import React from 'react';

import ComponentApi from '../../components/ComponentApi';
import Heading from '../../components/Heading';
import ReactPlayground from '../../components/ReactPlayground';
import Fluid from '../../examples/Image/Fluid';
import Shape from '../../examples/Image/Shape';
import withLayout from '../../withLayout';

export default withLayout(function ImageSection({ data }) {
  return (
    <>
      <Heading h="1" id="images">
        Images
      </Heading>

      <Heading h="2" id="image-shape">
        Shape
      </Heading>
      <p>
        Use the <code>rounded</code>, <code>roundedCircle</code> and{' '}
        <code>thumbnail</code> props to customise the image.
      </p>
      <ReactPlayground codeText={Shape} />

      <Heading h="2" id="image-fluid">
        Fluid
      </Heading>
      <p>
        Use the <code>fluid</code> to scale image nicely to the parent element.
      </p>
      <ReactPlayground codeText={Fluid} />

      <ComponentApi metadata={data.Image} />
    </>
  );
});

export const query = graphql`
  query ImageQuery {
    Image: componentMetadata(displayName: { eq: "Image" }) {
      ...ComponentApi_metadata
    }
  }
`;
