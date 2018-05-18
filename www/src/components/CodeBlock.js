import PropTypes from 'prop-types';
import React from 'react';
import prism from 'react-live/lib/utils/prism';
import { stripIndent } from 'common-tags';

const propTypes = {
  codeText: PropTypes.string.isRequired
};

function CodeBlock({ codeText }) {
  return (
    <div className="bs-code-editor">
      <pre
        className="prism-code"
        style={{ marginBottom: 20 }}
        dangerouslySetInnerHTML={{
          __html: prism(stripIndent([codeText]), 'jsx')
        }}
      />
    </div>
  );
}

CodeBlock.propTypes = propTypes;

export default CodeBlock;
