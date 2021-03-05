/* eslint-disable react/no-danger */

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { css } from 'astroturf';
import { stripIndent } from 'common-tags';
import { useEffect, useRef, useState } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';

const styles = css`
  .block {
    composes: prism from '../css/prism.module.scss';

    padding: 20px; // Matching padding in <Editor>.
    border-radius: 8px;
    margin: 0 -1rem 3rem;

    :global(.card) & {
      margin: 0;
      border-radius: 0 0 5px 5px;
    }
  }
`;

const prism = (code, language = 'jsx') => highlight(code, languages[language]);

const CodeBlock = ({ mode, codeText, ...props }) => {
  // There is a weird bug that seems to be hydration related where the wrong
  // inner html is rendered even though the props are correct. To work around
  // it, we forcibly remount the component when it looks like its rendered output
  // is wrong.
  const [version, setVersion] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (ref.current.innerText !== codeText.trim()) {
      setVersion((s) => s + 1);
    }
  }, [codeText]);

  return (
    <pre
      {...props}
      ref={ref}
      key={version}
      className={classNames(props.className, styles.block)}
      dangerouslySetInnerHTML={{
        __html:
          mode === null
            ? codeText
            : prism(stripIndent([codeText]), mode || 'jsx'),
      }}
    />
  );
};

CodeBlock.propTypes = {
  codeText: PropTypes.string.isRequired,
};

export default CodeBlock;
