import * as React from 'react';
import BaseMarkdown from 'markdown-to-jsx';
import Head from '@docusaurus/Head';
import MDXCode from '@theme-original/MDXComponents/Code';
import MDXA from '@theme-original/MDXComponents/A';
import MDXPre from '@theme-original/MDXComponents/Pre';
import MDXDetails from '@theme-original/MDXComponents/Details';
import MDXHeading from '@theme-original/MDXComponents/Heading';
import MDXUl from '@theme-original/MDXComponents/Ul';
import MDXImg from '@theme-original/MDXComponents/Img';

const MARKDOWN_OPTIONS = {
  overrides: {
    head: Head,
    code: MDXCode,
    a: MDXA,
    pre: MDXPre,
    details: MDXDetails,
    ul: MDXUl,
    img: MDXImg,
    h1: (props: any) => <MDXHeading as="h1" {...props} />,
    h2: (props: any) => <MDXHeading as="h2" {...props} />,
    h3: (props: any) => <MDXHeading as="h3" {...props} />,
    h4: (props: any) => <MDXHeading as="h4" {...props} />,
    h5: (props: any) => <MDXHeading as="h5" {...props} />,
    h6: (props: any) => <MDXHeading as="h6" {...props} />,
  },
};

type MarkdownProps = React.ComponentProps<typeof BaseMarkdown>;

const Markdown: React.FC<MarkdownProps> = ({ children, ...props }) => {
  if (!children) {
    return null;
  }

  return (
    <BaseMarkdown options={MARKDOWN_OPTIONS} {...props}>
      {children}
    </BaseMarkdown>
  );
};

export default Markdown;
