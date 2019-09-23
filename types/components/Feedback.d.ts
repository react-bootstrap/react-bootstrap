import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface FeedbackProps {
  bsPrefix?: never;
  type?: 'valid' | 'invalid';
}

declare class Feedback extends BsPrefixComponent<'div', FeedbackProps> {}

export default Feedback;
