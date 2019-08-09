import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare class MediaBody<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

declare class Media<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {
  static Body: typeof MediaBody;
}

export default Media;
