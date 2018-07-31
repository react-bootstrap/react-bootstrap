import PropTypes from 'prop-types';
import { styled } from 'css-literal-loader/styled';
import mapProps from 'recompose/mapProps';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';

import { stripIndent } from 'common-tags';

const prism = (code, language = 'jsx') => highlight(code, languages[language]);

const CodeBlock = mapProps(p => ({
  dangerouslySetInnerHTML: {
    __html:
      p.mode === null
        ? p.codeText
        : prism(stripIndent([p.codeText]), p.mode || 'jsx'),
  },
}))(
  styled('pre')`
    composes: prism from '../css/prism.module.scss';

    border-radius: 8px;
    margin: 0 -1rem 3rem;

    :global(.card) & {
      margin: 0;
      border-radius: 0 0 5px 5px;
    }
  `,
);

CodeBlock.propTypes = {
  codeText: PropTypes.string.isRequired,
};

export default CodeBlock;
