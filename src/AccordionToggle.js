import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AccordionContext from './AccordionContext';

const propTypes = {
  /**
   * A key that corresponds to the collapse component that gets triggered
   * when this has been clicked.
   */
  eventKey: PropTypes.string.isRequired,
};

const defaultProps = {
  as: 'div',
};

const AccordionToggle = ({ children, eventKey }) => {
  const context = useContext(AccordionContext);

  return (
    <>
      {children &&
        React.Children.map(children, child => {
          if (child.props && child.props.type === 'button') {
            // grab the old click
            let givenClick = child.props.onClick;
            let newOnClick = () => {
              context.onClick(eventKey);
              if (givenClick) givenClick(eventKey);
            };
            return React.cloneElement(child, { onClick: newOnClick });
          }
          return child;
        })}
    </>
  );
};

AccordionToggle.propTypes = propTypes;
AccordionToggle.defaultProps = defaultProps;

export default AccordionToggle;
