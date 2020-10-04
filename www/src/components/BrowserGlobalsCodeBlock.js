import React from 'react';
import CodeBlock from './CodeBlock';

const propTypes = {};

function BrowserGlobalsCodeBlock() {
  return (
    <CodeBlock
      mode="html"
      codeText={`
/* This is React.js a React-Bootstrap depenancy... duhh*/ 
/*Automatically added, if you are using a react framework (e.g., next.js, create-react-app, and gastby).*/

<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

/* This is React-Bootstrap's browser global*/
/* Notice it is loaded after React.js*/
<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>

/*Your other scripts*/
<script>let ReactBootstrapBeAwesome = true </script>

`}
    />
  );
}

BrowserGlobalsCodeBlock.propTypes = propTypes;

export default BrowserGlobalsCodeBlock;
