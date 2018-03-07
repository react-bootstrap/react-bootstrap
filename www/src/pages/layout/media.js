import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import MediaList from '../../examples/MediaList';
import MediaObject from '../../examples/MediaObject';
import MediaAlignment from '../../examples/MediaAlignment';
import MediaOrder from '../../examples/MediaOrder';
import MediaNesting from '../../examples/MediaNesting';

export default function MediaSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="media-objects">Media objects</Anchor>{' '}
        <small>Media, Media.Body</small>
      </h2>

      <p>
        The media object helps build complex and repetitive components (e.g.
        blog comments, tweets, the like and more) where some media is positioned
        alongside content that doesn’t wrap around said media. Plus, it does
        this with only two required classes thanks to flexbox. Below is an
        example of a single media object. Only two classes are required—the
        wrapping <code>Media</code> and the <code>Media.Body</code> around your
        content. Optional padding and margin can be controlled through spacing
        utilities.
      </p>
      <ReactPlayground codeText={MediaObject} />

      <h3>
        <Anchor id="media-nesting">Media Nesting</Anchor>
      </h3>
      <p>
        Media objects can be infinitely nested, though we suggest you stop at
        some point. Place nested <code>Media</code> within the{' '}
        <code>Media.Body</code> of a parent media object.
      </p>
      <ReactPlayground codeText={MediaNesting} />

      <h3>
        <Anchor id="media-alignment">Media Alignment</Anchor>
      </h3>
      <p>
        Media in a media object can be aligned with flexbox utilities to the top
        (default), middle, or end of your <code>Media.Body</code> content.
      </p>
      <ReactPlayground codeText={MediaAlignment} />

      <h3>
        <Anchor id="media-order">Media Order</Anchor>
      </h3>
      <p>
        Change the order of content in media objects by modifying the HTML
        itself, or by adding some custom flexbox CSS to set the{' '}
        <code>order</code> property (to an integer of your choosing).
      </p>
      <ReactPlayground codeText={MediaOrder} />

      <h3>
        <Anchor id="media-list">Media list</Anchor>
      </h3>
      <p>
        Because the media object has so few structural requirements, you can
        also use these classes on list HTML elements. On your <code>ul</code> or{' '}
        <code>ol</code> , add the .list-unstyled to remove any browser default
        list styles, and then include <code>Media</code> to your
        <code>li</code>s. As always, use spacing utilities wherever needed to
        fine tune.
      </p>
      <ReactPlayground codeText={MediaList} />

      <h3>
        <Anchor id="media-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="media-media-props">Media</Anchor>
      </h4>
      <PropTable metadata={data.Media} />

      <h4>
        <Anchor id="media-body-props">Media.Body</Anchor>
      </h4>
      <PropTable metadata={data.MediaBody} />
    </div>
  );
}

export const query = graphql`
  query MediaQuery {
    Media: componentMetadata(displayName: { eq: "Media" }) {
      ...PropTable_metadata
    }
    MediaBody: componentMetadata(displayName: { eq: "MediaBody" }) {
      ...PropTable_metadata
    }
  }
`;
