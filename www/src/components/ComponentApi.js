import { graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Anchor from './Anchor';
import Heading from './Heading';
import ImportApi from './ImportApi';
import LinkToSource from './LinkToSource';
import PropTable from './PropTable';

const propTypes = {};

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
            <span className="text-monospace">{name}</span>
          </Anchor>

          <span className="ms-auto" />
          <LinkToSource component={importName} />
        </div>
      </Heading>

      <ImportApi name={importName} />
      {/* use composes here */}
      {/* eslint-disable-next-line react/no-danger */}
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
