import React from 'react';

import { storiesOf } from '@storybook/react';

import Button from '../src/Button';
import Collapse from '../src/Collapse';
import Fade from '../src/Fade';

class Example extends React.Component {
  state = {};
  render() {
    const Transition = this.props.transition
    return (
      <div>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          click
        </Button>
        <Transition in={this.state.open}>
          <div>
            <div style={{ margin: 10, padding: 15, backgroundColor: 'gray'}}>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
          </div>
        </Transition>
      </div>
    );
  }
}

storiesOf('Transitions  ✔', module)
  .add('Collapse ✔', () => (
    <Example transition={Collapse} />
  ))
  .add('Fade ✔', () => (
    <Example transition={Fade} />
  ));
