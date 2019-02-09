import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';
import AccordionContext from './AccordionContext';

class AccordionToggle extends React.Component {
  static propTypes = {
    bsPrefix: PropTypes.string,
    children: PropTypes.node,
    eventKey: PropTypes.string,
    onClick: PropTypes.func,
    as: elementType,
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

    if (Component === 'button') {
      props.type = 'button';
    }

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
