import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import Figure from '../../examples/Figure';
import withLayout from '../../withLayout';

export default withLayout(function FigureSection({ data }) {
  return (
    <>
      <Heading h="1" id="figures">
        Figures
      </Heading>

      <p>
        Anytime you need to display a piece of content, like an image with an{' '}
        optional caption, consider using a <code>Figure</code>.
      </p>

      <Heading h="2" id="figures-anchor">
        Figure
      </Heading>
      <p>Displaying related images and text with the Figure component.</p>
      <ReactPlayground codeText={Figure} />

      <Heading h="2" id="figures-props">
        API
      </Heading>

      <ComponentApi metadata={data.figure} />
      <ComponentApi metadata={data.image} />
      <ComponentApi metadata={data.caption} />
    </>
  );
});

export const query = graphql`
  query FigureQuery {
    figure: componentMetadata(displayName: { eq: "Figure" }) {
      displayName
      ...ComponentApi_metadata
    }
    image: componentMetadata(displayName: { eq: "FigureImage" }) {
      displayName
      ...ComponentApi_metadata
    }
    caption: componentMetadata(displayName: { eq: "FigureCaption" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`;
