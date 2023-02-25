import * as React from 'react';
import CodeBlock from '@theme/CodeBlock';
import useBootstrapMetadata from '@site/src/hooks/useBootstrapMetadata';

const CssCodeBlock: React.FC = () => {
  const { bootstrapCssHash, bootstrapVersion } = useBootstrapMetadata();

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
