import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AccordionContext from './AccordionContext';

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /**
   * A key that corresponds to the collapse component that gets triggered
   * when this has been clicked.
   */
  eventKey: PropTypes.string.isRequired,

  /** A callback function for when this component is clicked */
  onClick: PropTypes.func,

  children: PropTypes.element,
};

const defaultProps = {
  as: 'button',
};

const AccordionToggle = React.forwardRef(
  ({ as: Component, children, eventKey, onClick, ...props }, ref) => {
    const context = useContext(AccordionContext);

    return (
      <Component
        ref={ref}
        onClick={() => {
          context.onClick(eventKey);
          if (onClick) onClick(eventKey);
        }}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

AccordionToggle.propTypes = propTypes;
AccordionToggle.defaultProps = defaultProps;

export default AccordionToggle;
