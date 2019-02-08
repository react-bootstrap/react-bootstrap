import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';
import AccordionContext from './AccordionContext';

class AccordionToggle extends Component {
  static propTypes = {
    eventKey: PropTypes.string,
  };

  handleClick = () => {
    const { onClick } = this.accordionContext;
    onClick(this.state.eventKey);
  };

  render() {
    const { children, /* eventKey, */ ...props } = this.props;
    return (
      <AccordionContext.Consumer>
        {context => {
          this.accordionContext = context;
          return (
            <Component {...props} onClick={this.handleClick}>
              {children}
            </Component>
          );
        }}
      </AccordionContext.Consumer>
    );
  }
}

export default createBootstrapComponent(AccordionToggle, 'accordion-toggler');
