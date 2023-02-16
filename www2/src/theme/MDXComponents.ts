// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import AriaAbbr from '@site/src/components/AriaAbbr';
import CodeBlock from '@theme/CodeBlock';
import DocLink from '@site/src/components/DocLink';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  AriaAbbr,
  CodeBlock,
  DocLink,
};
