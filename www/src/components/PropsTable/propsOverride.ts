// These are documentation overrides for the props table because react-docgen (as of v8.0.0) does not
// parse types/description from parent interfaces.

const PROPS_OVERRIDE = {
  common: {
    bsPrefix:
      'Change the underlying component CSS base class name and modifier class names prefix. **This is an escape hatch** for working with heavily customized bootstrap css.',
    variant: 'Component visual or contextual style variants.',
    size: 'Component size variations.',
    as: 'You can use a custom element type for this component.',
    eventKey:
      'A unique identifier for the Component, the `eventKey` makes it distinguishable from others in a set. ' +
      "Similar to React's `key` prop, in that it only needs to be " +
      'unique amongst the Components siblings, not globally.',
  },
  AccordionHeader: {
    additionalProps: [
      {
        name: 'onClick',
        type: 'function | undefined',
        description: 'Click handler for the `AccordionButton` element',
      },
    ],
  },
  AccordionButton: {
    additionalProps: [
      {
        name: 'onClick',
        type: 'function | undefined',
        description: 'A callback function for when this component is clicked',
      },
    ],
  },
  Button: {
    additionalProps: [
      {
        name: 'onClick',
        type: 'function | undefined',
        description: 'Callback fired when the button is clicked.',
      },
      {
        name: 'type',
        type: 'button | reset | submit | null',
        description: 'Defines HTML button type attribute.',
        defaultValue: 'button',
      },
    ],
  },
  CloseButton: {
    additionalProps: [
      {
        name: 'onClick',
        type: 'function | undefined',
        description: 'A callback fired after the Close Button is clicked.',
      },
    ],
  },
  DropdownItem: {
    additionalProps: [
      {
        name: 'onClick',
        type: 'function | undefined',
        description: 'Callback fired when the menu item is clicked.',
      },
    ],
  },
  PageItem: {
    additionalProps: [
      {
        name: 'onClick',
        type: 'function | undefined',
        description: 'A callback fired when this component is clicked.',
      },
    ],
  },
  ToggleButtonGroup: {
    additionalProps: [
      {
        name: 'name',
        type: 'string | undefined',
        description: `An HTML \`<input>\` name for each child button. 

__Required if \`type\` is set to \`'radio'\`__`,
      },
      {
        name: 'value',
        type: 'any | undefined',
        description:
          'The value, or array of values, of the active (pressed) buttons',
        controllable: true,
        rawProp: {
          doclets: {
            controllable: 'onChange',
          },
        },
      },
      {
        name: 'onChange',
        type: 'function | undefined',
        description:
          "Callback fired when a button is pressed, depending on whether the type is 'radio' or 'checkbox', onChange will be called with the value or array of active values",
        controllable: true,
        rawProp: {
          doclets: {
            controllable: 'value',
          },
          type: {
            name: 'func',
          },
        },
      },
      {
        name: 'type',
        type: "'checkbox' | 'radio'",
        description:
          'The input `type` of the rendered buttons, determines the toggle behavior of the buttons',
        required: true,
      },
      {
        name: 'size',
        type: "'sm' | 'lg' | undefined",
        description: 'Sets the size for all Buttons in the group.',
      },
      {
        name: 'vertical',
        type: 'boolean | undefined',
        description: 'Make the set of Buttons appear vertically stacked.',
      },
    ],
  },
};

export default PROPS_OVERRIDE;
