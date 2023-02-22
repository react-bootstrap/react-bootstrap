import * as React from 'react';
import Link from '@docusaurus/Link';
import useBootstrapMetadata from '@site/src/hooks/useBootstrapMetadata';

function DocLink({ path, children }) {
  const { bootstrapDocsUrl } = useBootstrapMetadata();
  return <Link to={`${bootstrapDocsUrl}${path}`}>{children}</Link>;
}

export default DocLink;
