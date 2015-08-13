import React from 'react';
import PanelGroup from './PanelGroup';

const Accordion = React.createClass({
  render() {
    return (
      <PanelGroup {...this.props} accordion>
        {this.props.children}
      </PanelGroup>
    );
  }
});

export default Accordion;
