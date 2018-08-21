import { graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';

import Heading from './Heading';
import LinkToSource from './LinkToSource';
import PropTable from './PropTable';

const propTypes = {};

function ComponentApi({ heading, metadata, exportedBy }) {
  let { description, displayName: name } = metadata;
  let descHtml = description && description.childMarkdownRemark.html;

  if (exportedBy) {
    name = `${exportedBy.displayName}.${name
      .split(exportedBy.displayName)
      .pop()}`;
  }

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
      {descHtml && <div dangerouslySetInnerHTML={{ __html: descHtml }} />}
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
    description {
      childMarkdownRemark {
        html
      }
    }
    ...PropTable_metadata
  }
`;
