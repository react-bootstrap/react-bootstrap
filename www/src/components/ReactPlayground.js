import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';

const propTypes = {
  codeText: PropTypes.string.isRequired,
};

const ListenerResize = ({ onResize }) => {
  const { listen } = useSandpack();

  useEffect(() => {
    const unsubs = listen((message) => {
      if (message.type === 'resize') {
        onResize(message.height);
      }
    });

    return unsubs;
  }, []);

  return null;
};

function Playground({ codeText, exampleClassName, showCode = true }) {
  const [height, setHeight] = useState(200);

  const exportedFile = (function () {
    if (codeText.indexOf('export default') !== -1) {
      return codeText.replace(new RegExp('render(.+);'), '').trim();
    }

    const functionName = codeText
      .match(new RegExp('render(.+);'))[1]
      .replace(/[()/<>]/g, '');

    return `${codeText
      .replace(new RegExp('render(.+);'), '')
      .trim()}\n\nexport default ${functionName}`;
  })();

  return (
    <SandpackProvider
      className={exampleClassName}
      theme={githubLight}
      customSetup={{
        dependencies: { 'react-bootstrap': '2.7.2', bootstrap: 'latest' },
      }}
      template="react"
      files={{
        'App.js': exportedFile,
        'styles.css': { code: `body {padding: 1em}`, hidden: true },
        'index.js': {
          hidden: true,
          code: `
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
        },
      }}
    >
      <ListenerResize
        onResize={(resizeHeight) =>
          setHeight(resizeHeight > height ? resizeHeight : height)
        }
      />
      <SandpackLayout style={{ height }}>
        <SandpackPreview style={{ height }} />
      </SandpackLayout>

      {showCode && (
        <>
          <br />
          <SandpackLayout>
            <SandpackCodeEditor />
          </SandpackLayout>
        </>
      )}
    </SandpackProvider>
  );
}

Playground.propTypes = propTypes;

export default Playground;
