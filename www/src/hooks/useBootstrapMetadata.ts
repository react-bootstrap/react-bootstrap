import { usePluginData } from '@docusaurus/useGlobalData';

interface BootstrapMetadata {
  bootstrapVersion: string;
  bootstrapDocsUrl: string;
  bootstrapCssHash: string;
  rbVersion: string;
}

export default function useBootstrapMetadata(): BootstrapMetadata {
  return usePluginData('bootstrap-metadata-plugin') as BootstrapMetadata;
}
