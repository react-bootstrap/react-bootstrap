import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import Figure from '../../examples/Figure';
import withLayout from '../../withLayout';

export default withLayout(function FigureSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="figures">Figures</Anchor>{' '}
        <small>Figure, FigureImage, FigureCaption</small>
      </h2>

      <p>
        Anytime you need to display a piece of content, like an image with an{' '}
        optional caption, consider using a <code>Figure</code>.
      </p>

      <h3>
        <Anchor id="figures-anchor">Figure</Anchor>
      </h3>
      <p>Displaying related images and text with the Figure component.</p>
      <ReactPlayground codeText={Figure} />

      <h3>
        <Anchor id="figures-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="figures-props-figure">Figure</Anchor>
        <LinkToSource component={data.figure.displayName} />
      </h4>
      <PropTable metadata={data.figure} />

      <h4>
        <Anchor id="figures-props-image">Figure.Image</Anchor>
        <LinkToSource component={data.image.displayName} />
      </h4>
      <PropTable metadata={data.image} />

      <h4>
        <Anchor id="figures-props-caption">Figure.Caption</Anchor>
        <LinkToSource component={data.caption.displayName} />
      </h4>
      <PropTable metadata={data.caption} />
    </div>
  );
});

export const query = graphql`
  query FigureQuery {
    figure: componentMetadata(displayName: { eq: "Figure" }) {
      displayName
      ...PropTable_metadata
    }
    image: componentMetadata(displayName: { eq: "FigureImage" }) {
      displayName
      ...PropTable_metadata
    }
    caption: componentMetadata(displayName: { eq: "FigureCaption" }) {
      displayName
      ...PropTable_metadata
    }
  }
`;
