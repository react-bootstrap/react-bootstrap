import React from 'react';
import MDXContent from '@theme-original/MDXContent';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import type MDXContentType from '@theme/MDXContent';
import type { WrapperProps } from '@docusaurus/types';
import CarbonAds from '../components/CarbonAds';

type Props = WrapperProps<typeof MDXContentType>;

export default function MDXContentWrapper(props: Props): JSX.Element {
  const { frontMatter } = useDoc();

  return (
    <>
      {frontMatter.description && (
        <p className="lead">{frontMatter.description}</p>
      )}

      <CarbonAds className="my-4" />

      <MDXContent {...props} />
    </>
  );
}
