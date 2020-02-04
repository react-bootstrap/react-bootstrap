module.exports = {
  bsPrefix:
    'Change the underlying component CSS base class name and modifier class names prefix. **This is an escape hatch** for working with heavily customized bootstrap css.',

  variant: 'Component visual or contextual style variants.',

  size: 'Component size variations.',

  as: 'You can use a custom element type for this component.',

  eventKey:
    'A unique identifier for the Component, the `eventKey` makes it distinguishable from others in a set. ' +
    "Similar to React's `key` prop, in that it only needs to be " +
    'unique amongst the Components siblings, not globally. ',
};
