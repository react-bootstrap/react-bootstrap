import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface FeedbackProps {
  bsPrefix?: never;
  type?: 'valid' | 'invalid';
}

declare class Feedback<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, FeedbackProps> {}

export default Feedback;
