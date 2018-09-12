class UpdatingPopover extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      console.log('updating!');
      this.props.scheduleUpdate();
    }
  }

  render() {
    return <Popover {...this.props} />;
  }
}

const longContent = `
  Very long
  Multiline content
  that is engaging and what-not
`;
const shortContent = 'Short and sweet!';

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { content: shortContent };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(state => ({
        content: state.content === shortContent ? longContent : shortContent,
      }));
    }, 3000);
  }

  render() {
    const { content } = this.state;

    return (
      <OverlayTrigger
        trigger="click"
        overlay={
          <UpdatingPopover id="popover-contained">{content}</UpdatingPopover>
        }
      >
        <Button onClick={this.handleClick}>Holy guacamole!</Button>
      </OverlayTrigger>
    );
  }
}

render(<Example />);
