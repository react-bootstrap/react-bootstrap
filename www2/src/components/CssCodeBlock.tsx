import * as React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import CodeBlock from '@theme/CodeBlock';

const CssCodeBlock: React.FC = () => {
  const { bootstrapCssHash, bootstrapVersion } = usePluginData(
    'bootstrap-metadata-plugin',
  ) as any;

  return (
    <CodeBlock language="html">
      {`<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@${bootstrapVersion}/dist/css/bootstrap.min.css"
  integrity="${bootstrapCssHash}"
  crossorigin="anonymous"
/>
`}
    </CodeBlock>
  );
};

export default CssCodeBlock;
