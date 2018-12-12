import React, { Component } from 'react';
import { createBootstrapComponent } from './ThemeProvider';
import Button from './Button';
import Card from './Card';

class Accordion extends Component {
  //   state = {
  //     current: 0,
  //   };

  render() {
    const { children } = this.props;
    return (
      <div>
        {React.Children.map(children, CurCard => (
          // Re-construct a new card component
          // with each header wrapped in a button component.
          // These buttons will dictate whether to expand or collapse
          // the other nested card components.
          // TODO: figure out a way to allow only one Collapse component
          // to expand or collapse at a time (no more than 1 component should be expanded
          // at any given time).
          <Card props={CurCard.props}>
            {React.Children.map(
              CurCard.props.children,
              CardElement =>
                // Identify the headers
                CardElement.props.className === 'header' ? (
                  // If it is a header, wrap it with a button
                  <Button>{CardElement}</Button>
                ) : (
                  // If it is not, just return the element as normal.
                  // TODO: Figure out a way to wrap every card element in a single Collapse component,
                  // except for the header (which should be wrapped in a Button component)
                  CardElement
                ),
            )}
          </Card>
        ))}; )
      </div>
    );
  }
}

const DecoratedAccordion = createBootstrapComponent(Accordion, 'accordion');

export default DecoratedAccordion;
