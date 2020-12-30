import React from 'react';
import PropTypes from 'prop-types';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { useClassNameMapper } from './ThemeProvider';

export interface FeedbackProps extends BsPrefixProps {
  className?: string;
  bsPrefix?: never;
  type?: 'valid' | 'invalid';
  tooltip?: boolean;
}

type Feedback = BsPrefixRefForwardingComponent<'div', FeedbackProps>;

const propTypes = {
  /**
   * Specify whether the feedback is for valid or invalid fields
   *
   * @type {('valid'|'invalid')}
   */
  type: PropTypes.string,

  /** Display feedback as a tooltip. */
  tooltip: PropTypes.bool,

  as: PropTypes.elementType,
};

const Feedback: Feedback = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (
    {
      as: Component = 'div',
      className,
      type = 'valid',
      tooltip = false,
      ...props
    }: FeedbackProps,
    ref,
  ) => {
    const classNames = useClassNameMapper();
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(
          className,
          `${type}-${tooltip ? 'tooltip' : 'feedback'}`,
        )}
      />
    );
  },
);

Feedback.displayName = 'Feedback';
Feedback.propTypes = propTypes;

export default Feedback;
