import { graphql } from 'gatsby';
import React from 'react';

import ComponentApi from '../../components/ComponentApi';
import Heading from '../../components/Heading';
import ReactPlayground from '../../components/ReactPlayground';
import BadgeBasic from '../../examples/Badge/Basic';
import BadgeButton from '../../examples/Badge/Button';
import BadgePill from '../../examples/Badge/Pill';
import BadgeVariations from '../../examples/Badge/Variations';
import withLayout from '../../withLayout';

export default withLayout(function BadgeSection({ data }) {
  return (
    <>
      <Heading h="1" id="badges">
        Badges
      </Heading>

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
        is clear, consider including additional context with a visually hidden
        piece of additional text.
      </p>
      <Heading h="2" id="badges-variations">
        Contextual variations
      </Heading>
      <p>
        Add any of the below mentioned modifier classes to change the appearance
        of a badge.
      </p>
      <ReactPlayground codeText={BadgeVariations} />

      <Heading h="2" id="badges-variations">
        Pill badges
      </Heading>
      <p>
        Use the <code>pill</code> modifier class to make badges more rounded
        (with a larger <code>border-radius</code> and additional horizontal{' '}
        <code>padding</code>). Useful if you miss the badges from v3.
      </p>
      <ReactPlayground codeText={BadgePill} />

      <Heading h="2" id="badges-api">
        API
      </Heading>
      <ComponentApi metadata={data.metadata} />
    </>
  );
});

export const query = graphql`
  query BadgeQuery {
    metadata: componentMetadata(displayName: { eq: "Badge" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`;
