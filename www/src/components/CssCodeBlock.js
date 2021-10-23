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
  href="https://cdn.jsdelivr.net/npm/bootstrap@${bootstrapVersion}/dist/css/bootstrap.min.css"
  integrity="${cssHash}"
  crossorigin="anonymous"
/>
`}
    />
  );
}

CssCodeBlock.propTypes = propTypes;

export default CssCodeBlock;
