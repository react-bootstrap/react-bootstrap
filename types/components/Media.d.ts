import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare class MediaBody<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

declare class Media<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {
  static Body: typeof MediaBody;
}

export default Media;
