import React from 'react';
import CodeBlock from './CodeBlock';

const propTypes = {};

function BrowserGlobalsCodeBlock() {
  return (
    <CodeBlock
      mode="html"
      codeText={`
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin />

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossorigin
/>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin
/>

<script>var Alert = ReactBootstrap.Alert;</script>

`}
    />
  );
}

BrowserGlobalsCodeBlock.propTypes = propTypes;

export default BrowserGlobalsCodeBlock;
