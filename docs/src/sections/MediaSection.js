import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function MediaSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="media-objects">Media Objects</Anchor> <small>Media, MediaLeft, MediaBody, MediaRight, MediaList, MediaListItem</small>
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

      <h4><Anchor id="media-body-props">MediaBody</Anchor></h4>
      <PropTable component="MediaBody"/>

      <h4><Anchor id="media-left-props">MediaLeft</Anchor></h4>
      <PropTable component="MediaLeft"/>

      <h4><Anchor id="media-right-props">MediaRight</Anchor></h4>
      <PropTable component="MediaRight"/>
    </div>
  );
}
