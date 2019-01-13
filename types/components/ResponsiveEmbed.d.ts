import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface ResponsiveEmbedProps {
  children: React.ReactChild;
  aspectRatio?: '21by9' | '16by9' | '4by3' | '1by1';
}

declare class ResponsiveEmbed extends BsPrefixComponent<
  'div',
  ResponsiveEmbedProps
> {}

export default ResponsiveEmbed;
