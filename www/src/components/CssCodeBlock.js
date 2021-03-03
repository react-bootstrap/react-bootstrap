import * as React from 'react';
import CodeBlock from './CodeBlock';

const propTypes = {};

const { bootstrapVersion, cssHash } = config;
function CssCodeBlock() {
  return (
    <CodeBlock
      mode="html"
      codeText={`
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/${bootstrapVersion}/css/bootstrap.min.css"
  integrity="${cssHash}"
  crossorigin="anonymous"
/>
`}
    />
  );
}

CssCodeBlock.propTypes = propTypes;

export default CssCodeBlock;
