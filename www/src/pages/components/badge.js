import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import BadgeBasic from '../../examples/Badge/Basic';
import BadgeButton from '../../examples/Badge/Button';
import BadgePill from '../../examples/Badge/Pill';
import BadgeVariations from '../../examples/Badge/Variations';

export default function BadgeSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="badges">Badges</Anchor> <small>Badge</small>
      </h2>

      <p>
        Badges scale to match the size of the immediate parent element by using
        relative font sizing and em units.
      </p>
      <ReactPlayground codeText={BadgeBasic} />

      <p>
        Badges can be used as part of links or buttons to provide a counter.
      </p>
      <ReactPlayground codeText={BadgeButton} />
      <p>
        Note that depending on how they are used, badges may be confusing for
        users of screen readers and similar assistive technologies. While the
        styling of badges provides a visual cue as to their purpose, these users
        will simply be presented with the content of the badge. Depending on the
        specific situation, these badges may seem like random additional words
        or numbers at the end of a sentence, link, or button. Unless the context
        is clear (as with the “Notifications” example, where it is understood
        that the “4” is the number of notifications), consider including
        additional context with a visually hidden piece of additional text.
      </p>
      <h3>
        <Anchor id="badges-variations">Contextual variations</Anchor>
      </h3>
      <p>
        Add any of the below mentioned modifier classes to change the appearance
        of a badge.
      </p>
      <ReactPlayground codeText={BadgeVariations} />

      <h3>
        <Anchor id="badges-variations">Pill badges</Anchor>
      </h3>
      <p>
        Use the <code>pill</code> modifier class to make badges more rounded
        (with a larger <code>border-radius</code> and additional horizontal{' '}
        <code>padding</code>). Useful if you miss the badges from v3.
      </p>
      <ReactPlayground codeText={BadgePill} />

      <h3>
        <Anchor id="badges-props">Props</Anchor>
        <LinkToSource component={data.metadata.displayName} />
      </h3>
      <PropTable metadata={data.metadata} />
    </div>
  );
}

export const query = graphql`
  query BadgeQuery {
    metadata: componentMetadata(displayName: { eq: "Badge" }) {
      displayName
      ...PropTable_metadata
    }
  }
`;
