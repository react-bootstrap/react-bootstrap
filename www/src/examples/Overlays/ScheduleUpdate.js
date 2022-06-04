import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const UpdatingPopover = React.forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    useEffect(() => {
      console.log('updating!');
      popper.scheduleUpdate();
    }, [children, popper]);

    return (
      <Popover ref={ref} body {...props}>
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
