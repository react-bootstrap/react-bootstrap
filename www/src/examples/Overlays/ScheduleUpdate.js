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

function Example() {
  const [content, setContent] = React.useState(shortContent);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      setContent(content === shortContent ? longContent : shortContent);
    }, 3000);

    return () => clearInterval(timerId);
  });

  return (
    <OverlayTrigger
      trigger="click"
      overlay={
        <UpdatingPopover id="popover-contained">{content}</UpdatingPopover>
      }
    >
      <Button>Holy guacamole!</Button>
    </OverlayTrigger>
  );
}

render(<Example />);
