import { graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';

import Heading from './Heading';
import LinkToSource from './LinkToSource';
import PropTable from './PropTable';

const propTypes = {};

function ComponentApi({ heading, metadata }) {
  const name = metadata.displayName;
  return (
    <>
      <Heading
        h={heading || '3'}
        id={`${kebabCase(name)}-props`}
        subtitle={<LinkToSource component={name} />}
      >
        {name}
      </Heading>
      {/* use composes here */}
      {/* Subcomponents? */}
      <PropTable metadata={metadata} />
    </>
  );
}

ComponentApi.propTypes = propTypes;

export default ComponentApi;

export const metadataFragment = graphql`
  fragment ComponentApi_metadata on ComponentMetadata {
    composes
    displayName
    ...PropTable_metadata
  }
`;
