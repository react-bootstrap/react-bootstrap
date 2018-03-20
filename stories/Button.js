import React from 'react';

import { storiesOf } from '@storybook/react'; // eslint-disable-line

import Button from '../src/Button';
import ButtonToolbar from '../src/ButtonToolbar';
import ToggleButton from '../src/ToggleButton';
import ToggleButtonGroup from '../src/ToggleButtonGroup';

storiesOf('Button', module)
  .add('Styles ✔', () => (
    <div>
      <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="info">Info</Button>
        <Button variant="light">Light</Button>
        <Button variant="dark">Dark</Button>
        <Button variant="link">Link</Button>
      </div>
      <br />
      <div>
        <Button variant="outline-primary">Primary</Button>
        <Button variant="outline-secondary">Secondary</Button>
        <Button variant="outline-success">Success</Button>
        <Button variant="outline-danger">Danger</Button>
        <Button variant="outline-warning">Warning</Button>
        <Button variant="outline-info">Info</Button>
        <Button variant="outline-light">Light</Button>
        <Button variant="outline-dark">Dark</Button>
      </div>
    </div>
  ))
  .add('sizes ✔', () => (
    <div>
      <Button size="lg" bsStyle="primary">
        Primary
      </Button>
      <Button size="lg" bsStyle="secondary">
        Secondary
      </Button>
      <Button size="sm" bsStyle="primary">
        Primary
      </Button>
      <Button size="sm" bsStyle="secondary">
        Secondary
      </Button>
    </div>
  ))
  .add('disabled ✔', () => (
    <div>
      <Button disabled bsStyle="primary">
        Primary
      </Button>
      <Button disabled bsStyle="secondary">
        Secondary
      </Button>
      <Button disabled bsStyle="success">
        Success
      </Button>
      <Button disabled bsStyle="danger">
        Danger
      </Button>
      <Button disabled bsStyle="warning">
        Warning
      </Button>
      <Button disabled bsStyle="info">
        Info
      </Button>
      <Button disabled bsStyle="light">
        Light
      </Button>
      <Button disabled bsStyle="dark">
        Dark
      </Button>
    </div>
  ))
  .add('active ✔', () => (
    <div>
      <Button active bsStyle="primary">
        Primary
      </Button>
      <Button active bsStyle="secondary">
        Secondary
      </Button>
      <Button active bsStyle="success">
        Success
      </Button>
      <Button active bsStyle="danger">
        Danger
      </Button>
      <Button active bsStyle="warning">
        Warning
      </Button>
      <Button active bsStyle="info">
        Info
      </Button>
      <Button active bsStyle="light">
        Light
      </Button>
      <Button active bsStyle="dark">
        Dark
      </Button>
    </div>
  ))
  .add('block ✔', () => (
    <div>
      <Button block bsStyle="primary">
        Primary
      </Button>
      <Button block bsStyle="secondary">
        Secondary
      </Button>
    </div>
  ))
  .add('Toggle Buttons ✔', () => (
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
          <ToggleButton value={1}>Radio 1 (pre-checked)</ToggleButton>
          <ToggleButton value={2}>Radio 2</ToggleButton>

          <ToggleButton value={3}>Radio 3</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    </div>
  ));
