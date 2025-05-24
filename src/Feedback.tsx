import clsx from 'clsx';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';

export type FeedbackType = 'valid' | 'invalid';

export interface FeedbackProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * Specify whether the feedback is for valid or invalid fields
   */
  type?: FeedbackType | undefined;

  /**
   * Display feedback as a tooltip.
   */
  tooltip?: boolean | undefined;
}

const Feedback: DynamicRefForwardingComponent<'div', FeedbackProps> =
  React.forwardRef(
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    (
      {
        as: Component = 'div',
        className,
        type = 'valid',
        tooltip = false,
        ...props
      },
      ref,
    ) => (
      <Component
        {...props}
        ref={ref}
        className={clsx(
          className,
          `${type}-${tooltip ? 'tooltip' : 'feedback'}`,
        )}
      />
    ),
  );

Feedback.displayName = 'Feedback';

export default Feedback;
