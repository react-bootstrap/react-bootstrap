// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import AriaAbbr from '@site/src/components/AriaAbbr';
import CodeBlock from '@theme/CodeBlock';
import CssCodeBlock from '@site/src/components/CssCodeBlock';
import DocLink from '@site/src/components/DocLink';
import PropsTable from '@site/src/components/PropsTable';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  AriaAbbr,
  CodeBlock,
  CssCodeBlock,
  DocLink,
  PropsTable,
};
