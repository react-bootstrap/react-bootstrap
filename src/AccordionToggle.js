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
    as: 'div',
  };

  // handleClick = () => {
  //   this.accordionContextOnClick(this.props.eventKey);
  // };

  render() {
    const {
      as: Component,
      bsPrefix,
      children,
      className,
      eventKey,
      ...props
    } = this.props;

    // if (Component === 'button') props.type = 'button';

    return (
      <AccordionContext.Consumer>
        {context => {
          this.accordionContextOnClick = context.onClick.bind(this);
          return (
            <Component {...props} className={classNames(className, bsPrefix)}>
              {children &&
                React.Children.map(children, child => {
                  if (child.props && child.props.type === 'button') {
                    // grab the old click
                    let givenClick = child.props.onClick;
                    child.props.onClick = () => {
                      this.accordionContextOnClick(eventKey);
                      if (givenClick) givenClick(eventKey);
                    };
                  }
                  return child;
                })}
            </Component>
          );
        }}
      </AccordionContext.Consumer>
    );
  }
}

export default createBootstrapComponent(AccordionToggle, 'accordion-toggler');
