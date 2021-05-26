import classNames from 'classnames';
import * as React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionBody from './AccordionBody';
import AccordionButton from './AccordionButton';
import AccordionCollapse from './AccordionCollapse';
import AccordionContext from './AccordionContext';
import AccordionHeader from './AccordionHeader';
import AccordionItem from './AccordionItem';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
  SelectCallback,
} from './helpers';

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>,
    BsPrefixProps {
  activeKey?: string;
  defaultActiveKey?: string;
  onSelect?: SelectCallback;
  flush?: boolean;
}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'accordion' */
  bsPrefix: PropTypes.string,

  /** The current active key that corresponds to the currently expanded card */
  activeKey: PropTypes.string,

  /** The default active key that is expanded on start */
  defaultActiveKey: PropTypes.string,

  /** Renders accordion edge-to-edge with its parent container */
  flush: PropTypes.bool,
};

const Accordion: BsPrefixRefForwardingComponent<'div', AccordionProps> =
  React.forwardRef<HTMLElement, AccordionProps>((props, ref) => {
    const {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      activeKey,
      bsPrefix,
      className,
      onSelect,
      flush,
      ...controlledProps
    } = useUncontrolled(props, {
      activeKey: 'onSelect',
    });

    const prefix = useBootstrapPrefix(bsPrefix, 'accordion');
    const contextValue = useMemo(
      () => ({
        activeEventKey: activeKey,
        onSelect,
      }),
      [activeKey, onSelect],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <Component
          ref={ref}
          {...controlledProps}
          className={classNames(className, prefix, flush && `${prefix}-flush`)}
        />
      </AccordionContext.Provider>
    );
  });

Accordion.displayName = 'Accordion';
Accordion.propTypes = propTypes;

export default Object.assign(Accordion, {
  Button: AccordionButton,
  Collapse: AccordionCollapse,
  Item: AccordionItem,
  Header: AccordionHeader,
  Body: AccordionBody,
});
