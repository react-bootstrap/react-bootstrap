import { graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import styled from 'astroturf';

import Heading from './Heading';
import Anchor from './Anchor';
import LinkToSource from './LinkToSource';
import PropTable from './PropTable';

const Keyword = styled('span')`
  color: #a626a4;
`;
const Code = styled('code')`
  padding: 0;
  display: block;
  color: #50a14f;
  background-color: transparent;
  margin-bottom: 1rem;
`;

const propTypes = {};

const Import = ({ name }) => (
  <Code aria-label={`Import code for the ${name} component`}>
    <Keyword>import</Keyword> {name} <Keyword>from</Keyword> 'react-bootstrap/
    {name}'
  </Code>
);

function ComponentApi({ heading, metadata, exportedBy }) {
  let { description, displayName: name } = metadata;
  let descHtml = description && description.childMarkdownRemark.html;
  let importName = name;

  if (exportedBy) {
    name = `${exportedBy.displayName}.${name
      .split(exportedBy.displayName)
      .pop()}`;
    importName = exportedBy.displayName;
  }

  const id = `${kebabCase(name)}-props`;
  return (
    <>
      <Heading h={heading || '3'} id={id} title={name} className="my-3">
        <div className="d-flex align-items-center">
          <Anchor target={id}>
            <span className=" text-monospace">{name}</span>
          </Anchor>

          <span className="ml-auto" />
          <LinkToSource component={name} />
        </div>
      </Heading>

      <Import name={importName} />
      {/* use composes here */}
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
