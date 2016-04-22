import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function MediaSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="media-objects">Media objects</Anchor> <small>Media, Media.Left, Media.Right, Media.Heading, Media.List, Media.ListItem</small>
      </h2>

      <p>Abstract object styles for building various types of components (like blog comments, Tweets, etc) that feature a <code>left</code> or <code>right</code> aligned image alongside textual content.</p>
      <ReactPlayground codeText={Samples.MediaObject} />

      <h3><Anchor id="media-alignment">Media Alignment</Anchor></h3>
      <p>The images or other media can be aligned top, middle, or bottom. The default is top aligned.</p>
      <ReactPlayground codeText={Samples.MediaAlignment} />

      <h3>
        <Anchor id="media-list">Media list</Anchor>
      </h3>
      <p>You can use media inside list (useful for comment threads or articles lists).</p>
      <ReactPlayground codeText={Samples.MediaList} />

      <h3><Anchor id="media-props">Props</Anchor></h3>

      <h4><Anchor id="media-media-props">Media</Anchor></h4>
      <PropTable component="Media"/>

      <h4><Anchor id="media-left-props">Media.Left</Anchor></h4>
      <PropTable component="Media.Left"/>

      <h4><Anchor id="media-right-props">Media.Right</Anchor></h4>
      <PropTable component="Media.Right"/>

      <h4><Anchor id="media-heading-props">Media.Heading</Anchor></h4>
      <PropTable component="Media.Heading"/>

      <h4><Anchor id="media-body-props">Media.Body</Anchor></h4>
      <PropTable component="Media.Body"/>
    </div>
  );
}
