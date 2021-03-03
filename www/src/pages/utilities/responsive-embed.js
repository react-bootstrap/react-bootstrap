import { graphql } from 'gatsby';
import * as React from 'react';

import LinkedHeading from '../../components/LinkedHeading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import ResponsiveEmbed from '../../examples/ResponsiveEmbed';
import withLayout from '../../withLayout';

export default withLayout(function ResponsiveEmbedSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="responsive-embed">
        Responsive embed
      </LinkedHeading>

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
      <p>
        The aspect ratio is controlled via the <code>aspectRatio</code> prop.
      </p>
      <ReactPlayground codeText={ResponsiveEmbed} />

      <LinkedHeading h="3" id="responsive-embed-props">
        API
      </LinkedHeading>
      <ComponentApi metadata={data.ResponsiveEmbed} />
    </>
  );
});

export const query = graphql`
  query ResponsiveEmbedQuery {
    ResponsiveEmbed: componentMetadata(displayName: { eq: "ResponsiveEmbed" }) {
      ...ComponentApi_metadata
    }
  }
`;
