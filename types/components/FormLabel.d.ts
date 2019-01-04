import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare interface FeedbackProps {
  htmlFor?: string;
  column?: boolean;
  innerRef?: React.LegacyRef<this>;
  srOnly?: boolean;
}

declare class Feedback extends BsPrefixComponent<'label', FeedbackProps> {}

export default Feedback;
