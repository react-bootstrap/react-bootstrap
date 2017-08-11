import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../src/Button';
import ButtonToolbar from '../src/ButtonToolbar';
import ToggleButton from '../src/ToggleButton';
import ToggleButtonGroup from '../src/ToggleButtonGroup';

storiesOf('Button', module)
  .add('Styles ✔', () =>
    <div>
      <div>
        <Button bsStyle="primary">Primary</Button>
        <Button bsStyle="secondary">Secondary</Button>
        <Button bsStyle="success">Success</Button>
        <Button bsStyle="danger">Danger</Button>
        <Button bsStyle="warning">Warning</Button>
        <Button bsStyle="info">Info</Button>
        <Button bsStyle="light">Light</Button>
        <Button bsStyle="dark">Dark</Button>
      </div>
      <br />
      <div>
        <Button bsStyle="outline-primary">Primary</Button>
        <Button bsStyle="outline-secondary">Secondary</Button>
        <Button bsStyle="outline-success">Success</Button>
        <Button bsStyle="outline-danger">Danger</Button>
        <Button bsStyle="outline-warning">Warning</Button>
        <Button bsStyle="outline-info">Info</Button>
        <Button bsStyle="outline-light">Light</Button>
        <Button bsStyle="outline-dark">Dark</Button>
      </div>
    </div>
  )
  .add('sizes ✔', () =>
    <div>
      <Button bsSize="lg" bsStyle="primary">Primary</Button>
      <Button bsSize="lg" bsStyle="secondary">Secondary</Button>
      <Button bsSize="sm" bsStyle="primary">Primary</Button>
      <Button bsSize="sm" bsStyle="secondary">Secondary</Button>
    </div>
  )
  .add('disabled ✔', () =>
    <div>
      <Button disabled bsStyle="primary">Primary</Button>
      <Button disabled bsStyle="secondary">Secondary</Button>
      <Button disabled bsStyle="success">Success</Button>
      <Button disabled bsStyle="danger">Danger</Button>
      <Button disabled bsStyle="warning">Warning</Button>
      <Button disabled bsStyle="info">Info</Button>
      <Button disabled bsStyle="light">Light</Button>
      <Button disabled bsStyle="dark">Dark</Button>
    </div>
  )
  .add('active ✔', () =>
    <div>
      <Button active bsStyle="primary">Primary</Button>
      <Button active bsStyle="secondary">Secondary</Button>
      <Button active bsStyle="success">Success</Button>
      <Button active bsStyle="danger">Danger</Button>
      <Button active bsStyle="warning">Warning</Button>
      <Button active bsStyle="info">Info</Button>
      <Button active bsStyle="light">Light</Button>
      <Button active bsStyle="dark">Dark</Button>
    </div>
  )
  .add('block ✔', () =>
    <div>
      <Button block bsStyle="primary">Primary</Button>
      <Button block bsStyle="secondary">Secondary</Button>
    </div>
  )
  .add('Toggle Buttons', () =>
    <div>
      <ButtonToolbar>
        <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
          <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
          <ToggleButton value={2}>Checkbox 2</ToggleButton>

          <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>

      <ButtonToolbar>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton value={1}>
            Radio 1 (pre-checked)
          </ToggleButton>
          <ToggleButton value={2}>Radio 2</ToggleButton>

          <ToggleButton value={3}>Radio 3</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    </div>
  );

