import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import { createBootstrapComponent } from './ThemeProvider';
import AccordionContext from './AccordionContext';
import AccordionToggle from './AccordionToggle';
import SelectableContext from './SelectableContext';
import AccordionCollapse from './AccordionCollapse';

class Accordion extends React.Component {
  static propTypes = {
    /** Set a custom element for this component. */
    as: elementType,

    /** @default 'accordion' */
    bsPrefix: PropTypes.string,
  };

  static defaultProps = {
    as: 'div',
  };

  state = {
    openedId: '0',
  };

  onClick = id => {
    this.setState({
      openedId: id,
    });
  };

  render() {
    const {
      as: Component,
      bsPrefix,
      children,
      className,
      ...props
    } = this.props;
    return (
      <AccordionContext.Provider
        value={{ onClick: this.onClick, activeEventKey: this.state.openedId }}
      >
        <SelectableContext.Provider value={null}>
          <Component {...props} className={classNames(className, bsPrefix)}>
            {children}
          </Component>
        </SelectableContext.Provider>
      </AccordionContext.Provider>
    );
  }
}

const DecoratedAccordion = createBootstrapComponent(Accordion, 'accordion');

DecoratedAccordion.Toggle = AccordionToggle;
DecoratedAccordion.Collapse = AccordionCollapse;

export default DecoratedAccordion;
