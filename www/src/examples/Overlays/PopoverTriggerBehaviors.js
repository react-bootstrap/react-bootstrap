import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function PopoverTriggerBehaviorsExample() {
  const popover = (triggerBehavior) => (
    <Popover id={`popover-trigger-${triggerBehavior}`}>
      <Popover.Header as="h3">Popover bottom</Popover.Header>
      <Popover.Body>
        <strong>Holy guacamole!</strong> Check this info.
      </Popover.Body>
    </Popover>
  );

  const popoverClick = <popover triggerBehavior="click" />;

  const popoverHoverFocus = <popover triggerBehavior="hover-focus" />;

  const popoverFocus = <popover triggerBehavior="focus" />;

  const popoverClickRootClose = <popover triggerBehavior="click-root-close" />;

  return (
    <>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popoverClick}>
        <Button>Click</Button>
      </OverlayTrigger>{' '}
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="bottom"
        overlay={popoverHoverFocus}
      >
        <Button>Hover + Focus</Button>
      </OverlayTrigger>{' '}
      <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverFocus}>
        <Button>Focus</Button>
      </OverlayTrigger>{' '}
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom"
        overlay={popoverClickRootClose}
      >
        <Button>Click w/rootClose</Button>
      </OverlayTrigger>
    </>
  );
}

export default PopoverTriggerBehaviorsExample;
