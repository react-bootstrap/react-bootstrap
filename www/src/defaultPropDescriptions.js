module.exports = {
  bsClass:
    'Base CSS class and prefix for the component. Generally one should only ' +
    'change `bsClass` to provide new, non-Bootstrap, CSS styles for a ' +
    'component.',
  bsStyle: 'Component visual or contextual style variants.',
  bsSize: 'Component size variations.',
  componentClass: 'You can use a custom element type for this component.',

  eventKey:
    'A unique identifier for the Component, the `eventKey` makes it distinguishable from others in a set. ' +
    "Similar to React's `key` prop, in that it only needs to be " +
    'unique amoungst the Components siblings, not globally. '
};
