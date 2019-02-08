import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import { createBootstrapComponent } from './ThemeProvider';
import AccordionContext from './AccordionContext';
import AccordionToggle from './AccordionToggle';
import SelectableContext from './SelectableContext';
// import Button from './Button';
// import Card from './Card';
// import Collapse from './Collapse';

class Accordion extends React.Component {
  static propTypes = {
    as: elementType,
    children: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    as: 'div',
  };

  // state = {
  //   openedId: 0,
  // };

  onClick = (/* id */) => {
    // this.setState({
    //   openedId: id,
    // });
  };

  render() {
    const { bsPrefix, as: Component, children, ...props } = this.props;
    return (
      <AccordionContext.Provider value={this.onClick}>
        <SelectableContext.Provider value={null}>
          <Component {...props} className={classNames(bsPrefix)}>
            {children}
          </Component>
        </SelectableContext.Provider>
      </AccordionContext.Provider>
    );
  }
}

const DecoratedAccordion = createBootstrapComponent(Accordion, 'accordion');

DecoratedAccordion.Toggle = AccordionToggle;

export default DecoratedAccordion;
