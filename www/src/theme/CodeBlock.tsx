import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import type { WrapperProps } from '@docusaurus/types';

const IGNORE_IMPORTS_EXPORTS_REGEX = /^.*\b(import|export)\b.*$/gim;

function transformCode(rawCode: string) {
  return rawCode.replace(IGNORE_IMPORTS_EXPORTS_REGEX, '');
}

type Props = WrapperProps<typeof CodeBlockType>;

export default function CodeBlockWrapper(props: Props): JSX.Element {
  return (
    <>
      <CodeBlock {...props} transformCode={transformCode} />
    </>
  );
}
