/** @jsx React.DOM */

var buttonsInstance = (
    <div>
      {/* Standard button */}
      <Button bsStyle="default">Default</Button>

      {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
      <Button bsStyle="primary">Primary</Button>

      {/* Indicates a successful or positive action */}
      <Button bsStyle="success">Success</Button>

      {/* Contextual button for informational alert messages */}
      <Button bsStyle="info">Info</Button>

      {/* Indicates caution should be taken with this action */}
      <Button bsStyle="warning">Warning</Button>

      {/* Indicates a dangerous or potentially negative action */}
      <Button bsStyle="danger">Danger</Button>

      {/* Indicates a dangerous or potentially negative action */}
      <Button bsStyle="link">Link</Button>
    </div>
  );

React.renderComponent(buttonsInstance, mountNode);