import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import MediaList from '../../examples/MediaList';
import MediaObject from '../../examples/MediaObject';
import MediaAlignment from '../../examples/MediaAlignment';

export default function MediaSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="media-objects">Media objects</Anchor>{' '}
        <small>
          Media, Media.Left, Media.Right, Media.Heading, Media.List,
          Media.ListItem
        </small>
      </h2>

      <p>
        Abstract object styles for building various types of components (like
        blog comments, Tweets, etc) that feature a <code>left</code> or{' '}
        <code>right</code> aligned image alongside textual content.
      </p>
      <ReactPlayground codeText={MediaObject} />

      <h3>
        <Anchor id="media-alignment">Media Alignment</Anchor>
      </h3>
      <p>
        The images or other media can be aligned top, middle, or bottom. The
        default is top aligned.
      </p>
      <ReactPlayground codeText={MediaAlignment} />

      <h3>
        <Anchor id="media-list">Media list</Anchor>
      </h3>
      <p>
        You can use media inside list (useful for comment threads or articles
        lists).
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
        <Anchor id="media-left-props">Media.Left</Anchor>
      </h4>
      <PropTable metadata={data.MediaLeft} />

      <h4>
        <Anchor id="media-right-props">Media.Right</Anchor>
      </h4>
      <PropTable metadata={data.MediaRight} />

      <h4>
        <Anchor id="media-heading-props">Media.Heading</Anchor>
      </h4>
      <PropTable metadata={data.MediaHeading} />

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
    MediaLeft: componentMetadata(displayName: { eq: "MediaLeft" }) {
      ...PropTable_metadata
    }
    MediaRight: componentMetadata(displayName: { eq: "MediaRight" }) {
      ...PropTable_metadata
    }
    MediaHeading: componentMetadata(displayName: { eq: "MediaHeading" }) {
      ...PropTable_metadata
    }
    MediaBody: componentMetadata(displayName: { eq: "MediaBody" }) {
      ...PropTable_metadata
    }
  }
`;
