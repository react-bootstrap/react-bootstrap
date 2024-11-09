import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { TransitionCallbacks } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionCollapse from './AccordionCollapse';
import AccordionItemContext from './AccordionItemContext';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from './helpers';

export interface AccordionBodyProps
  extends BsPrefixProps,
    TransitionCallbacks,
    React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'accordion-body' */
  bsPrefix: PropTypes.string,

  /**
   * Callback fired before the component expands
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: PropTypes.func,
};

const AccordionBody: BsPrefixRefForwardingComponent<'div', AccordionBodyProps> =
  React.forwardRef<HTMLElement, AccordionBodyProps>(
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        bsPrefix,
        className,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-body');
      const { eventKey } = useContext(AccordionItemContext);

      return (
        <AccordionCollapse
          eventKey={eventKey}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
        >
          <Component
            ref={ref}
            {...props}
            className={classNames(className, bsPrefix)}
          />
        </AccordionCollapse>
      );
    },
  ) as typeof AccordionBody;

AccordionBody.propTypes = propTypes;
AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
