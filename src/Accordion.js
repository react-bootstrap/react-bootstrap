import React, { Component } from 'react';
import { createBootstrapComponent } from './ThemeProvider';
import Button from './Button';
import Card from './Card';
import Collapse from './Collapse';

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
              // Wrap the header with a button component
              CurCard.props.children,
              CardElement =>
                // Identify the headers
                CardElement.props.className === 'header' ? (
                  // If it is a header, wrap it with a button
                  <Button>{CardElement}</Button>
                ) : null,
            )}
            <Collapse
              className="accordion-collapse"
              getDimensionValue={() => 15}
            >
              <div ref="panel">
                {React.Children.map(
                  // Wrap every other element with a collapse component
                  CurCard.props.children,
                  CardElement =>
                    // If it is not header, just return the element as normal.
                    CardElement.props.className === 'header'
                      ? null
                      : CardElement,
                )}
              </div>
            </Collapse>
          </Card>
        ))}
      </div>
    );
  }
}

const DecoratedAccordion = createBootstrapComponent(Accordion, 'accordion');

export default DecoratedAccordion;
