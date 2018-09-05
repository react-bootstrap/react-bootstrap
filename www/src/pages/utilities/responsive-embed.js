import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import ResponsiveEmbed from '../../examples/ResponsiveEmbed';

export default function ResponsiveEmbedSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="responsive-embed">Responsive embed</Anchor>{' '}
        <small>ResponsiveEmbed</small>
      </h2>

      <p>
        Allow browsers to determine video or slideshow dimensions based on the
        width of their containing block by creating an intrinsic ratio that will
        properly scale on any device.
      </p>
      <p>
        You don't need to include <code>frameborder="0"</code> in your{' '}
        <code>iframe</code>
        s.
      </p>
      <p className="bg-warning">
        Either <b>16by9</b> or <b>4by3</b> aspect ratio via <code>a16by9</code>{' '}
        or <code>a4by3</code> attribute must be set.
      </p>
      <ReactPlayground codeText={ResponsiveEmbed} />

      <h3>
        <Anchor id="responsive-embed-props">Props</Anchor>
      </h3>
      <PropTable metadata={data.ResponsiveEmbed} />
    </div>
  );
}

export const query = graphql`
  query ResponsiveEmbedQuery {
    ResponsiveEmbed: componentMetadata(displayName: { eq: "ResponsiveEmbed" }) {
      ...PropTable_metadata
    }
  }
`;
