import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import ImageShape from '../../examples/ImageShape';
import ImageResponsive from '../../examples/ImageResponsive';
import ThumbnailAnchor from '../../examples/ThumbnailAnchor';
import ThumbnailDiv from '../../examples/ThumbnailDiv';

export default function ImageSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="images">Images</Anchor> <small>Image</small>
      </h2>

      <h3>
        <Anchor id="image-shape">Shape</Anchor>
      </h3>
      <p>
        Use the <code>rounded</code>, <code>circle</code> and{' '}
        <code>thumbnail</code> props to customise the image.
      </p>
      <ReactPlayground codeText={ImageShape} />

      <h3>
        <Anchor id="image-responsive">Responsive</Anchor>
      </h3>
      <p>
        Use the <code>responsive</code> to scale image nicely to the parent
        element.
      </p>
      <ReactPlayground codeText={ImageResponsive} />

      <h3>
        <Anchor id="image-props">Props</Anchor>
        <LinkToSource component={data.Image.displayName} />
      </h3>
      <PropTable metadata={data.Image} />

      <h2 className="page-header">
        <Anchor id="thumbnail">Thumbnails</Anchor> <small>Thumbnail</small>
      </h2>

      <p>
        Thumbnails are designed to showcase linked images with minimal required
        markup. You can extend the grid component with thumbnails.
      </p>

      <h3>
        <Anchor id="thumbnail-anchor">Anchor Thumbnail</Anchor>
      </h3>
      <p>Creates an anchor wrapping an image.</p>
      <ReactPlayground codeText={ThumbnailAnchor} />

      <h3>
        <Anchor id="thumbnail-divider">Divider Thumbnail</Anchor>
      </h3>
      <p>Creates a divider wrapping an image and other children elements.</p>
      <ReactPlayground codeText={ThumbnailDiv} />

      <h3>
        <Anchor id="thumbnail-props">Props</Anchor>
        <LinkToSource component={data.Thumbnail.displayName} />
      </h3>
      <PropTable metadata={data.Thumbnail} />
    </div>
  );
}

export const query = graphql`
  query ImageQuery {
    Image: componentMetadata(displayName: { eq: "Image" }) {
      ...PropTable_metadata
    }
    Thumbnail: componentMetadata(displayName: { eq: "Thumbnail" }) {
      ...PropTable_metadata
    }
  }
`;
