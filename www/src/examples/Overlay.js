import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleToggle = this.handleToggle.bind(this);
    this.getTarget = this.getTarget.bind(this);

    this.state = {
      show: true,
    };
  }

  handleToggle() {
    this.setState((s) => ({ show: !s.show }));
  }

  getTarget() {
    return ReactDOM.findDOMNode(this.target);
  }

  render() {
    const sharedProps = {
      container: this,
      target: this.getTarget,
      show: this.state.show,
    };

    return (
      <div style={{ height: 100, paddingLeft: 150, position: 'relative' }}>
        <Button
          ref={(button) => {
            this.target = button;
          }}
          onClick={this.handleToggle}
        >
          Click me!
        </Button>

        <Overlay {...sharedProps} placement="left">
          <Tooltip id="overload-left">Tooltip overload!</Tooltip>
        </Overlay>
        <Overlay {...sharedProps} placement="top">
          <Tooltip id="overload-top">Tooltip overload!</Tooltip>
        </Overlay>
        <Overlay {...sharedProps} placement="right">
          <Tooltip id="overload-right">Tooltip overload!</Tooltip>
        </Overlay>
        <Overlay {...sharedProps} placement="bottom">
          <Tooltip id="overload-bottom">Tooltip overload!</Tooltip>
        </Overlay>
      </div>
    );
  }
}

render(<Example />);
