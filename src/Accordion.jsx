/** @jsx React.DOM */

import React          from './react-es6';
import PanelGroup     from './PanelGroup';

var Accordion = React.createClass({

  render: function () {
    return this.transferPropsTo(
      <PanelGroup isAccordion={true}>
          {this.props.children}
      </PanelGroup>
    );
  }

});

export default = Accordion;