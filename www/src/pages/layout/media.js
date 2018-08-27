import { graphql } from 'gatsby';
import React from 'react';

import ComponentApi from '../../components/ComponentApi';
import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';
import Alignment from '../../examples/Media/Alignment';
import Basic from '../../examples/Media/Basic';
import List from '../../examples/Media/List';
import Nesting from '../../examples/Media/Nesting';
import Order from '../../examples/Media/Order';
import withLayout from '../../withLayout';

export default withLayout(function MediaSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="media-objects">
        Media objects
      </LinkedHeading>

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
      <ReactPlayground codeText={Basic} />

      <LinkedHeading h="2" id="media-nesting">
        Media Nesting
      </LinkedHeading>

      <p>
        Media objects can be infinitely nested, though we suggest you stop at
        some point. Place nested <code>Media</code> within the{' '}
        <code>Media.Body</code> of a parent media object.
      </p>
      <ReactPlayground codeText={Nesting} />

      <LinkedHeading h="2" id="media-alignment">
        Media Alignment
      </LinkedHeading>

      <p>
        Media in a media object can be aligned with flexbox utilities to the top
        (default), middle, or end of your <code>Media.Body</code> content.
      </p>
      <ReactPlayground codeText={Alignment} />

      <LinkedHeading h="2" id="media-order">
        Media Order
      </LinkedHeading>

      <p>
        Change the order of content in media objects by modifying the HTML
        itself, or by adding some custom flexbox CSS to set the{' '}
        <code>order</code> property (to an integer of your choosing).
      </p>
      <ReactPlayground codeText={Order} />

      <LinkedHeading h="2" id="media-list">
        Media list
      </LinkedHeading>

      <p>
        Because the media object has so few structural requirements, you can
        also use these classes on list HTML elements. On your <code>ul</code> or{' '}
        <code>ol</code> , add the .list-unstyled to remove any browser default
        list styles, use <code>{'<Media as="li">'}</code> to render as a list
        item. As always, use spacing utilities wherever needed to fine tune.
      </p>
      <ReactPlayground codeText={List} />

      <LinkedHeading h="2" id="media-props">
        Props
      </LinkedHeading>

      <ComponentApi metadata={data.Media} />
    </>
  );
});

export const query = graphql`
  query MediaQuery {
    Media: componentMetadata(displayName: { eq: "Media" }) {
      ...PropTable_metadata
    }
  }
`;
