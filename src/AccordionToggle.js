import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SelectableContext from './SelectableContext';

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

  /** Children prop should only contain a single child, and  is enforced as such */
  children: PropTypes.element,
};

const defaultProps = {
  as: 'button',
};

const AccordionToggle = React.forwardRef(
  ({ as: Component, children, eventKey, onClick, ...props }, ref) => {
    const onSelect = useContext(SelectableContext);

    return (
      <Component
        ref={ref}
        onClick={e => {
          onSelect(eventKey, e);
          if (onClick) onClick(e);
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
