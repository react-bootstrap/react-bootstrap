import React from 'react';

import PanelGroup from './PanelGroup';

class Accordion extends React.Component {
  render() {
    return (
      <PanelGroup {...this.props} accordion>
        {this.props.children}
      </PanelGroup>
    );
  }
}

export default Accordion;
