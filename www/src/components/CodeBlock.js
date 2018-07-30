import PropTypes from 'prop-types';
import React from 'react';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';

import { stripIndent } from 'common-tags';

const prism = (code, language = 'jsx') => highlight(code, languages[language]);

const propTypes = {
  codeText: PropTypes.string.isRequired,
};

function CodeBlock({ codeText }) {
  return (
    <div className="bs-code-editor">
      <pre
        className="prism-code"
        style={{ marginBottom: 20 }}
        dangerouslySetInnerHTML={{
          __html: prism(stripIndent([codeText]), 'jsx'),
        }}
      />
    </div>
  );
}

CodeBlock.propTypes = propTypes;

export default CodeBlock;
