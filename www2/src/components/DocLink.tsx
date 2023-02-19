import * as React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';

function DocLink({ path, children }) {
  const { bootstrapDocsUrl } = usePluginData(
    'bootstrap-metadata-plugin',
  ) as any;
  return (
    <a href={`${bootstrapDocsUrl}${path}`} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default DocLink;
