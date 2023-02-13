// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import CodeBlock from '@theme/CodeBlock';
import DocLink from '@site/src/components/DocLink';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  CodeBlock,
  DocLink,
};
