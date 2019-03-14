import classNames from 'classnames';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionContext from './AccordionContext';

const propTypes = {
  /**
   * Set a custom element for this component.
   */
  as: elementType,

  /** @default 'accordion-toggler' */
  bsPrefix: PropTypes.string,
  /**
   * A key that corresponds to the collapse component that gets triggered
   * when this has been clicked.
   */
  eventKey: PropTypes.string.isRequired,

  /**
   * A callback function to perform additional operations with this toggler
   * gets triggered.
   */
  onClick: PropTypes.func,
};

const defaultProps = {
  as: 'div',
};

const AccordionToggle = React.forwardRef(
  (
    { as: Component, bsPrefix, children, className, eventKey, ...props },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-toggler');

    const context = useContext(AccordionContext);

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, bsPrefix)}
      >
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
      </Component>
    );
  },
);

AccordionToggle.propTypes = propTypes;
AccordionToggle.defaultProps = defaultProps;

export default AccordionToggle;
