import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createBootstrapComponent } from './ThemeProvider';
import Button from './Button';
import Card from './Card';
import Collapse from './Collapse';

class Accordion extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object),
  };

  constructor(props) {
    super(props);

    this.state = {
      openedId: 0,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick = id => {
    this.setState({
      openedId: id,
    });
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        {React.Children.map(children, (CurCard, i) => (
          // Re-construct a new card component
          // with each header wrapped in a button component.
          // These buttons will dictate whether to expand or collapse
          // the other nested card components.
          // to expand or collapse at a time (no more than 1 component should be expanded
          // at any given time).
          <Card props={CurCard.bsPrefix}>
            {React.Children.map(
              // Wrap the header with a button component
              CurCard.props.children,
              CardElement =>
                // Identify the headers
                // TODO find a better way of identifying the components
                CardElement.props.className === 'header' ? (
                  // If it is a header, wrap it with a button
                  <Button onClick={() => this.onClick(i)}>
                    {CardElement}
                  </Button>
                ) : null,
            )}
            <Collapse
              className="accordion-collapse"
              getDimensionValue={() => 15}
              in={this.state.openedId === i}
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
