const UpdatingPopover = React.forwardRef(
  ({ scheduleUpdate, children, ...props }, ref) => {
    useEffect(() => {
      console.log('updating!');
      scheduleUpdate();
    }, [children, scheduleUpdate]);
    return (
      <Popover ref={ref} {...props}>
        {children}
      </Popover>
    );
  },
);

const longContent = `
  Very long
  Multiline content
  that is engaging and what-not
`;
const shortContent = 'Short and sweet!';

function Example() {
  const [content, setContent] = useState(shortContent);

  useEffect(() => {
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
