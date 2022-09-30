import CodeBlock from './CodeBlock';

const propTypes = {};

function BrowserGlobalsCodeBlock() {
  return (
    <CodeBlock
      mode="html"
      codeText={`
<script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>

<script>var Alert = ReactBootstrap.Alert;</script>

`}
    />
  );
}

BrowserGlobalsCodeBlock.propTypes = propTypes;

export default BrowserGlobalsCodeBlock;
