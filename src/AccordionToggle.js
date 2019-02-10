import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';
import AccordionContext from './AccordionContext';

class AccordionToggle extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    as: 'button',
  };

  handleClick = () => {
    const handleClick = this.accordionContext;
    handleClick(this.props.eventKey);
    if (this.props.onClick) this.props.onClick(this.props.eventKey);
  };

  render() {
    const {
      as: Component,
      bsPrefix,
      children,
      className,
      eventKey,
      ...props
    } = this.props;

    if (Component === 'button') props.type = 'button';

    return (
      <AccordionContext.Consumer>
        {context => {
          this.accordionContext = context.onClick;
          return (
            <Component
              {...props}
              onClick={() => this.handleClick(eventKey)}
              className={classNames(className, bsPrefix)}
            >
              {children}
            </Component>
          );
        }}
      </AccordionContext.Consumer>
    );
  }
}

export default createBootstrapComponent(AccordionToggle, 'accordion-toggler');
